using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;
namespace DDDSample1.Domain.SharedValueObjects
{
    [Owned]
    public class Tag : IValueObject
    {

        public string Descricao { get;  private set; }

        public bool Active{ get;  private set; }

        private Tag()
        {
            this.Active = true;
        }

        public Tag(string tag)
        {
            this.Descricao = tag;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}