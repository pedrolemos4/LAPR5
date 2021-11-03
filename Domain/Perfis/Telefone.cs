using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Perfis
{
    public class Telefone : IValueObject
    {

        public int Telefone { get;  private set; }

        public bool Active{ get;  private set; }

        private Telefone()
        {
            this.Active = true;
        }

        public Telefone(int telefone)
        {
            this.Telefone = telefone;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}