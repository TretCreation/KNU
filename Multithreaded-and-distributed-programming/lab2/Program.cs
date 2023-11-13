using System;
using System.Runtime.InteropServices;
using System.Threading;

public class DiningPhilosophers
{
    private const int NumPhilosophers = 5;
    private object[] forkLocks = new object[NumPhilosophers]; // One lock for each fork

    public DiningPhilosophers()
    {
        for (int i = 0; i < NumPhilosophers; i++)
        {
            forkLocks[i] = new object();
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

            // Thinking
            Thread.Sleep(TimeSpan.FromSeconds(new Random().Next(3)));

            Console.WriteLine($"Philosopher {philosopherId} is hungry and tries to pick up forks.");

            lock (forkLocks[leftFork])
            {
                lock (forkLocks[rightFork])
                {
                    // Both forks acquired
                    Console.WriteLine($"Philosopher {philosopherId} is eating.");
                    Thread.Sleep(TimeSpan.FromSeconds(new Random().Next(3))); // Eating
                }
            }
        }
    }

    public static void Main(string[] args)
    {
        DiningPhilosophers diningPhilosophers = new DiningPhilosophers();
        diningPhilosophers.StartDining();
    }
}
