using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Auth.Models;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    public static AuthModel user = new AuthModel();

    [HttpPost("register")]
    public ActionResult<AuthModel> Register(AuthModelDto request)
    {
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

        user.Username = request.Username;
        user.PasswordHash = passwordHash;

        return Ok(user);
    }

    [HttpPost("login")]
    public ActionResult<AuthModel> Login(AuthModelDto request)
    {
        if (user.Username != request.Username)
        {
            return BadRequest("User not found.");
        }

        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return BadRequest("Wrong password.");
        }

        return Ok(user);
    }
}
