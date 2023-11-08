using Microsoft.AspNetCore.Mvc;

[Route("api/calculator")]
public class RPCCalculatorController : ControllerBase
{
    [HttpGet("sum")]
    public IActionResult Sum([FromQuery] double a, [FromQuery] double b)
    {
        double result = a + b;
        return Ok(result);
    }

    [HttpGet("diff")]
    public IActionResult Difference([FromQuery] double a, [FromQuery] double b)
    {
        double result = a - b;
        return Ok(result);
    }

    [HttpGet("mul")]
    public IActionResult Multiply([FromQuery] double a, [FromQuery] double b)
    {
        double result = a * b;
        return Ok(result);
    }

    [HttpGet("div")]
    public IActionResult Divide([FromQuery] double a, [FromQuery] double b)
    {
        if (b == 0)
        {
            return BadRequest("Division by zero is not allowed.");
        }

        double result = a / b;
        return Ok(result);
    }
}
