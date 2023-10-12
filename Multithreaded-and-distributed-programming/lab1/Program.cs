// string regExp = @"x=([0-9]+);[^;]+;";
using System.Text.RegularExpressions;

class Program
{
    private static int x;

    static void Main()
    {
        int[] arr1 = { 0, 1, 2, 3, 5, 7, 10 };

        string input = string.Join(" ", arr1);

        string regExp = @"\b(0|1|2|3|5|7)\b";
        // string regExp = @"x=([0-9]+);[^;]+;";

        MatchCollection matches = Regex.Matches(input, regExp);

        foreach (Match match in matches.Cast<Match>())
        {
            Console.WriteLine("Знайдено: " + match.Value);
        }
    }
}
