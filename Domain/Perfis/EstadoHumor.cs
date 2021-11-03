using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Perfis
{
    public class EstadoHumor : IValueObject
    {

        public string EstadoHumor { get;  private set; }

        public bool Active{ get;  private set; }

        private EstadoHumor()
        {
            this.Active = true;
        }

        public EstadoHumor(string estado)
        {
            this.EstadoHumor = estado;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}