using System;
using System.Runtime.InteropServices;
using System.Threading;

//TODO: FIX deadlocks
public class DiningPhilosophers
{
    private const int NumPhilosophers = 5;
    private IntPtr[] forks = new IntPtr[NumPhilosophers];

    [DllImport("libc", SetLastError = true)]
    private static extern int pthread_mutex_init(out IntPtr mutex, IntPtr attr);

    [DllImport("libc", SetLastError = true)]
    private static extern int pthread_mutex_lock(IntPtr mutex);

    [DllImport("libc", SetLastError = true)]
    private static extern int pthread_mutex_unlock(IntPtr mutex);

    public DiningPhilosophers()
    {
        for (int i = 0; i < NumPhilosophers; i++)
        {
            pthread_mutex_init(out forks[i], IntPtr.Zero);
        }
    }

    public void StartDining()
    {
        Thread[] philosophers = new Thread[NumPhilosophers];

        for (int i = 0; i < NumPhilosophers; i++)
        {
            int philosopherId = i;
            philosophers[i] = new Thread(() => Philosopher(philosopherId));
            philosophers[i].Start();
        }

        for (int i = 0; i < NumPhilosophers; i++)
        {
            philosophers[i].Join();
        }
    }

    private void Philosopher(int philosopherId)
    {
        int leftFork = philosopherId;
        int rightFork = (philosopherId + 1) % NumPhilosophers;

        while (true)
        {
            Console.WriteLine($"Philosopher {philosopherId} is thinking.");

            Thread.Sleep(TimeSpan.FromSeconds(new Random().Next(3))); // Thinking

            Console.WriteLine($"Philosopher {philosopherId} is hungry and tries to pick up forks.");

            if (pthread_mutex_trylock(forks[leftFork]) == 0)
            {
                if (pthread_mutex_trylock(forks[rightFork]) == 0)
                {
                    Console.WriteLine($"Philosopher {philosopherId} is eating.");
                    Thread.Sleep(TimeSpan.FromSeconds(new Random().Next(3))); // Eating
                    pthread_mutex_unlock(forks[rightFork]);
                }
                pthread_mutex_unlock(forks[leftFork]);
            }
        }
    }

    public static void Main(string[] args)
    {
        DiningPhilosophers diningPhilosophers = new DiningPhilosophers();
        diningPhilosophers.StartDining();
    }

    [DllImport("libc", SetLastError = true)]
    private static extern int pthread_mutex_trylock(IntPtr mutex);
}
