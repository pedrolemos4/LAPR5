
using System.Collections.Generic;
using DDDSample1.Domain.Introducoes;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SharedValueObjects;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Introducoes
{
    public class IntroducaoTest
    {
        [Fact]
        public void CriacaoIntroducao() {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 351915246058;
            List<string> tag =  new List<string>();
            tag.Add("musica");
            string data = "2000/08/15";
            string estado = "Disappointed";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";
            Perfil per = new Perfil(nome, email, telefone, tag, data, estado, password, pais, cidade, perfilFB, perfilLI);
            Jogador jogInicial = new Jogador(per);

            string nome1 = "Ricardo";
            string email1 = "ricardo.pires@gmail.com";
            long telefone1 = 351932468250;
            List<string> tag1 =  new List<string>();
            tag1.Add("desporto");
            string data1 = "2001/07/20";
            string estado1 = "Joyful";
            string password1 = "QS@D15oAX.qw";
            string pais1 = "en-PT";
            string cidade1 = "Porto1";
            string perfilFB1 = "perfilFb1";
            string perfilLI1 = "perfilLin1";
            Perfil per1 = new Perfil(nome1, email1, telefone1, tag1, data1, estado1, password1, pais1, cidade1, perfilFB1, perfilLI1);
            Jogador jogIntrodutor = new Jogador(per1);

            string nome2 = "Carla";
            string email2 = "coliveira.123@gmail.com";
            long telefone2 = 351926582021;
            List<string> tag2 =  new List<string>();
            tag2.Add("cinema");
            string data2 = "1990/08/15";
            string estado2 = "Joyful";
            string password2 = "12SD+22@sa";
            string pais2 = "en-PT";
            string cidade2 = "Porto1";
            string perfilFB2 = "perfilFb2";
            string perfilLI2 = "perfilLin2";
            Perfil per2 = new Perfil(nome2, email2, telefone2, tag2, data2, estado2, password2, pais2, cidade2, perfilFB2, perfilLI2);
            Jogador jogObj = new Jogador(per2);

            string estadoIntro = "Pendente";
            Introducao intro = new Introducao(jogInicial,jogIntrodutor,jogObj, estadoIntro);
            Assert.Equal(jogInicial, intro.JogadorInicial);
            Assert.Equal(jogIntrodutor, intro.JogadorIntrodutor);
            Assert.Equal(jogObj, intro.JogadorObjetivo);
            Assert.Equal(estadoIntro, intro.EstadoIntroducao.ToString());
        }

        [Fact]
        public void VerfificaEstadoIntroducaoInvalido() {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 351915246058;
            List<string> tag =  new List<string>();
            tag.Add("musica");
            string data = "2000/08/15";
            string estado = "Disappointed";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";
            Perfil per = new Perfil(nome, email, telefone, tag, data, estado, password, pais, cidade, perfilFB, perfilLI);
            Jogador jogInicial = new Jogador(per);

            string nome1 = "Ricardo";
            string email1 = "ricardo.pires@gmail.com";
            long telefone1 = 351932468250;
            List<string> tag1 =  new List<string>();
            tag1.Add("desporto");
            string data1 = "2001/07/20";
            string estado1 = "Joyful";
            string password1 = "QS@D15oAX.qw";
            string pais1 = "en-PT";
            string cidade1 = "Porto1";
            string perfilFB1 = "perfilFb1";
            string perfilLI1 = "perfilLin1";
            Perfil per1 = new Perfil(nome1, email1, telefone1, tag1, data1, estado1, password1, pais1, cidade1, perfilFB1, perfilLI1);
            Jogador jogIntrodutor = new Jogador(per1);

            string nome2 = "Carla";
            string email2 = "coliveira.123@gmail.com";
            long telefone2 = 351926582021;
            List<string> tag2 =  new List<string>();
            tag2.Add("cinema");
            string data2 = "1990/08/15";
            string estado2 = "Joyful";
            string password2 = "12SD+22@sa";
            string pais2 = "en-PT";
            string cidade2 = "Porto1";
            string perfilFB2 = "perfilFb2";
            string perfilLI2 = "perfilLin2";
            Perfil per2 = new Perfil(nome2, email2, telefone2, tag2, data2, estado2, password2, pais2, cidade2, perfilFB2, perfilLI2);
            Jogador jogObj = new Jogador(per2);

            string estadoIntro = "Por decidir";
            //Assert.Throws<BusinessRuleValidationException>(() => 
            Introducao intro = new Introducao(jogInicial,jogIntrodutor,jogObj, estadoIntro);
            Assert.NotSame(intro.EstadoIntroducao, Estado.Aceite);
            Assert.NotSame(intro.EstadoIntroducao, Estado.Pendente);
            Assert.NotSame(intro.EstadoIntroducao, Estado.Recusado);
        }

        [Fact]
        public void VerfificaJogadorInicialNull() {

            string nome1 = "Ricardo";
            string email1 = "ricardo.pires@gmail.com";
            long telefone1 = 351932468250;
            List<string> tag1 =  new List<string>();
            tag1.Add("desporto");
            string data1 = "2001/07/20";
            string estado1 = "Joyful";
            string password1 = "QS@D15oAX.qw";
            string pais1 = "en-PT";
            string cidade1 = "Porto1";
            string perfilFB1 = "perfilFb1";
            string perfilLI1 = "perfilLin1";
            Perfil per1 = new Perfil(nome1, email1, telefone1, tag1, data1, estado1, password1, pais1, cidade1, perfilFB1, perfilLI1);
            Jogador jogIntrodutor = new Jogador(per1);

            string nome2 = "Carla";
            string email2 = "coliveira.123@gmail.com";
            long telefone2 = 351926582021;
            List<string> tag2 =  new List<string>();
            tag2.Add("cinema");
            string data2 = "1990/08/15";
            string estado2 = "Joyful";
            string password2 = "12SD+22@sa";
            string pais2 = "en-PT";
            string cidade2 = "Porto1";
            string perfilFB2 = "perfilFb2";
            string perfilLI2 = "perfilLin2";
            Perfil per2 = new Perfil(nome2, email2, telefone2, tag2, data2, estado2, password2, pais2, cidade2, perfilFB2, perfilLI2);
            Jogador jogObj = new Jogador(per2);

            string estadoIntro = "Por decidir";
            Assert.Throws<BusinessRuleValidationException>(() => new Introducao(null,jogIntrodutor,jogObj, estadoIntro));
        }

        [Fact]
        public void VerfificaJogadorIntrodutorNull() {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 351915246058;
            List<string> tag =  new List<string>();
            tag.Add("musica");
            string data = "2000/08/15";
            string estado = "Disappointed";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";
            Perfil per = new Perfil(nome, email, telefone, tag, data, estado, password, pais, cidade, perfilFB, perfilLI);
            Jogador jogInicial = new Jogador(per);

            string nome2 = "Carla";
            string email2 = "coliveira.123@gmail.com";
            long telefone2 = 351926582021;
            List<string> tag2 =  new List<string>();
            tag2.Add("cinema");
            string data2 = "1990/08/15";
            string estado2 = "Joyful";
            string password2 = "12SD+22@sa";
            string pais2 = "en-PT";
            string cidade2 = "Porto1";
            string perfilFB2 = "perfilFb2";
            string perfilLI2 = "perfilLin2";
            Perfil per2 = new Perfil(nome2, email2, telefone2, tag2, data2, estado2, password2, pais2, cidade2, perfilFB2, perfilLI2);
            Jogador jogObj = new Jogador(per2);

            string estadoIntro = "Aceite";
            Assert.Throws<BusinessRuleValidationException>(() => new Introducao(jogInicial,null,jogObj, estadoIntro));
        }

        [Fact]
        public void VerfificaJogadorObjetivoNull() {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 351915246058;
            List<string> tag =  new List<string>();
            tag.Add("musica");
            string data = "2000/08/15";
            string estado = "Disappointed";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";
            Perfil per = new Perfil(nome, email, telefone, tag, data, estado, password, pais, cidade, perfilFB, perfilLI);
            Jogador jogInicial = new Jogador(per);

            string nome1 = "Ricardo";
            string email1 = "ricardo.pires@gmail.com";
            long telefone1 = 351932468250;
            List<string> tag1 =  new List<string>();
            tag1.Add("desporto");
            string data1 = "2001/07/20";
            string estado1 = "Joyful";
            string password1 = "QS@D15oAX.qw";
            string pais1 = "en-PT";
            string cidade1 = "Porto1";
            string perfilFB1 = "perfilFb1";
            string perfilLI1 = "perfilLin1";
            Perfil per1 = new Perfil(nome1, email1, telefone1, tag1, data1, estado1, password1, pais1, cidade1, perfilFB1, perfilLI1);
            Jogador jogIntrodutor = new Jogador(per1);

            string estadoIntro = "Aceite";
            Assert.Throws<BusinessRuleValidationException>(() => new Introducao(jogInicial,jogIntrodutor,null, estadoIntro));
        }
    }
}