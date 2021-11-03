using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Perfis
{
    public class DataNascimento : IValueObject
    {

        public string DataNascimento { get;  private set; }

        public bool Active{ get;  private set; }

        private DataNascimento()
        {
            this.Active = true;
        }

        public DataNascimento(string data)
        {
            this.DataNascimento = data;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}