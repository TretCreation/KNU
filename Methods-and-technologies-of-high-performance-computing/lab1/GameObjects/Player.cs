namespace ThreadWar
{
    public class Player : GameObjects
    {
        public char Symbol { get; set; }

        public Player(int x, int y)
            : base(x, y)
        {
            Symbol = '$';
        }
    }
}
