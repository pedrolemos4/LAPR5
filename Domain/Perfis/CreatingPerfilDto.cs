using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SharedValueObjects;

namespace DDDSample1.Domain.Perfis
{
    public class CreatingPerfilDto
    {

        public Nome nome { get; set; }

        public Email email { get; set; }

        public Telefone telefone { get; set; }

        public Pais pais { get; set; }

        public Cidade cidade { get; set; }

        public DataNascimento dataNascimento { get; set; }

        public EstadoHumor estadoHumor { get; set; }

        public Password password { get; set; }

        public List<Tag> tags { get; set; }

        public PerfilFacebook perfilFacebook { get; set; }

        public PerfilLinkedin perfilLinkedin { get; set; }

        public CreatingPerfilDto(string nome, string email, long telefone, List<string> tag, string data, string estado, string password, string pais, string cidade, string perfilFB, string perfilLI)
        {
            this.nome = new Nome(nome);
            this.email = new Email(email);
            this.telefone = new Telefone(telefone);
            this.dataNascimento = new DataNascimento(data);
            setTags(tag);
            this.password = new Password(password);
            this.estadoHumor = new EstadoHumor(estado);
            this.pais = new Pais(pais);
            this.cidade = new Cidade(cidade);
            this.perfilFacebook = new PerfilFacebook(perfilFB);
            this.perfilLinkedin = new PerfilLinkedin(perfilLI);
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
    }
}