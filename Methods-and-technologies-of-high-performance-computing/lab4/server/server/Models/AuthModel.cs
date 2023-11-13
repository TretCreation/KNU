namespace Auth.Models;

public class AuthModelDto
{
    public required string Username { get; set; }
    public required string Password { get; set; }
}

public class AuthModel
{
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
}
