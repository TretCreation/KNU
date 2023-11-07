using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Data;
using System.Web;

using System.Web.UI;

public class CalculatorModel : PageModel
{
    [BindProperty]
    public string Result { get; set; } = "0";

    public void OnPostDigit(int value)
    {
        if (Result == "0" || Result == "Error")
            Result = value.ToString();
        else
            Result += value;
    }

    public void OnPostCalculate()
    {
        try
        {
            Result = new DataTable().Compute(Result, null).ToString();
        }
        catch
        {
            Result = "Error";
        }
    }
}
