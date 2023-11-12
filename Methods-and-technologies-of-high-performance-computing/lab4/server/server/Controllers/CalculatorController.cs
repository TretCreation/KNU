using Microsoft.AspNetCore.Mvc;

public class CalculatorController : Controller
{
    public IActionResult Index()
    {
        var model = new CalculatorModel(); // Create an instance of the model
        return View(model);
    }

    [HttpPost]
    public IActionResult Calculate(CalculatorModel model)
    {
        if (ModelState.IsValid)
        {
            switch (model.Operator)
            {
                case "+":
                    model.Result = model.Operand1 + model.Operand2;
                    break;
                case "-":
                    model.Result = model.Operand1 - model.Operand2;
                    break;
                case "*":
                    model.Result = model.Operand1 * model.Operand2;
                    break;
                case "/":
                    if (model.Operand2 != 0)
                    {
                        model.Result = model.Operand1 / model.Operand2;
                    }
                    else
                    {
                        ModelState.AddModelError("Operand2", "Division by zero is not allowed.");
                        return View("Index", model);
                    }
                    break;
                default:
                    ModelState.AddModelError("Operator", "Invalid operator.");
                    return View("Index", model);
            }
        }

        return View("Index", model);
    }
}
