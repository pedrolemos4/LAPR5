using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Relacoes
{
    public class ForcaRelacao : IValueObject
    {

        public int ForcaRelacao { get;  private set; }

        public bool Active{ get;  private set; }

        private ForcaRelacao()
        {
            this.Active = true;
        }

        public ForcaRelacao(int forca)
        {
            this.ForcaRelacao = forca;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}