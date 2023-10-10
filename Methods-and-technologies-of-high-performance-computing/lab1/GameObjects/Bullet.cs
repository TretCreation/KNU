namespace ThreadWar
{
    public class Bullet : GameObjects
    {
        public char Symbol { get; set; }

        public Bullet(int x, int y)
            : base(x, y)
        {
            Symbol = '|';
        }
    }
}
