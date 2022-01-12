using System.Collections.Generic;

namespace DDDSample1.Domain.Perfis
{
    public class CreatingPerfilDto
    {

        public string avatar { get; set; }

        public string nome { get; set; }

        public string email { get; set; }

        public long telefone { get; set; }

        public string pais { get; set; }

        public string cidade { get; set; }

        public string dataNascimento { get; set; }

        public List<string> estadoHumor { get; set; }

        public string password { get; set; }

        public List<string> tags { get; set; }

        public string perfilFacebook { get; set; }

        public string perfilLinkedin { get; set; }

        public CreatingPerfilDto(string avatar, string nome, string email, long telefone, List<string> tag, string data, List<string> estado, string password, string pais, string cidade, string perfilFB, string perfilLI)
        {
            this.avatar = (avatar);
            this.nome = (nome);
            this.email = (email);
            this.telefone = (telefone);
            this.dataNascimento = (data);
            this.tags = tag;
            this.password = (password);
            this.estadoHumor = (estado);
            this.pais = (pais);
            this.cidade = (cidade);
            this.perfilFacebook = (perfilFB);
            this.perfilLinkedin = (perfilLI);
        }
    }
}