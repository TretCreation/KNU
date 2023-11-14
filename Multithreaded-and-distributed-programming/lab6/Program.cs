using System;
using System.Threading;

class ByzantineGenerals
{
    private static readonly int N = 9; // Кількість генералів
    private static readonly int TOLERANCE_THRESHOLD = N / 3;

    private static bool[] orders = new bool[N];
    private static SemaphoreSlim semaphore = new SemaphoreSlim(1, 1);

    // Функція, яка представляє дії генерала
    private static void GeneralFunction(int id)
    {
        // Симуляція відправки повідомлення
        Thread.Sleep(100);

        // Спільний ресурс - змінна, що представляє відповідь від генерала
        bool response = false;

        // Імітація рішення задачі
        if (id % 2 == 0)
        {
            response = true;
        }

        // Симуляція відправки відповіді
        Thread.Sleep(100);

        // Використання SemaphoreSlim для забезпечення взаємовиключного доступу до спільного ресурсу
        semaphore.Wait();
        try
        {
            // Запис результату
            Console.WriteLine($"General {id} decided: {response}");

            // Запис рішення у вектор
            orders[id] = response;
        }
        finally
        {
            semaphore.Release();
        }
    }

    static void Main()
    {
        // Використання потоків для представлення кожного генерала
        Thread[] threads = new Thread[N];
        for (int i = 0; i < N; i++)
        {
            int id = i;
            threads[i] = new Thread(() => GeneralFunction(id));
            threads[i].Start();
        }

        // Очікування завершення всіх потоків
        foreach (Thread thread in threads)
        {
            thread.Join();
        }

        // Підрахунок кількості позитивних відповідей
        int positiveResponses = Array.FindAll(orders, order => order).Length;

        // Виведення результату
        Console.WriteLine($"Consensus reached: {positiveResponses > TOLERANCE_THRESHOLD}");
    }
}
