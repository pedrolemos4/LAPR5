using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Posts
{
    public class Texto : IValueObject
    {

        public string Texto { get;  private set; }

        public bool Active{ get;  private set; }

        private Texto()
        {
            this.Active = true;
        }

        public Texto(string texto)
        {
            this.Texto = texto;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}