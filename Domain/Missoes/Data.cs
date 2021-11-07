using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;
namespace DDDSample1.Domain.Missoes
{
    [Owned]
    public class Data : IValueObject
    {

        public string Date { get;  private set; }

        public bool Active{ get;  private set; }

        private Data()
        {
            this.Active = true;
        }

        public Data(string data)
        {
            this.Date = data;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}