using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Perfis
{
    public class PerfilLinkedin : IValueObject
    {

        public string PerfilLinkedin { get;  private set; }

        public bool Active{ get;  private set; }

        private PerfilLinkedin()
        {
            this.Active = true;
        }

        public PerfilLinkedin(string perfilLI)
        {
            this.PerfilLinkedin = perfilLI;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}