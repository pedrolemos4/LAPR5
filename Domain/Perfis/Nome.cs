using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Perfis
{
    public class Nome : IValueObject
    {

        public string Name { get;  private set; }

        public bool Active{ get;  private set; }

        private Nome()
        {
            this.Active = true;
        }

        public Nome(string nome)
        {
            this.Name = nome;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}