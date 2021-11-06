using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SharedValueObjects;

namespace DDDSample1.Domain.Perfis
{
    public class Perfil : Entity<PerfilId>, IAggregateRoot
    {

        public Nome Nome { get; private set; }

        public Email Email { get; private set; }

        public Telefone Telefone { get; private set; }

        public DataNascimento DataNascimento { get; private set; }

        public EstadoHumor EstadoHumor { get; private set; }

        public List<Tag> tags { get; private set; }

        public PerfilFacebook PerfilFacebook { get; private set; }

        public PerfilLinkedin PerfilLinkedin { get; private set; }

        public bool Active { get; private set; }

        private Perfil()
        {
            this.Active = true;
        }

        public Perfil(string code, string nome, string email, int telefone, List<string> tag, string data, string estado, string password, string perfilFB, string perfilLI)
        {
            this.Id = new PerfilId(code);
            this.Nome = new Nome(nome);
            this.Email = new Email(email);
            this.Telefone = new Telefone(telefone);
            this.DataNascimento = new DataNascimento(data);
            setTags(tag);
            this.password = new Password(password);
            setEstadoHumor(estado);
            this.PerfilFacebook = new PerfilFacebook(perfilFB);
            this.PerfilLinkedin = new PerfilLinkedin(perfilLI);
            this.Active = true;
        }

        private void setTags(List<string> tag)
        {
            List<Tag> tags = new List<Tag>();
            foreach (Tag t in tag)
            {
                tags.Add(new Tag(tag));
            }
            this.tags = tags;
        }

        private void setEstadoHumor(string estado)
        {
            try
            {
                EstadoHumor enumerado;
                EstadoHumor.TryParse(estado, enumerado);
                this.EstadoHumor = enumerado;
            }
            catch
            {
                throw new BusinessRuleValidationException("Information incorrect due to spelling or because it does not exist according to OCC model.");
            }
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