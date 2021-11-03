using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Perfis
{
    public class PerfilFacebook : IValueObject
    {

        public string PerfilFacebook { get;  private set; }

        public bool Active{ get;  private set; }

        private PerfilFacebook()
        {
            this.Active = true;
        }

        public PerfilFacebook(string perfilFB)
        {
            this.PerfilFacebook = perfilFB;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}