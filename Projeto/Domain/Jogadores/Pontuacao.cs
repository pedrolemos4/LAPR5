using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Jogadores
{
    [Owned]
    public class Pontuacao : IValueObject
    {

        public int Pontos { get;  private set; }

        public bool Active{ get;  private set; }

        private Pontuacao()
        {
          //  this.Pontos = 0;
           // this.Active = true;
        }

        public Pontuacao(int pontos)
        {
            this.Pontos = pontos;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}