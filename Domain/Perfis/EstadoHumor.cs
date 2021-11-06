using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Perfis
{
    public class EstadoHumor : IValueObject
    {

        public string Humor { get;  private set; }

        public bool Active{ get;  private set; }

        private EstadoHumor()
        {
            this.Active = true;
        }

        public EstadoHumor(string estado)
        {
            this.Humor = estado;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}