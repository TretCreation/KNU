using System;
using System.Data;
using System.Web.UI;
using System.Web;

namespace CalculatorApp
{
    public partial class Default : System.Web.UI.Page
    {
        private string currentInput = string.Empty;
        private double result = 0;
        private char currentOperator;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                txtResult.Text = "0";
            }
        }

        protected void Number_Click(object sender, EventArgs e)
        {
            var button = (System.Web.UI.WebControls.Button)sender;
            var number = button.Text;
            currentInput += number;
            txtResult.Text = currentInput;
        }

        protected void Operator_Click(object sender, EventArgs e)
        {
            if (!string.IsNullOrEmpty(currentInput))
            {
                result = double.Parse(currentInput);
                currentInput = string.Empty;
                currentOperator = ((System.Web.UI.WebControls.Button)sender).Text[0];
            }
        }

        protected void Calculate_Click(object sender, EventArgs e)
        {
            if (!string.IsNullOrEmpty(currentInput))
            {
                var operand = double.Parse(currentInput);
                switch (currentOperator)
                {
                    case '+':
                        result += operand;
                        break;
                    case '-':
                        result -= operand;
                        break;
                    case '*':
                        result *= operand;
                        break;
                }
                txtResult.Text = result.ToString();
                currentInput = string.Empty;
            }
        }
    }
}
