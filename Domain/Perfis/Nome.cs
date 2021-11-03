using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Perfis
{
    public class Nome : IValueObject
    {

        public string Nome { get;  private set; }

        public bool Active{ get;  private set; }

        private Nome()
        {
            this.Active = true;
        }

        public Nome(string nome)
        {
            this.Nome = nome;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}