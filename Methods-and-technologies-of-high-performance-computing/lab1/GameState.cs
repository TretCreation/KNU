namespace ThreadWar
{
    public class GameState
    {
        public Player Player { get; set; }
        public List<Enemy> Enemies { get; set; }
        public List<Bullet> Bullets { get; set; }
        public int GameScore { get; set; }
        public int EscapedEnemiesCount { get; set; }
        private SemaphoreSlim bulletSemaphore = new SemaphoreSlim(3, 3);
        private Mutex bulletMutex = new Mutex();

        public int maxBullets = 3;

        public GameState()
        {
            Player = new Player(38, 30);
            Bullets = new List<Bullet>();
            Enemies = new List<Enemy>() { new Enemy(30, 0) };
        }

        public void GetKeyStrokes()
        {
            if (Console.KeyAvailable)
            {
                ConsoleKeyInfo key = Console.ReadKey(true);
                switch (key.Key)
                {
                    case ConsoleKey.A:
                        Player.XCoordinate -= 1;
                        break;

                    case ConsoleKey.LeftArrow:
                        Player.XCoordinate -= 1;
                        break;

                    case ConsoleKey.D:
                        Player.XCoordinate += 1;
                        break;

                    case ConsoleKey.RightArrow:
                        Player.XCoordinate += 1;
                        break;

                    case ConsoleKey.Spacebar:
                        if (bulletSemaphore.Wait(0))
                        {
                            try
                            {
                                bulletMutex.WaitOne(); // Acquire the mutex
                                if (maxBullets > 0)
                                {
                                    Bullets.Add(new Bullet(Player.XCoordinate, Player.YCoordinate));
                                    maxBullets--;
                                }
                            }
                            finally
                            {
                                bulletMutex.ReleaseMutex(); // Release the mutex
                            }
                            bulletSemaphore.Release();
                        }
                        break;
                }
            }
        }

        public void GenerateEnemy()
        {
            Random random = new Random();
            int x = random.Next(10, 70);
            var enemy = new Enemy(x, 0);
            Enemies.Add(enemy);
        }

        public void UpdateBulletLocation()
        {
            var activeBullets = new List<Bullet>();

            if (Bullets != null)
            {
                foreach (var bullet in Bullets)
                {
                    if (!CheckKill(bullet))
                    {
                        if (bullet.YCoordinate > 0)
                        {
                            bullet.YCoordinate--;
                            activeBullets.Add(bullet);
                        }
                        else
                        {
                            maxBullets++;
                        }
                    }
                }
            }

            GenerateNewBullets();
            Bullets = activeBullets;
        }

        private bool CheckKill(Bullet bullet)
        {
            if (bullet != null)
            {
                var killedEnemy = Enemies.FirstOrDefault(
                    x => x.XCoordinate == bullet.XCoordinate && x.YCoordinate == bullet.YCoordinate
                );

                if (killedEnemy != null)
                {
                    Enemies.Remove(killedEnemy);
                    GameScore++;
                    maxBullets++;

                    return true;
                }
                return false;
            }
            return false;
        }

        public void GenerateNewBullets()
        {
            if (maxBullets > Bullets.Count)
            {
                for (int i = 0; i < maxBullets - Bullets.Count; i++)
                {
                    Bullets.Add(new Bullet(Player.XCoordinate, Player.YCoordinate));
                }
            }
        }

        public void UpdateEnemyLocation()
        {
            var activeEnemies = new List<Enemy>();

            if (Enemies != null)
            {
                foreach (var enemy in Enemies)
                {
                    if (enemy.YCoordinate < 30)
                    {
                        enemy.YCoordinate++;
                        activeEnemies.Add(enemy);
                    }
                    else if (enemy.YCoordinate == 30)
                    {
                        EscapedEnemiesCount++;
                    }
                }
            }
            Enemies = activeEnemies;
        }

        public bool CheckGameOver()
        {
            if (EscapedEnemiesCount >= 30)
                return true;
            else
                return false;
        }
    }
}
