// using Microsoft.AspNetCore.Mvc.RazorPages;
// using System;
// using System.Collections.Generic;

// public class CalculatorModel : PageModel
// {
//     public double Number1 { get; set; }
//     public double Number2 { get; set; }
//     public string Operator { get; set; }
//     public double Result { get; set; }

//     public List<SelectListItem> Operators { get; } =
//         new List<SelectListItem>
//         {
//             new SelectListItem("+", "+"),
//             new SelectListItem("-", "-"),
//             new SelectListItem("*", "*"),
//         };

//     public void OnGet() { }

//     public void OnPostCalculate()
//     {
//         switch (Operator)
//         {
//             case "+":
//                 Result = Number1 + Number2;
//                 break;
//             case "-":
//                 Result = Number1 - Number2;
//                 break;
//             case "*":
//                 Result = Number1 * Number2;
//                 break;
//             default:
//                 Result = 0; // Invalid operator
//                 break;
//         }
//     }
// }
