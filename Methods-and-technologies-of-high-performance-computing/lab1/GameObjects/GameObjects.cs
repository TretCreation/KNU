using System;
using System.Collections.Generic;
using System.Text;

namespace ThreadWar
{
    public class GameObjects
    {
        public int XCoordinate { get; set; }
        public int YCoordinate { get; set; }

        public GameObjects(int x, int y)
        {
            XCoordinate = x;
            YCoordinate = y;
        }
    }
}
