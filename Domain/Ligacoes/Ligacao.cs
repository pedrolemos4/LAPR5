using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SharedValueObjects;

namespace DDDSample1.Domain.Ligacoes
{
    public class Jogador : Entity<JogadorId>, IAggregateRoot
    {

        public TextoLigacao TextoLigacao { get;  private set; }
        public Estado Estado { get;  private set; }
        public bool Active{ get;  private set; }

        private Ligacao()
        {
            this.Active = true;
        }

        public Ligacao(string code, string texto, string estado)
        {
            this.Id = new LigacaoId(code);
            this.TextoLigacao = new TextoLigacao(texto);
            this.Estado = new Estado(estado);
            this.Active = true;
        }

        public void ChangeTextoLigacao(string texto)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the text to an inactive connection.");
            this.TextoLigacao = new TextoLigacao(texto);
        }

        public void ChangeEstado(string estado)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the state to an inactive connection.");
            this.Estado = new Estado(estado);
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}