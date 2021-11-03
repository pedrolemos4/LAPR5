using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SharedValueObjects;

namespace DDDSample1.Domain.Introducoes
{
    public class Introducao : Entity<IntroducaoId>, IAggregateRoot
    {

        public Estado Estado { get;  private set; }

        public bool Active{ get;  private set; }

        private Introducao()
        {
            this.Active = true;
        }

        public Introducao(string code, Estado estado)
        {
            this.Id = new IntroducaoId(code);
            this.Estado = estado;
            this.Active = true;
        }

        public void ChangeEstado(Estado estado)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive family.");
            this.Estado = estado;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}