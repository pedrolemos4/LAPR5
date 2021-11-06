using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.SharedValueObjects
{
    public class Estado : IValueObject
    {

        public string Descricao { get;  private set; }

        public bool Active{ get;  private set; }

        private Estado()
        {
            this.Active = true;
        }

        public Estado(string estado)
        {
            this.Descricao = estado;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}