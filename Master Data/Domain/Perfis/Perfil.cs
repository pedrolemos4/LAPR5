using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SharedValueObjects;

namespace DDDSample1.Domain.Perfis
{
    public class Perfil : Entity<PerfilId>, IAggregateRoot
    {
        public Avatar avatar { get; private set; }

        public Nome nome { get; private set; }

        public Email email { get; private set; }

        public Telefone telefone { get; private set; }

        public Pais pais { get; private set; }

        public Cidade cidade { get; private set; }

        public DataNascimento dataNascimento { get; private set; }

        public List<EstadoHumor> estadoHumor { get; private set; }

        public Password password { get; private set; }

        public List<Tag> tags { get; private set; }

        public PerfilFacebook perfilFacebook { get; private set; }

        public PerfilLinkedin perfilLinkedin { get; private set; }

        public bool Active { get; private set; }

        private Perfil()
        {
            this.Active = true;
        }

        public Perfil(string avatar, string nome, string email, long telefone, List<string> tag, string data, Dictionary<string,decimal> estado, string password, string pais, string cidade, string perfilFB, string perfilLI)
        {
            this.Id = new PerfilId(Guid.NewGuid());
            this.avatar = new Avatar(avatar);
            this.nome = new Nome(nome);
            this.email = new Email(email);
            this.telefone = new Telefone(telefone);
            this.dataNascimento = new DataNascimento(data);
            setTags(tag);
            this.password = new Password(password);
            setEstadoHumor(estado);
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

        private void setEstadoHumor(Dictionary<string,decimal> estado)
        {
            List<EstadoHumor> estadoList = new List<EstadoHumor>();
            foreach( KeyValuePair<string, decimal> kvp in estado ){
                //string[] array = t.Split(" ");
                estadoList.Add(new EstadoHumor(kvp.Key, kvp.Value));
            }
            this.estadoHumor = estadoList;
        }
        public void ChangeTags(List<string> tags)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar as tags de um perfil inativo.");
            setTags(tags);
        }
        public void Changenome(string nome)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar o nome de um perfil inativo.");
            this.nome = new Nome(nome);
        }

        public void ChangePais(string pais)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar o pais de um perfil inativo.");
            this.pais = new Pais(pais);
        }

        public void Changetelefone(long telefone)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar o telefone de um perfil inativo.");
            this.telefone = new Telefone(telefone);
        }

        public void ChangedataNascimento(string data)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar a data de aniversario de um perfil inativo.");
            this.dataNascimento = new DataNascimento(data);
        }

        public void ChangeestadoHumor(Dictionary<string,decimal> estado)
        {
            if (!this.Active){
                throw new BusinessRuleValidationException("Não é possível alterar os estados de humor de um perfil inativo.");
            }
            setEstadoHumor(estado);
        }

        public void ChangePerfilFacebook(string perfil)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar o perfil de facebook de um perfil inativo.");
            this.perfilFacebook = new PerfilFacebook(perfil);
        }

        public void ChangePerfilLinkedin(string perfil)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar o perfil de linkedin de um perfil inativo.");
            this.perfilLinkedin = new PerfilLinkedin(perfil);
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}