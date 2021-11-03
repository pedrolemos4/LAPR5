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

        public Ligacao(string code, TextoLigacao texto, Estado estado)
        {
            this.Id = new LigacaoId(code);
            this.TextoLigacao = texto;
            this.Estado = estado;
            this.Active = true;
        }

        public void ChangeTextoLigacao(TextoLigacao texto)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the text to an inactive connection.");
            this.TextoLigacao = texto;
        }

        public void ChangeEstado(Estado estado)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the state to an inactive connection.");
            this.Estado = estado;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}