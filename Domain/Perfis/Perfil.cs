using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SharedValueObjects;

namespace DDDSample1.Domain.Perfis
{
    public class Perfil : Entity<PerfilId>, IAggregateRoot
    {

        public Nome nome { get; private set; }

        public Email email { get; private set; }

        public Telefone telefone { get; private set; }

        public Pais pais { get; private set; }

        public Cidade cidade { get; private set; }

        public DataNascimento dataNascimento { get; private set; }

        public EstadoHumor estadoHumor { get; private set; }

        public Password password { get; private set; }

        public List<Tag> tags { get; private set; }

        public PerfilFacebook perfilFacebook { get; private set; }

        public PerfilLinkedin perfilLinkedin { get; private set; }

        public bool Active { get; private set; }

        private Perfil()
        {
            this.Active = true;
        }

        public Perfil(/*string code, */string nome, string email, long telefone, List<string> tag, string data, string estado, string password, string pais, string cidade, string perfilFB, string perfilLI)
        {
            //this.Id = new PerfilId(code);
            this.nome = new Nome(nome);
            this.email = new Email(email);
            this.telefone = new Telefone(telefone);
            this.dataNascimento = new DataNascimento(data);
            setTags(tag);
            this.password = new Password(password);
            setestadoHumor(estado);
            this.pais = new Pais(pais);
            this.cidade = new Cidade(cidade);
            this.perfilFacebook = new PerfilFacebook(perfilFB);
            this.perfilLinkedin = new PerfilLinkedin(perfilLI);
            this.Active = true;
        }

        private void setTags(List<string> tag)
        {
            List<Tag> tagsList = new List<Tag>();
            foreach (string t in tag)
            {
                tagsList.Add(new Tag(t));
            }
            this.tags = tagsList;
        }

        private void setestadoHumor(string estado)
        {
            try
            {
                EstadoHumor enumerado;
                EstadoHumor.TryParse(estado, out enumerado);
                this.estadoHumor = enumerado;
            }
            catch
            {
                throw new BusinessRuleValidationException("Information incorrect due to spelling or because it does not exist according to OCC model.");
            }
        }

        public void Changenome(string nome)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the name to an inactive profile.");
            this.nome = new Nome(nome);
        }

        public void Changeemail(string email)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the email to an inactive profile.");
            this.email = new Email(email);
        }

        public void Changetelefone(long telefone)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the phone number to an inactive profile.");
            this.telefone = new Telefone(telefone);
        }

        public void ChangedataNascimento(string data)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the date to an inactive profile.");
            this.dataNascimento = new DataNascimento(data);
        }

        /*public void ChangeestadoHumor(string estado)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the mood to an inactive profile.");
            this.estadoHumor = new estadoHumor(estado);
        }*/

        public void ChangePerfilFacebook(string perfil)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the facebook profile to an inactive profile.");
            this.perfilFacebook = new PerfilFacebook(perfil);
        }

        public void ChangePerfilLinkedin(string perfil)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the linkedin profile to an inactive profile.");
            this.perfilLinkedin = new PerfilLinkedin(perfil);
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}