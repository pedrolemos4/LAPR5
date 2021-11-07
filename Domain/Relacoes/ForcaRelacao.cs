using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Relacoes
{
    [Owned]
    public class ForcaRelacao : IValueObject
    {

        public int Valor { get;  private set; }

        public bool Active{ get;  private set; }

        private ForcaRelacao()
        {
            this.Active = true;
        }

        public ForcaRelacao(int forca)
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