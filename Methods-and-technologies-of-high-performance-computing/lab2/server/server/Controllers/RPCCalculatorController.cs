// using System.Web.Http;

// public class RPCCalculatorController : ApiController
// {
//     [HttpGet]
//     public double Add(double a, double b)
//     {
//         return a + b;
//     }

//     [HttpGet]
//     public double Subtract(double a, double b)
//     {
//         return a - b;
//     }

//     [HttpGet]
//     public double Multiply(double a, double b)
//     {
//         return a * b;
//     }

//     [HttpGet]
//     public double Divide(double a, double b)
//     {
//         if (b != 0)
//         {
//             return a / b;
//         }
//         else
//         {
//             throw new HttpResponseException(System.Net.HttpStatusCode.BadRequest);
//         }
//     }
// }
