using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SharedValueObjects;

namespace DDDSample1.Domain.Perfis
{
    public class CreatingPerfilDto
    {

        public string nome { get; set; }

        public string email { get; set; }

        public long telefone { get; set; }

        public string pais { get; set; }

        public string cidade { get; set; }

        public string dataNascimento { get; set; }

        public string estadoHumor { get; set; }

        public string password { get; set; }

        public List<string> tags { get; set; }

        public string perfilFacebook { get; set; }

        public string perfilLinkedin { get; set; }

        public bool Active { get; set; }

        public CreatingPerfilDto(string nome, string email, long telefone, List<string> tag, string data, string estado, string password, string pais, string cidade, string perfilFB, string perfilLI)
        {
            this.nome = (nome);
            this.email = (email);
            this.telefone = (telefone);
            this.dataNascimento = (data);
            this.tags=tag;
            this.password = (password);
            this.estadoHumor = estadoHumor;
            this.pais = (pais);
            this.cidade = (cidade);
            this.perfilFacebook = (perfilFB);
            this.perfilLinkedin = (perfilLI);
            this.Active = true;
            //setTags(tag);
        }

        // private void setTags(List<string> tag)
        // {
        //     List<string> tagsList = new List<string>();
        //     foreach (string t in tag)
        //     {
        //         tagsList.Add(t);
        //     }
        //     this.tags = tagsList;
        // }
    }
}