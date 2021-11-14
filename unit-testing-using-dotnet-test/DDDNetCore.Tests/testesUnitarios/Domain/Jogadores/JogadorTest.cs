using System;
using System.Collections.Generic;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Missoes;
using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Posts;
using DDDSample1.Domain.Relacoes;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Jogadores
{
    public class JogadorTest
    {
        [Fact]
        public void CriacaoJogador() {
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
            Jogador jogador = new Jogador(per);

            Assert.Equal(per, jogador.perfil);
        }

        [Fact]
        public void VerificaPerfilNull() {
            Assert.Throws<BusinessRuleValidationException>(() => new Jogador(null));
        }

        [Fact]
        public void VerificaAdicionaMissoes() {
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
            Jogador jogador = new Jogador(per);

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
            
            Missao missao = new Missao(2,"2020/11/14",jog2);
            List<Missao> listaMissoes = new List<Missao>();
            listaMissoes.Add(missao);
            
            jogador.adicionaMissao(missao);

            Assert.Equal(listaMissoes, jogador.ListaMissoes);
        }

        [Fact]
        public void VerificaAdicionaRelacoes() {
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
            Jogador jogador = new Jogador(per);

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
            
            Relacao relacao = new Relacao(jogador.Id, jog2.Id, tag1, 9, 2);
            List<Relacao> lista = new List<Relacao>();
            lista.Add(relacao);
            
            jogador.adicionaRelacao(relacao);

            Assert.Equal(lista, jogador.ListaRelacoes);
        }

        [Fact]
        public void VerificaAdicionaPosts() {
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
            Jogador jogador = new Jogador(per);

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
            
            List<string> comentarios = new List<string>();
            comentarios.Add("comentario1");
            comentarios.Add("comentario2");
            Post post = new Post("post", tag1, comentarios, "10-2", 2);
            List<Post> lista = new List<Post>();
            lista.Add(post);
            
            jogador.adicionaPost(post);

            Assert.Equal(lista, jogador.ListaPosts);
        }

        [Fact]
        public void VerificaChangePosts() {
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
            Jogador jogador = new Jogador(per);

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
            
            List<string> comentarios = new List<string>();
            comentarios.Add("comentario1");
            comentarios.Add("comentario2");
            Post post = new Post("post", tag1, comentarios, "10-2", 2);
            List<Post> lista = new List<Post>();
            lista.Add(post);
            
            jogador.ChangePosts(lista);

            Assert.Equal(lista, jogador.ListaPosts);
        }

        [Fact]
        public void VerificaChangeMissoes() {
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
            Jogador jogador = new Jogador(per);

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
            
            Missao missao = new Missao(2,"2020/11/14",jog2);
            List<Missao> listaMissoes = new List<Missao>();
            listaMissoes.Add(missao);
            
            jogador.ChangeMissoes(listaMissoes);

            Assert.Equal(listaMissoes, jogador.ListaMissoes);
        }

        [Fact]
        public void VerificaChangeRelacoes() {
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
            Jogador jogador = new Jogador(per);

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
            
            Relacao relacao = new Relacao(jogador.Id, jog2.Id, tag1, 9, 2);
            HashSet<Relacao> lista = new HashSet<Relacao>();
            lista.Add(relacao);
            
            jogador.ChangeRelacoes(lista);

            Assert.Equal(lista, jogador.ListaRelacoes);
        }

        [Fact]
        public void VerificaChangePostsInvalido() {
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
            Jogador jogador = new Jogador(per);

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
            
            List<string> comentarios = new List<string>();
            comentarios.Add("comentario1");
            comentarios.Add("comentario2");
            Post post = new Post("post", tag1, comentarios, "10-2", 2);
            List<Post> lista = new List<Post>();
            lista.Add(post);

            jogador.MarkAsInative();
            
            Action act = () => jogador.ChangePosts(lista);

            Assert.Throws<BusinessRuleValidationException>(act);
        }

        [Fact]
        public void VerificaChangeMissoesInvalido() {
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
            Jogador jogador = new Jogador(per);

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
            
            Missao missao = new Missao(2,"2020/11/14",jog2);
            List<Missao> listaMissoes = new List<Missao>();
            listaMissoes.Add(missao);

            jogador.MarkAsInative();

            Action act = () => jogador.ChangeMissoes(listaMissoes);
    
            Assert.Throws<BusinessRuleValidationException>(act);

        }

        [Fact]
        public void VerificaChangeRelacoesInvalido() {
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
            Jogador jogador = new Jogador(per);

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
            
            Relacao relacao = new Relacao(jogador.Id, jog2.Id, tag1, 9, 2);
            HashSet<Relacao> lista = new HashSet<Relacao>();
            lista.Add(relacao);

            jogador.MarkAsInative();
            
            Action act = () => jogador.ChangeRelacoes(lista);

            Assert.Throws<BusinessRuleValidationException>(act);
        }

        [Fact]
        public void VerificaJogadorcomPontosNegativos() {
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
            Jogador jogador = new Jogador(per);

            Action act = () => jogador.ChangePontuacao(-9);

            Assert.Throws<BusinessRuleValidationException>(act);
        }
            
    }
}