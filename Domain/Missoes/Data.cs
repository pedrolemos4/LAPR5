using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Missoes
{
    public class Data : IValueObject
    {

        public string Data { get;  private set; }

        public bool Active{ get;  private set; }

        private Data()
        {
            this.Active = true;
        }

        public Data(string data)
        {
            this.Data = data;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}