using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Posts
{
    [Owned]
    public class Comentario : IValueObject
    {

        public string Texto { get;  private set; }

        public bool Active{ get;  private set; }

        private Comentario()
        {
            this.Active = true;
        }

        public Comentario(string comentario)
        {
            this.Texto = comentario;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}