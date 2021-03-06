using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Perfis
{
    [Owned]
    public class Telefone : IValueObject
    {

        public long NumTelefone { get; private set; }

        public bool Active { get; private set; }

        private Telefone()
        {
            this.Active = true;
        }

        public Telefone(long telefone)
        {
            setTelefone(telefone);
            this.Active = true;
        }

        private void setTelefone(long telefone)
        {
            if (telefone == 0 || (telefone > 99999999999 && telefone < 9999999999999))
            {
                this.NumTelefone = telefone;
            }
            else
            {
                throw new BusinessRuleValidationException("Phone number is invalid.");
            }
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}