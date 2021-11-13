using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;
namespace DDDSample1.Domain.Posts
{
    [Owned]
    public class Texto : IValueObject
    {

        public string Descricao { get;  private set; }

        public bool Active{ get;  private set; }

        private Texto()
        {
            this.Active = true;
        }

        public Texto(string texto)
        {
            this.Descricao = texto;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}