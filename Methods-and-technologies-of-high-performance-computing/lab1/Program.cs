﻿namespace ThreadWar
{
    class Program
    {
        static DateTime startTime = DateTime.Now;

        static int FrameCount = 0;

        static double currentSpeed = 40;

        static double elapsedTime = 0;

        static void Main()
        {
            var gameState = new GameState();
            DateTime startScreenEndTime = DateTime.Now.AddSeconds(15);

            while (true)
            {
                var initialTimeStamp = DateTime.Now;

                if (DateTime.Now < startScreenEndTime)
                {
                    if (Console.KeyAvailable)
                    {
                        var key = Console.ReadKey(true).Key;
                        // Skip the start screen
                        if (key == ConsoleKey.LeftArrow || key == ConsoleKey.RightArrow)
                        {
                            startScreenEndTime = DateTime.Now;
                        }
                    }
                    else
                    {
                        RenderStartScreen();
                    }
                }
                else
                {
                    var state = HandleFrame(gameState);

                    if (state.CheckGameOver())
                    {
                        RenderGameOverScreen(state);
                        var key = Console.ReadKey(true).Key;

                        while (true)
                        {
                            if (key == ConsoleKey.Q || key == ConsoleKey.Enter)
                                break;
                            else
                                key = Console.ReadKey(true).Key;
                        }

                        if (key == ConsoleKey.Q)
                        {
                            break;
                        }
                        if (key == ConsoleKey.Enter)
                        {
                            startTime = DateTime.Now;
                            currentSpeed = 40;
                            state.EscapedEnemiesCount = 0;
                            state.GameScore = 0;
                            state.Player = new Player(38, 30);
                            state.Enemies = new List<Enemy>();
                            state.Bullets = new List<Bullet>();
                        }
                    }

                    Render(state);

                    gameState = state;

                    elapsedTime = (DateTime.Now - startTime).TotalSeconds;

                    // Extra time to increase speed
                    int napTime = GetNapTime(initialTimeStamp, elapsedTime, ref currentSpeed);
                    FrameCount++;
                    Thread.Sleep(napTime);
                }
            }
        }

        static GameState HandleFrame(GameState state)
        {
            state.GetKeyStrokes();
            state.UpdateBulletLocation();

            if (FrameCount % 10 == 0)
            {
                state.UpdateEnemyLocation();
            }
            if (FrameCount % 60 == 0)
            {
                state.GenerateEnemy();
            }
            return state;
        }

        static void Render(GameState state)
        {
            var board = new MainScreen();

            board.ClearScreen();
            board.RenderPlayer(state.Player);
            board.RenderEnemies(state.Enemies);
            board.RenderBullets(state.Bullets);
            board.DisplayGameScore(state.GameScore);
            board.DisplayEscapedEnemyCount(state.EscapedEnemiesCount);
            board.DisplayDevTools(currentSpeed, state.maxBullets, elapsedTime);
            board.HideCursor();
        }

        static int GetNapTime(DateTime initialTime, double elapsedTime, ref double currentSpeed)
        {
            var finalTimeStamp = DateTime.Now;
            var timeDifference = (finalTimeStamp - initialTime).TotalMilliseconds;
            int naptime = 0;

            if (elapsedTime >= 10)
            {
                // Decrease naptime to make the game faster
                currentSpeed -= 5;
                startTime = DateTime.Now; // Reset the start time to keep increasing speed
            }

            if (timeDifference < currentSpeed)
            {
                naptime = (int)(currentSpeed - timeDifference);
            }

            return naptime > 0 ? naptime : 0;
        }

        static void RenderStartScreen()
        {
            Console.Clear();
            Console.SetCursorPosition(30, 14);
            Console.Write("Game Start");
        }

        static void RenderGameOverScreen(GameState state)
        {
            Console.Clear();
            Console.SetCursorPosition(30, 14);
            Console.Write("Game Over");
            Console.SetCursorPosition(28, 20);
            Console.Write(String.Format("Your Score: {0}", state.GameScore));
            Thread.Sleep(1000);
            Console.SetCursorPosition(15, 32);
            Console.Write("Press Enter key to play again. Press Q to quit the game.");
        }
    }
}
