using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Auth.Models;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private static readonly object lockObject = new object();
    public static AuthModel user = new AuthModel();

    [HttpPost("register")]
    public async Task<ActionResult<AuthModel>> Register(AuthModelDto request)
    {
        string passwordHash = await Task.Run(
            () => BCrypt.Net.BCrypt.HashPassword(request.Password)
        );

        lock (lockObject)
        {
            user.Username = request.Username;
            user.PasswordHash = passwordHash;
        }

        return Ok(user);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthModel>> Login(AuthModelDto request)
    {
        string storedUsername;
        string storedPasswordHash;

        lock (lockObject)
        {
            storedUsername = user.Username;
            storedPasswordHash = user.PasswordHash;
        }

        if (storedUsername != request.Username)
        {
            return BadRequest("User not found.");
        }

        bool isPasswordValid = await Task.Run(
            () => BCrypt.Net.BCrypt.Verify(request.Password, storedPasswordHash)
        );

        if (!isPasswordValid)
        {
            return BadRequest("Wrong password.");
        }

        return Ok(user);
    }
}
