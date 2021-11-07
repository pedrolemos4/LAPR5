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
            this.Valor = forca;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}