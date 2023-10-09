using System;
using System.Collections.Generic;
using System.Text;

namespace ThreadWar
{
    public class Enemy : GameObjects
    {
        public char Symbol { get; set; }

        public Enemy(int x, int y)
            : base(x, y)
        {
            Symbol = '#';
        }
    }
}
