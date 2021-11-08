using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SharedValueObjects;

namespace DDDSample1.Domain.Introducoes
{
    public class Introducao : Entity<IntroducaoId>, IAggregateRoot
    {

        public Estado EstadoIntroducao { get;  private set; }

        public bool Active{ get;  private set; }

        private Introducao()
        {
            this.Active = true;
        }

        public Introducao(string code, string estado)
        {
            this.Id = new IntroducaoId(code);
            setEstado(estado);
            this.Active = true;
        }

        public void ChangeEstado(string estado)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive family.");
            setEstado(estado);
        }

        private void setEstado(string estado)
        {
            try
            {
                Estado enumerado;
                Estado.TryParse(estado, out enumerado);
                this.EstadoIntroducao = enumerado;
            }
            catch
            {
                throw new BusinessRuleValidationException("Estado de Pedido de Introdução inválido.");
            }
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}