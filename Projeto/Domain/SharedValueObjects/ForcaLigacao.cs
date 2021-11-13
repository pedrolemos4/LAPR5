using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.SharedValueObjects
{
    [Owned]
    public class ForcaLigacao : IValueObject
    {

        public int Valor { get;  private set; }

        public bool Active{ get;  private set; }

        private ForcaLigacao()
        {
            this.Active = true;
        }

        public ForcaLigacao(int forca)
        {
            setForcaLigacao(forca);
            this.Active = true;
        }

        private void setForcaLigacao(int forca)
        {
            if (forca > 0 && forca < 101)
            {
                this.Valor = forca;
            }
            else
            {
                throw new BusinessRuleValidationException("Força de ligação inválida.");
            }
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}