using System.Collections.Generic;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Relacoes;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SharedValueObjects;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Relacoes
{
    public class RelacaoTest
    {
        [Fact]
        public void TestCreateRelacao()
        {
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
            Jogador jog1 = new Jogador(per);

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
            Jogador jog2 = new Jogador(per1);

            List<string> tags =  new List<string>();
            tags.Add("tag1");
            tags.Add("tag2");
            int fr = 5;
            int fl = 2;

            Relacao relacao = new Relacao(jog1.Id, jog2.Id, tags, fr, fl);

            List<string> tags2 = new List<string>();
            foreach(Tag tagg in relacao.Tags){
                tags2.Add(tagg.Descricao);
            }

            Assert.Equal(jog1.Id, relacao.Jogador1);
            Assert.Equal(jog2.Id, relacao.Jogador2);
            Assert.Equal(tags.ToString(), tags2.ToString());
            Assert.Equal(fr, relacao.ForcaRelacao.Valor);
            Assert.Equal(fl, relacao.ForcaLigacao.Valor);

        }

        [Fact]
        public void TestCreateRelacaoSemJogador()
        {
            Jogador jog1 = null;

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
            Jogador jog2 = new Jogador(per1);

            List<string> tags =  new List<string>();
            tags.Add("tag1");
            tags.Add("tag2");

            Assert.Null(jog1);
        }

        [Fact]
        public void TestCreateRelacaoSemTags()
        {
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
            Jogador jog1 = new Jogador(per);

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
            Jogador jog2 = new Jogador(per1);

            List<string> tags = null;

            Assert.Null(tags);
        }

        [Fact]
        public void TestCreateRelacaoSemForcaRelacao()
        {
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
            Jogador jog1 = new Jogador(per);

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
            Jogador jog2 = new Jogador(per1);

            List<string> tags =  new List<string>();
            tags.Add("tag1");
            tags.Add("tag2");
            int fr = 0;
            int fl = 2;

            Relacao relacao = new Relacao(jog1.Id, jog2.Id, tags, fr, fl);

            Assert.Equal(fr, 0);
        }

        [Fact]
        public void TestCreateRelacaoSemForcaLigacao()
        {
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
            Jogador jog1 = new Jogador(per);

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
            Jogador jog2 = new Jogador(per1);

            List<string> tags =  new List<string>();
            tags.Add("tag1");
            tags.Add("tag2");
            int fr = 5;
            int fl = 0;

            Assert.Throws<BusinessRuleValidationException>(() => new Relacao(jog1.Id, jog2.Id, tags, fr, fl));
        }

        [Fact]
        public void TestChangeTags()
        {
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
            Jogador jog1 = new Jogador(per);

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
            Jogador jog2 = new Jogador(per1);

            List<string> tags = new List<string>();
            tags.Add("tag1");
            tags.Add("tag2");
            int fr = 5;
            int fl = 2;

            Relacao relacao = new Relacao(jog1.Id, jog2.Id, tags, fr, fl);

            List<string> tags2 = new List<string>();
            tags.Add("tag3");
            tags.Add("tag4");

            relacao.ChangeTags(tags2);

            List<string> tags3 = new List<string>();
            foreach(Tag tag2 in relacao.Tags){
                tags3.Add(tag2.Descricao);
            }

            Assert.Equal(tags2.ToString(), tags3.ToString());
        }

        [Fact]
        public void TestChangeForcaLigacao()
        {
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
            Jogador jog1 = new Jogador(per);

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
            Jogador jog2 = new Jogador(per1);

            List<string> tags = new List<string>();
            tags.Add("tag1");
            tags.Add("tag2");
            int fr = 5;
            int fl = 2;

            Relacao relacao = new Relacao(jog1.Id, jog2.Id, tags, fr, fl);

            int fl2 = 4;

            relacao.ChangeForcaLigacao(fl2);

            Assert.Equal(fl2, relacao.ForcaLigacao.Valor);
        }
    }
}