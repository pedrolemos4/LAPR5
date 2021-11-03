using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Jogadores
{
    public class Pontuacao : IValueObject
    {

        public int Pontuacao { get;  private set; }

        public bool Active{ get;  private set; }

        private Pontuacao()
        {
            this.Pontuacao = 0;
            this.Active = true;
        }

        public Pontuacao(int pontos)
        {
            this.Pontuacao = pontos;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}