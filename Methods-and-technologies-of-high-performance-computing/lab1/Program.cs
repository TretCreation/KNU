using System;
using System.Collections.Generic;
using System.Threading;

namespace ThreadWar
{
    class Program
    {
        static int FrameCount = 0;

        static void Main()
        {
            var gameState = new GameState();
            while (true)
            {
                var initialTimeStamp = DateTime.Now;

                // handles the updated gamestate
                var state = HandleFrame(gameState);
                // if (state.CheckGameOver())
                // {
                //     RenderGameOverScreen(state);
                //     var key = Console.ReadKey(true).Key;

                //     while (true)
                //     {
                //         if (key == ConsoleKey.Q || key == ConsoleKey.Enter)
                //             break;
                //         else
                //             key = Console.ReadKey(true).Key;
                //     }

                //     if (key == ConsoleKey.Q)
                //     {
                //         break;
                //     }
                //     else if(key == ConsoleKey.Enter)
                //     {
                //         state.EscapedInvaderCount = 0;
                //         state.GameScore = 0;
                //         state.Hero = new Hero(38, 30);
                //         state.Invaders = new List<Invader>();
                //         state.Bullets = new List<Bullet>();
                //     }
                // }

                //Draws State to console
                Render(state);

                gameState = state;

                //Extra sleep time to maintain uniform speed
                int napTime = GetNapTime(initialTimeStamp);
                FrameCount++;
                Thread.Sleep(napTime);
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
            // board.DisplayGameScore(state.GameScore);
            // board.DisplayEscapedInvaderCount(state.EscapedInvaderCount);
            board.HideCursor();
        }

        static int GetNapTime(DateTime initialTime)
        {
            var finalTimeStamp = DateTime.Now;
            var timeDifference = (finalTimeStamp - initialTime).TotalMilliseconds;
            int naptime = 0;
            if (timeDifference < 33.3)
            {
                naptime = (int)(33.3 - timeDifference);
            }
            return naptime > 0 ? naptime : 0;
        }
    }
}
