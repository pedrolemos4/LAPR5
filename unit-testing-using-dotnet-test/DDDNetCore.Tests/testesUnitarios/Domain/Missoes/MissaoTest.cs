using System;
using System.Collections.Generic;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Missoes;
using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Missoes
{
    public class MissaoTest
    {
        [Fact]
        public void CriacaoMissao() {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 351915246058;
            List<string> tag = new List<string>();
            tag.Add("musica");
            string data = "2000-08-15";
            string estado = "Disappointed";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";
            Perfil per = new Perfil(nome, email, telefone, tag, data, estado, password, pais, cidade, perfilFB, perfilLI);
            Jogador jogador = new Jogador(per.Id);

            int dificuldade = 2;
            string dataMissao = "2020-05-12";

            Missao missao = new Missao(dificuldade, dataMissao, jogador);

            Assert.Equal(dificuldade, missao.Dificuldade.GrauDificuldade);
            Assert.Equal(dataMissao, missao.Data.Date);
            Assert.Equal(jogador, missao.JogadorObjetivo);
        }

        [Fact]
        public void VerficaMissaoComDificuldadeNegativa() {
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
            Jogador jogador = new Jogador(per.Id);

            int dificuldade = -2;
            string dataMissao = "2020-05-12";

            Assert.Throws<BusinessRuleValidationException>(() =>  new Missao(dificuldade, dataMissao, jogador));
        }

        [Fact]
        public void VerficaMissaoComDificuldadeNula() {
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
            Jogador jogador = new Jogador(per.Id);

            int dificuldade = 0;
            string dataMissao = "2020-05-12";

            Assert.Throws<BusinessRuleValidationException>(() =>  new Missao(dificuldade, dataMissao, jogador));
        }

        [Fact]
        public void VerficaMissaoComJogadorNull() {
            int dificuldade = 0;
            string dataMissao = "2020-05-12";

            Assert.Throws<BusinessRuleValidationException>(() =>  new Missao(dificuldade, dataMissao, null));
        }

        [Fact]
        public void VerficaChangeDificuldade() {
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
            Jogador jogador = new Jogador(per.Id);
            int dificuldade = 2;
            string dataMissao = "2020-05-12";
            int dificuldadeAlterada = 1;

            Missao missao = new Missao(dificuldade, dataMissao, jogador);
            missao.ChangeDificuldade(dificuldadeAlterada);

            Assert.Equal(dificuldadeAlterada, missao.Dificuldade.GrauDificuldade);
        }

        [Fact]
        public void VerficaChangeDificuldadeInvalido() {
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
            Jogador jogador = new Jogador(per.Id);
            int dificuldade = 2;
            string dataMissao = "2020-05-12";
            int dificuldadeAlterada = 1;

            Missao missao = new Missao(dificuldade, dataMissao, jogador);
            missao.MarkAsInative();

            Action act = () => missao.ChangeDificuldade(dificuldadeAlterada);

            Assert.Throws<BusinessRuleValidationException>(act);
        }

        [Fact]
        public void VerficaChangeDataInvalido() {
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
            Jogador jogador = new Jogador(per.Id);
            int dificuldade = 2;
            string dataMissao = "2020-05-12";
            string dataAlterada = "2020-07-12";

            Missao missao = new Missao(dificuldade, dataMissao, jogador);
            missao.MarkAsInative();

            Action act = () => missao.ChangeData(dataAlterada);

            Assert.Throws<BusinessRuleValidationException>(act);
        }

        [Fact]
        public void VerficaChangeData() {
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
            Jogador jogador = new Jogador(per.Id);
            int dificuldade = 2;
            string dataMissao = "2020-05-12";
            string dataAlterada = "2020-07-12";

            Missao missao = new Missao(dificuldade, dataMissao, jogador);

            missao.ChangeData(dataAlterada);

            Assert.Equal(dataAlterada, missao.Data.Date);
        }

        [Fact]
        public void VerficaChangeJogadorObjetivo() {
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
            Jogador jogador = new Jogador(per.Id);

            string nome1 = "Ricardo";
            string email1 = "ricardo.pires@gmail.com";
            long telefone1 = 351932468250;
            List<string> tag1 =  new List<string>();
            tag1.Add("desporto");
            string data1 = "2001-07-20";
            string estado1 = "Joyful";
            string password1 = "QS@D15oAX.qw";
            string pais1 = "en-PT";
            string cidade1 = "Porto1";
            string perfilFB1 = "perfilFb1";
            string perfilLI1 = "perfilLin1";
            Perfil per1 = new Perfil(nome1, email1, telefone1, tag1, data1, estado1, password1, pais1, cidade1, perfilFB1, perfilLI1);
            Jogador jog2 = new Jogador(per1.Id);

            int dificuldade = 2;
            string dataMissao = "2020-05-12";

            Missao missao = new Missao(dificuldade, dataMissao, jogador);

            missao.ChangeObjetivo(jog2);

            Assert.Equal(jog2, missao.JogadorObjetivo);
        }

        [Fact]
        public void VerficaChangeJogadorObjetivoInvalido() {
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
            Jogador jogador = new Jogador(per.Id);

            string nome1 = "Ricardo";
            string email1 = "ricardo.pires@gmail.com";
            long telefone1 = 351932468250;
            List<string> tag1 =  new List<string>();
            tag1.Add("desporto");
            string data1 = "2001-07-20";
            string estado1 = "Joyful";
            string password1 = "QS@D15oAX.qw";
            string pais1 = "en-PT";
            string cidade1 = "Porto1";
            string perfilFB1 = "perfilFb1";
            string perfilLI1 = "perfilLin1";
            Perfil per1 = new Perfil(nome1, email1, telefone1, tag1, data1, estado1, password1, pais1, cidade1, perfilFB1, perfilLI1);
            Jogador jog2 = new Jogador(per1.Id);

            int dificuldade = 2;
            string dataMissao = "2020-05-12";

            Missao missao = new Missao(dificuldade, dataMissao, jogador);
            missao.MarkAsInative();

            Action act = () => missao.ChangeObjetivo(jog2);

            Assert.Throws<BusinessRuleValidationException>(act);
        }


            
    }
}