using Xunit;
using System.Collections.Generic;
using DDDSample1.Domain.Ligacoes;
using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SharedValueObjects;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Ligacoes
{
    public class LigacaoTest
    {
        [Fact]
        public void CriacaoLigacao()
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
            Jogador jogador1 = new Jogador(per.Id);

            string nome1 = "Ricardo";
            string email1 = "ricardo.pires@gmail.com";
            long telefone1 = 351932468250;
            List<string> tag1 = new List<string>();
            tag1.Add("desporto");
            string data1 = "2001-07-20";
            string password1 = "QS@D15oAX.qw";
            string pais1 = "en-PT";
            string cidade1 = "Porto1";
            string perfilFB1 = "perfilFb1";
            string perfilLI1 = "perfilLin1";
            Perfil per1 = new Perfil("", nome1, email1, telefone1, tag1, data1, mapa1, password1, pais1, cidade1, perfilFB1, perfilLI1);
            Jogador jogador2 = new Jogador(per1.Id);

            string textoLigacao = "friends";
            string estadoLigacao = "Pendente";
            Ligacao lig = new Ligacao(textoLigacao, estadoLigacao, jogador1.Id, jogador2.Id);
            Assert.Equal(jogador1.Id, lig.Jogador1);
            Assert.Equal(jogador2.Id, lig.Jogador2);
            Assert.Equal(textoLigacao, lig.TextoLigacao.Texto);
            Assert.Equal(estadoLigacao, lig.EstadoLigacao.ToString());
        }

        [Fact]
        public void VerificaJogador2IsNull()
        {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 351915246058;
            List<string> tag = new List<string>();
            tag.Add("musica");
            string data = "2000-08-15";
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
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";
            Perfil per = new Perfil("", nome, email, telefone, tag, data, mapa1, password, pais, cidade, perfilFB, perfilLI);
            Jogador jogador1 = new Jogador(per.Id);
            string textoLigacao = "friends";
            string estadoLigacao = "Pendente";
            Assert.Throws<BusinessRuleValidationException>(() => new Ligacao(textoLigacao, estadoLigacao, jogador1.Id, null));
        }

        [Fact]
        public void VerificaJogador1IsNull()
        {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 351915246058;
            List<string> tag = new List<string>();
            tag.Add("musica");
            string data = "2000-08-15";
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
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";
            Perfil per = new Perfil("", nome, email, telefone, tag, data, mapa1, password, pais, cidade, perfilFB, perfilLI);
            Jogador jogador2 = new Jogador(per.Id);
            string textoLigacao = "friends";
            string estadoLigacao = "Pendente";
            Assert.Throws<BusinessRuleValidationException>(() => new Ligacao(textoLigacao, estadoLigacao, null, jogador2.Id));
        }
    }
}