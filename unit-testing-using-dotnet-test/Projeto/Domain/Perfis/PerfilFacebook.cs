using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Perfis
{
    [Owned]
    public class PerfilFacebook : IValueObject
    {

        public string PerfilFace { get;  private set; }

        public bool Active{ get;  private set; }

        private PerfilFacebook()
        {
            this.Active = true;
        }

        public PerfilFacebook(string perfilFB)
        {
            this.PerfilFace = perfilFB;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}