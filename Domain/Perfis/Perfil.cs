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

        public Perfil(string code, Nome nome, Email email, Telefone telefone, DataNascimento data, EstadoHumor estado, PerfilFacebook perfilFB, PerfilLinkedin perfilLI)
        {
            this.Id = new PerfilId(code);
            this.Nome = nome;
            this.Email = email;
            this.Telefone = telefone;
            this.DataNascimento = data;
            this.EstadoHumor = estado;
            this.PerfilFacebook = perfilFB;
            this.PerfilLinkedin = perfilLI;
            this.Active = true;
        }

        public void ChangeNome(Nome nome)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the name to an inactive profile.");
            this.Nome = nome;
        }

        public void ChangeEmail(Email email)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the email to an inactive profile.");
            this.Email = email;
        }

        public void ChangeTelefone(Telefone telefone)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the phone number to an inactive profile.");
            this.Telefone = telefone;
        }

        public void ChangeDataNascimento(DataNascimento data)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the date to an inactive profile.");
            this.DataNascimento = data;
        }

        public void ChangeEstadoHumor(EstadoHumor estado)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the mood to an inactive profile.");
            this.EstadoHumor = estado;
        }

        public void ChangePerfilFacebook(PerfilFacebook perfil)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the facebook profile to an inactive profile.");
            this.PerfilFacebook = perfil;
        }

        public void ChangePerfilLinkedin(PerfilLinkedin perfil)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the linkedin profile to an inactive profile.");
            this.PerfilLinkedin = perfil;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}