using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.SharedValueObjects
{
    public class ForcaLigacao : IValueObject
    {

        public int ForcaLigacao { get;  private set; }

        public bool Active{ get;  private set; }

        private ForcaLigacao()
        {
            this.Active = true;
        }

        public ForcaLigacao(int forca)
        {
            this.ForcaLigacao = forca;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}