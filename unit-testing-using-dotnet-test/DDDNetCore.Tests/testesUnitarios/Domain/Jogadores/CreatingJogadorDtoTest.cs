using System.Collections.Generic;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Perfis;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Jogadores
{
    public class CreatingJogadorDtoTest
    {
        [Fact]
        public void CriacaoJogadorDto() {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 351915246058;
            List<string> tag =  new List<string>();
            tag.Add("musica");
            string data = "2000-08-15";
            string estado = "Disappointed";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";
            Perfil per = new Perfil(nome, email, telefone, tag, data, estado, password, pais, cidade, perfilFB, perfilLI);

            List<string> listRelacoes = new List<string>();
            List<string> listMissoes = new List<string>();
            List<string> listPosts = new List<string>();
            CreatingJogadorDto jogador = new CreatingJogadorDto(10, per.Id.AsGuid(), listRelacoes, listMissoes, listPosts);

            Assert.Equal(per.Id.AsGuid(), jogador.perfilId);
        }
    }
}