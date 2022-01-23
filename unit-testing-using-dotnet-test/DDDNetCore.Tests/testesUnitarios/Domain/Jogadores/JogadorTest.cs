using System;
using System.Collections.Generic;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Relacoes;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Jogadores
{
    public class JogadorTest
    {
        [Fact]
        public void CriacaoJogador()
        {
            Dictionary<string, decimal> mapa1 = new Dictionary<string, decimal>();
            mapa1.Add("Joyful", 0.5m);
            mapa1.Add("Distressed", 0.5m);
            mapa1.Add("Hopeful", 0.5m);
            mapa1.Add("Fearful", 0.5m);
            mapa1.Add("Relieved", 0.5m);
            mapa1.Add("Disappointed", 0.5m);
            mapa1.Add("Proud", 0.5m);
            mapa1.Add("Remorseful", 0.5m);
            mapa1.Add("Grateful", 0.5m);
            mapa1.Add("Angry", 0.8m);

            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 351915246058;
            List<string> tag = new List<string>();
            tag.Add("musica");
            string data = "2000-08-15";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";
            Perfil per = new Perfil("", nome, email, telefone, tag, data, mapa1, password, pais, cidade, perfilFB, perfilLI);
            Jogador jogador = new Jogador(per.Id);

            Assert.Equal(per.Id, jogador.Perfil);
        }

        [Fact]
        public void VerificaPerfilNull()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new Jogador(null));
        }

        [Fact]
        public void VerificaJogadorcomPontosNegativos()
        {
            Dictionary<string, decimal> mapa1 = new Dictionary<string, decimal>();
            mapa1.Add("Joyful", 0.5m);
            mapa1.Add("Distressed", 0.5m);
            mapa1.Add("Hopeful", 0.5m);
            mapa1.Add("Fearful", 0.5m);
            mapa1.Add("Relieved", 0.5m);
            mapa1.Add("Disappointed", 0.5m);
            mapa1.Add("Proud", 0.5m);
            mapa1.Add("Remorseful", 0.5m);
            mapa1.Add("Grateful", 0.5m);
            mapa1.Add("Angry", 0.8m);

            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 351915246058;
            List<string> tag = new List<string>();
            tag.Add("musica");
            string data = "2000-08-15";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";
            Perfil per = new Perfil("", nome, email, telefone, tag, data, mapa1, password, pais, cidade, perfilFB, perfilLI);
            Jogador jogador = new Jogador(per.Id);

            Action act = () => jogador.ChangePontuacao(-9);

            Assert.Throws<BusinessRuleValidationException>(act);
        }

    }
}