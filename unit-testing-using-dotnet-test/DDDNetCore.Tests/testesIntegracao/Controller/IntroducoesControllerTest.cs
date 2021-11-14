using System.Threading.Tasks;
using DDDSample1.Domain.Introducoes;
using DDDSample1.Controllers;
using Moq;
using Xunit;
using System;
using DDDSample1.Domain.Jogadores;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Perfis;

namespace DDDNetCore.Tests.testesIntegracao.Controller
{
    public class IntroducoesControllerTest
    {
        [Fact]
        public async Task GetIntroducoes() {
            
            var mockIntro = new Mock<IIntroducaoRepository>();
            var mockJog = new Mock<IJogadorRepository>();
            mockIntro.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<Introducao>()));
            mockJog.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<Jogador>()));

            var mockUnit = new Mock<IUnitOfWork>();

            IntroducaoService service = new IntroducaoService(mockUnit.Object,mockIntro.Object, mockJog.Object);
            IntroducoesController controller = new IntroducoesController(service);

            var result = await controller.GetIntroducoes();

            mockIntro.Verify(repository => repository.GetAllAsync(), Times.AtLeastOnce());
            Assert.IsType<ActionResult<List<IntroducaoDto>>>(result);
        }

        [Fact]
        public async Task GetIntroducaoById() {
            Guid introducaoId = new Guid();

            var mockIntro = new Mock<IIntroducaoRepository>();
            var mockJog = new Mock<IJogadorRepository>();
            mockIntro.Setup(repository => repository.GetByIdAsync(It.IsAny<IntroducaoId>()));

            var mockUnit = new Mock<IUnitOfWork>();

            IntroducaoService service = new IntroducaoService(mockUnit.Object,mockIntro.Object, mockJog.Object);
            IntroducoesController controller = new IntroducoesController(service);

            var result = await controller.GetIntroducao(introducaoId);

            mockIntro.Verify(service => service.GetByIdAsync(It.IsAny<IntroducaoId>()), Times.AtLeastOnce());
            Assert.IsType<ActionResult<IntroducaoDto>>(result);
        }

        /*[Fact]
        public async Task GetIntroducoesPorAprovar() {
            Guid jogadorId = new Guid();

            var mockIntro = new Mock<IIntroducaoRepository>();
            var mockJog = new Mock<IJogadorRepository>();
            mockIntro.Setup(repository => repository.GetIntroducoesPorAprovar(It.IsAny<JogadorId>()));

            var mockUnit = new Mock<IUnitOfWork>();

            IntroducaoService service = new IntroducaoService(mockUnit.Object,mockIntro.Object, mockJog.Object);
            IntroducoesController controller = new IntroducoesController(service);

            var result = await controller.GetIntroducoesPorAprovar(jogadorId);

            mockIntro.Verify(repository => repository.GetIntroducoesPorAprovar(It.IsAny<JogadorId>()), Times.AtLeastOnce());
            Assert.IsType<ActionResult<IntroducaoDto>>(result);
        }

        [Fact]
        public async Task PostIntroducao(){

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
            Introducao i = new Introducao(jogInicial,jogIntrodutor,jogObj, estadoIntro);

            CreatingIntroducaoDto intro = new CreatingIntroducaoDto(jogInicial.Id.AsGuid(),jogIntrodutor.Id.AsGuid(),jogObj.Id.AsGuid(), estadoIntro);

            var mockIntro = new Mock<IIntroducaoRepository>();
            var mockJog = new Mock<IJogadorRepository>();

            IntroducaoDto dto = new IntroducaoDto{JogadorInicial = intro.JogadorInicial, JogadorIntrodutor = intro.JogadorIntrodutor, JogadorObjetivo = intro.JogadorObjetivo, EstadoIntroducao = intro.EstadoIntroducao.ToString()};
            mockIntro.Setup(repository => repository.AddAsync(It.IsAny<Introducao>())).Returns(Task.FromResult(i));
            var mockUnit = new Mock<IUnitOfWork>();

            IntroducaoService service = new IntroducaoService(mockUnit.Object,mockIntro.Object, mockJog.Object);
            IntroducoesController controller = new IntroducoesController(service);

            var result = await controller.PostIntroducao(intro);

            mockIntro.Verify(repository => repository.AddAsync(It.IsAny<Introducao>()), Times.AtLeastOnce());
            mockUnit.Verify(unit => unit.CommitAsync(), Times.AtLeastOnce());

            Assert.IsType<ActionResult<IntroducaoDto>>(result);
        }*/


    }
}