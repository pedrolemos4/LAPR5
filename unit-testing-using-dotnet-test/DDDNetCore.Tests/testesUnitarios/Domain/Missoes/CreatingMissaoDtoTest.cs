using System;
using System.Collections.Generic;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Missoes;
using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Missoes
{
    public class CreatingMissaoDtoTest
    {
        [Fact]
        public void CriacaoMissaoDto() {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 351915246058;
            List<string> tag = new List<string>();
            tag.Add("musica");
            string data = "2000/08/15";
            string estado = "Disappointed";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";
            Perfil per = new Perfil(nome, email, telefone, tag, data, estado, password, pais, cidade, perfilFB, perfilLI);
            Jogador jogador = new Jogador(per);

            int dificuldade = 2;
            string dataMissao = "2020/05/12";

            CreatingMissaoDto missao = new CreatingMissaoDto(dificuldade, dataMissao, jogador.Id.AsGuid());

            Assert.Equal(dificuldade, missao.Dificuldade);
            Assert.Equal(dataMissao, missao.Data);
            Assert.Equal(jogador.Id.AsGuid(), missao.JogadorObjetivo);
        }
    }
}