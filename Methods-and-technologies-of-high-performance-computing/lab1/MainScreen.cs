namespace ThreadWar
{
    public class MainScreen
    {
        public void ClearScreen()
        {
            Console.Clear();
        }

        public void RenderPlayer(Player player)
        {
            Console.ForegroundColor = ConsoleColor.Blue;
            if (player.XCoordinate < 0)
            {
                player.XCoordinate = 0;
            }
            else if (player.XCoordinate > 80)
            {
                player.XCoordinate = 80;
            }
            else if (player.YCoordinate < 0)
            {
                player.YCoordinate = 0;
            }
            else if (player.YCoordinate > 30)
            {
                player.YCoordinate = 30;
            }
            Console.SetCursorPosition(player.XCoordinate, player.YCoordinate);
            Console.Write(player.Symbol);
            Console.ResetColor();
        }

        public void RenderEnemies(List<Enemy> enemies)
        {
            Console.ForegroundColor = ConsoleColor.Green;
            if (enemies != null)
            {
                foreach (var enemy in enemies)
                {
                    if (enemy.YCoordinate == 30)
                    {
                        RemoveOutOfBoundEnemy(enemy);
                    }
                    else
                    {
                        Console.SetCursorPosition(enemy.XCoordinate, enemy.YCoordinate);
                        Console.Write(enemy.Symbol);
                    }
                }
            }
            Console.ResetColor();
        }

        public void RenderBullets(List<Bullet> bullets)
        {
            if (bullets != null)
            {
                foreach (var bullet in bullets)
                {
                    if (bullet.YCoordinate == 0)
                    {
                        RemoveOutOfBoundBullet(bullet);
                    }
                    else
                    {
                        Console.SetCursorPosition(bullet.XCoordinate, bullet.YCoordinate);
                        Console.Write(bullet.Symbol);
                    }
                }
            }
        }

        private void RemoveOutOfBoundBullet(Bullet bullet)
        {
            if (bullet != null)
            {
                Console.SetCursorPosition(bullet.XCoordinate, bullet.YCoordinate);
                Console.Write(' ');
            }
        }

        private void RemoveOutOfBoundEnemy(Enemy enemy)
        {
            if (enemy != null)
            {
                Console.SetCursorPosition(enemy.XCoordinate, enemy.YCoordinate);
                Console.Write(' ');
            }
        }

        public void DisplayGameScore(int gameScore)
        {
            Console.SetCursorPosition(5, 32);
            Console.Write(String.Format($"Hit: {gameScore}"));
        }

        public void DisplayEscapedEnemyCount(int escapedEnemiesCount)
        {
            Console.SetCursorPosition(50, 32);
            Console.Write(String.Format($"Miss: {escapedEnemiesCount}"));
        }

        public void DisplayDevTools(double currentSpeed, int bullets, double elapsedTime)
        {
            Console.SetCursorPosition(55, 9);
            Console.WriteLine("Dev Tools:");

            Console.SetCursorPosition(55, 11);
            Console.WriteLine($"Speed: {currentSpeed}");

            Console.SetCursorPosition(55, 12);
            Console.WriteLine($"Bullets: {bullets}");

            Console.SetCursorPosition(55, 13);
            Console.WriteLine($"elapsedTime: {elapsedTime}");
        }

        public void HideCursor()
        {
            Console.CursorVisible = false;
        }
    }
}
