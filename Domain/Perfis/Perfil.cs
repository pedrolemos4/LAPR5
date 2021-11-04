using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Perfis
{
    public class Perfil : Entity<PerfilId>, IAggregateRoot
    {

        public Nome Nome { get;  private set; }

        public Email Email { get;  private set; }

        public Telefone Telefone { get;  private set; }

        public DataNascimento DataNascimento { get;  private set; }

        public EstadoHumor EstadoHumor { get;  private set; }

        public PerfilFacebook PerfilFacebook { get;  private set; }

        public PerfilLinkedin PerfilLinkedin { get;  private set; }

        public bool Active{ get;  private set; }

        private Perfil()
        {
            this.Active = true;
        }

        public Perfil(string code, string nome, string email, int telefone, string data, string estado, string perfilFB, string perfilLI)
        {
            this.Id = new PerfilId(code);
            this.Nome = new Nome(nome);
            this.Email = new Email(email);
            this.Telefone = new Telefone(telefone);
            this.DataNascimento = new DataNascimento(data);
            this.EstadoHumor = new EstadoHumor(estado);
            this.PerfilFacebook = new PerfilFacebook(perfilFB);
            this.PerfilLinkedin = new PerfilLinkedin(perfilLI);
            this.Active = true;
        }

        public void ChangeNome(string nome)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the name to an inactive profile.");
            this.Nome = new Nome(nome);
        }

        public void ChangeEmail(string email)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the email to an inactive profile.");
            this.Email = new Email(email);
        }

        public void ChangeTelefone(int telefone)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the phone number to an inactive profile.");
            this.Telefone = new Telefone(telefone);
        }

        public void ChangeDataNascimento(string data)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the date to an inactive profile.");
            this.DataNascimento = new DataNascimento(data);
        }

        public void ChangeEstadoHumor(string estado)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the mood to an inactive profile.");
            this.EstadoHumor = new EstadoHumor(estado);
        }

        public void ChangePerfilFacebook(string perfil)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the facebook profile to an inactive profile.");
            this.PerfilFacebook = new PerfilFacebook(perfil);
        }

        public void ChangePerfilLinkedin(string perfil)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the linkedin profile to an inactive profile.");
            this.PerfilLinkedin = new PerfilLinkedin(perfil);
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}