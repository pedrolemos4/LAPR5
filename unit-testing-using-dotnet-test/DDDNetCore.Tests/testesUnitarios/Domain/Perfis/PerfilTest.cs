using System;
using System.Collections.Generic;
using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Posts;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SharedValueObjects;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Perfis
{
    public class PerfilTest
    {
        [Fact]
        public void TestCreatePerfil()
        {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 351915246058;
            List<string> tags =  new List<string>();
            tags.Add("musica");
            string data = "2000-08-15";
            string estado = "Disappointed";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";

            Perfil perfil = new Perfil(nome, email, telefone, tags, data, estado, password, pais, cidade, perfilFB, perfilLI);

            List<string> tags2 = new List<string>();
            foreach(Tag tag in perfil.tags){
                tags2.Add(tag.Descricao);
            }

            string dataformatada = "15/08/2000 00:00:00";
            string paisformatado = "Portugal";
            Assert.Equal(nome, perfil.nome.Name);
            Assert.Equal(email, perfil.email.EnderecoEmail);
            Assert.Equal(telefone, perfil.telefone.NumTelefone);
            Assert.Equal(tags.ToString(), tags2.ToString());
            Assert.Equal(dataformatada, perfil.dataNascimento.DataNasc.ToString());
            Assert.Equal(estado, perfil.estadoHumor.Estado);
            Assert.Equal(password, perfil.password.password);
            Assert.Equal(paisformatado, perfil.pais.Country);
            Assert.Equal(cidade, perfil.cidade.City);
            Assert.Equal(perfilFB, perfil.perfilFacebook.PerfilFace);
            Assert.Equal(perfilLI, perfil.perfilLinkedin.Linkedin);

        }

        [Fact]
        public void TestCreatePerfilSemNome()
        {
            string nome = null;
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 351915246058;
            List<string> tags =  new List<string>();
            tags.Add("musica");
            string data = "2000-08-15";
            string estado = "Disappointed";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";

            Assert.Throws<ArgumentNullException>(() => new Perfil(nome, email, telefone, tags, data, estado, password, pais, cidade, perfilFB, perfilLI));

        }

        [Fact]
        public void TestCreatePerfilComEmailErrado()
        {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@@gmail.com";
            long telefone = 351915246058;
            List<string> tags =  new List<string>();
            tags.Add("musica");
            string data = "2000-08-15";
            string estado = "Disappointed";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";

            Assert.Throws<BusinessRuleValidationException>(() => new Perfil(nome, email, telefone, tags, data, estado, password, pais, cidade, perfilFB, perfilLI));

        }

        [Fact]
        public void TestCreatePerfilComTelefoneErrado()
        {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 12345;
            List<string> tags =  new List<string>();
            tags.Add("musica");
            string data = "2000-08-15";
            string estado = "Disappointed";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";

            Assert.Throws<BusinessRuleValidationException>(() => new Perfil(nome, email, telefone, tags, data, estado, password, pais, cidade, perfilFB, perfilLI));

        }

        [Fact]
        public void TestCreatePerfilComDataErrada()
        {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 123456789123;
            List<string> tags =  new List<string>();
            tags.Add("musica");
            string data = "2000-18-35";
            string estado = "Disappointed";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";

            Assert.Throws<ArgumentOutOfRangeException>(() => new Perfil(nome, email, telefone, tags, data, estado, password, pais, cidade, perfilFB, perfilLI));

        }

        [Fact]
        public void TestCreatePerfilComEstadoErrado()
        {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 123456789123;
            List<string> tags =  new List<string>();
            tags.Add("musica");
            string data = "2000-08-15";
            string estado = "Estado";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";

            Assert.Throws<BusinessRuleValidationException>(() => new Perfil(nome, email, telefone, tags, data, estado, password, pais, cidade, perfilFB, perfilLI));

        }

        [Fact]
        public void TestCreatePerfilComPaisErrado()
        {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 123456789123;
            List<string> tags =  new List<string>();
            tags.Add("musica");
            string data = "2000-08-15";
            string estado = "Disappointed";
            string password = "Q178oAX.qw@";
            string pais = "pais";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";

            Assert.Throws<BusinessRuleValidationException>(() => new Perfil(nome, email, telefone, tags, data, estado, password, pais, cidade, perfilFB, perfilLI));

        }

        [Fact]
        public void TestCreatePerfilComCidadeErrada()
        {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 12345678911123;
            List<string> tags =  new List<string>();
            tags.Add("musica");
            string data = "2000-10-15";
            string estado = "Disappointed";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "123421";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";

            Assert.Throws<BusinessRuleValidationException>(() => new Perfil(nome, email, telefone, tags, data, estado, password, pais, cidade, perfilFB, perfilLI));

        }

        [Fact]
        public void TestChangeNome()
        {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 123456789123;
            List<string> tags =  new List<string>();
            tags.Add("musica");
            string data = "2000-08-15";
            string estado = "Joyful";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";

            Perfil perfil = new Perfil(nome, email, telefone, tags, data, estado, password, pais, cidade, perfilFB, perfilLI);

            string novoNome = "Vasco";
            perfil.Changenome(novoNome);

            Assert.Equal(novoNome, perfil.nome.Name);

        }

        [Fact]
        public void TestChangeEmail()
        {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 123456789123;
            List<string> tags =  new List<string>();
            tags.Add("musica");
            string data = "2000-08-15";
            string estado = "Joyful";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";

            Perfil perfil = new Perfil(nome, email, telefone, tags, data, estado, password, pais, cidade, perfilFB, perfilLI);

            string novoEmail = "novoemail123@gmail.com";
            perfil.Changeemail(novoEmail);

            Assert.Equal(novoEmail, perfil.email.EnderecoEmail);

        }

        [Fact]
        public void TestChangeTelefone()
        {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 123456789123;
            List<string> tags =  new List<string>();
            tags.Add("musica");
            string data = "2000-08-15";
            string estado = "Joyful";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";

            Perfil perfil = new Perfil(nome, email, telefone, tags, data, estado, password, pais, cidade, perfilFB, perfilLI);

            long novoTelefone = 999988887777;
            perfil.Changetelefone(novoTelefone);

            Assert.Equal(novoTelefone, perfil.telefone.NumTelefone);

        }

        [Fact]
        public void TestChangeDataNascimento()
        {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 123456789123;
            List<string> tags =  new List<string>();
            tags.Add("musica");
            string data = "2000-08-15";
            string estado = "Joyful";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";

            Perfil perfil = new Perfil(nome, email, telefone, tags, data, estado, password, pais, cidade, perfilFB, perfilLI);

            string novaData = "2000-08-17";
            perfil.ChangedataNascimento(novaData);
            string dataformatada = "17/08/2000 00:00:00";
            Assert.Equal(dataformatada, perfil.dataNascimento.DataNasc.ToString());

        }

        [Fact]
        public void TestChangeEstadoHumor()
        {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 123456789123;
            List<string> tags =  new List<string>();
            tags.Add("musica");
            string data = "2000-08-15";
            string estado = "Joyful";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";

            Perfil perfil = new Perfil(nome, email, telefone, tags, data, estado, password, pais, cidade, perfilFB, perfilLI);

            string novoEstado = "Hopeful";
            perfil.ChangeestadoHumor(novoEstado);

            Assert.Equal(novoEstado, perfil.estadoHumor.Estado);

        }

        [Fact]
        public void TestChangePerfilFB()
        {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 123456789123;
            List<string> tags =  new List<string>();
            tags.Add("musica");
            string data = "2000-08-15";
            string estado = "Joyful";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";

            Perfil perfil = new Perfil(nome, email, telefone, tags, data, estado, password, pais, cidade, perfilFB, perfilLI);

            string novoPerfilFB = "perfilFB2";
            perfil.ChangePerfilFacebook(novoPerfilFB);

            Assert.Equal(novoPerfilFB, perfil.perfilFacebook.PerfilFace);

        }

        [Fact]
        public void TestChangePerfilLI()
        {
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 123456789123;
            List<string> tags =  new List<string>();
            tags.Add("musica");
            string data = "2000-08-15";
            string estado = "Joyful";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";

            Perfil perfil = new Perfil(nome, email, telefone, tags, data, estado, password, pais, cidade, perfilFB, perfilLI);

            string novoPerfilLI = "perfilLI2";
            perfil.ChangePerfilLinkedin(novoPerfilLI);

            Assert.Equal(novoPerfilLI, perfil.perfilLinkedin.Linkedin);

        }
    }
}