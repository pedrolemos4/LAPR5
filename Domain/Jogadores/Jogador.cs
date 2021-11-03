using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SharedValueObjects;

namespace DDDSample1.Domain.Jogadores
{
    public class Jogador : Entity<JogadorId>, IAggregateRoot
    {

        public Pontuacao Pontuacao { get;  private set; }

        public Tag Tags { get;  private set; }

        public bool Active{ get;  private set; }

        private Jogador()
        {
            this.Pontuacao = new Pontuacao();
            this.Tags = new Tag();
            this.Active = true;
        }

        public Jogador(string code, Pontuacao pontuacao, Tag tags)
        {
            this.Id = new JogadorId(code);
            this.Pontuacao = pontuacao;
            this.Tags = tags;
            this.Active = true;
        }

        public void AddPontuacao(int pontos)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to add more points to an inactive player.");
            this.Pontuacao = this.Pontuacao + pontos;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}