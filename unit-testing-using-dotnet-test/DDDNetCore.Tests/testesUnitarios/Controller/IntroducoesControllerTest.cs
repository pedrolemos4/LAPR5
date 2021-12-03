using System.Threading.Tasks;
using DDDSample1.Domain.Introducoes;
using DDDSample1.Controllers;
using Moq;
using Xunit;
using DDDSample1.Domain.Relacoes;
using System;
using DDDSample1.Domain.Jogadores;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace DDDNetCore.Tests.testesUnitarios.Controller
{
    public class IntroducoesControllerTest
    {
        [Fact]
        public async Task GetIntroducoesTest() {
            var mockIntro = new Mock<IIntroducaoService>();
            IntroducoesController controller = new IntroducoesController(mockIntro.Object);

            var result = await controller.GetIntroducoes();

            mockIntro.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());
            Assert.IsType<ActionResult<List<IntroducaoDto>>>(result);
        }

        [Fact]
        public async Task GetIntroducaoByIdTest() {
            Guid introducaoId = new Guid();

            var mockIntro = new Mock<IIntroducaoService>();
            mockIntro.Setup(service => service.GetByIdAsync(It.IsAny<IntroducaoId>()));
            IntroducoesController controller = new IntroducoesController(mockIntro.Object);

            var result = await controller.GetIntroducao(introducaoId);

            mockIntro.Verify(service => service.GetByIdAsync(It.IsAny<IntroducaoId>()), Times.AtLeastOnce());
            Assert.IsType<ActionResult<IntroducaoDto>>(result);
        }

        [Fact]
        public async Task GetIntroducoesPorAprovarTest() {
            Guid jogadorId = new Guid();

            var mockIntro = new Mock<IIntroducaoService>();
            mockIntro.Setup(service => service.GetIntroducoesPorAprovar(It.IsAny<JogadorId>()));
            IntroducoesController controller = new IntroducoesController(mockIntro.Object);

            var result = await controller.GetIntroducoesPorAprovar(jogadorId);

            mockIntro.Verify(service => service.GetIntroducoesPorAprovar(It.IsAny<JogadorId>()), Times.AtLeastOnce());
            Assert.IsType<ActionResult<List<IntroducaoDto>>>(result);
        }

        [Fact]
        public async Task GetIntroducoesAprovarRejeitarTest() {
            Guid jogadorId = new Guid();

            var mockIntro = new Mock<IIntroducaoService>();
            mockIntro.Setup(service => service.GetIntroducoesAprovarRejeitar(It.IsAny<JogadorId>()));
            IntroducoesController controller = new IntroducoesController(mockIntro.Object);

            var result = await controller.GetIntroducoesAprovarRejeitar(jogadorId);

            mockIntro.Verify(service => service.GetIntroducoesAprovarRejeitar(It.IsAny<JogadorId>()), Times.AtLeastOnce());
            Assert.IsType<ActionResult<List<IntroducaoDto>>>(result);
        }

        [Fact]
        public async Task PostIntroducaoTest(){
            Guid jogInicial = new Guid();
            Guid jogIntro = new Guid();
            Guid jogObj = new Guid();

            string estadoIntro = "Pendente";
            CreatingIntroducaoDto intro = new CreatingIntroducaoDto(jogInicial,jogIntro,jogObj, estadoIntro, "Texto");

            var mockIntro = new Mock<IIntroducaoService>();

            IntroducaoDto dto = new IntroducaoDto{JogadorInicial = intro.JogadorInicial, JogadorIntrodutor = intro.JogadorIntrodutor, JogadorObjetivo = intro.JogadorObjetivo, EstadoIntroducao = intro.EstadoIntroducao.ToString()};
            mockIntro.Setup(service => service.AddAsync(It.IsAny<CreatingIntroducaoDto>())).Returns(Task.FromResult(dto));

            IntroducoesController controller = new IntroducoesController(mockIntro.Object);

            var result = await controller.PostIntroducao(intro);

            mockIntro.Verify(service => service.AddAsync(It.IsAny<CreatingIntroducaoDto>()), Times.AtLeastOnce());
            ActionResult<IntroducaoDto> d = dto;

            Assert.IsType<ActionResult<IntroducaoDto>>(result);
        }


        [Fact]
        public async Task PutIntroducaoTest(){
            Guid introducaoId = new Guid();
            Guid jogInicial = new Guid();
            Guid jogIntro = new Guid();
            Guid jogObj = new Guid();

            string estadoIntro = "Pendente";
            IntroducaoDto intro = new IntroducaoDto{Id = introducaoId, JogadorInicial = jogInicial, JogadorIntrodutor = jogIntro, JogadorObjetivo = jogObj, EstadoIntroducao = estadoIntro};

            var mockIntro = new Mock<IIntroducaoService>();

            mockIntro.Setup(service => service.UpdateAsync(It.IsAny<IntroducaoDto>()));

            IntroducoesController controller = new IntroducoesController(mockIntro.Object);

            var result = await controller.PutIntroducao(introducaoId, intro);

            mockIntro.Verify(service => service.UpdateAsync(It.IsAny<IntroducaoDto>()), Times.AtLeastOnce());

            Assert.IsType<ActionResult<IntroducaoDto>>(result);
        }

        [Fact]
        public async Task PatchIntroducaoTest(){
            Guid introducaoId = new Guid();
            Guid jogInicial = new Guid();
            Guid jogIntro = new Guid();
            Guid jogObj = new Guid();

            string estadoIntro = "Pendente";
            IntroducaoDto intro = new IntroducaoDto{Id = introducaoId, JogadorInicial = jogInicial, JogadorIntrodutor = jogIntro, JogadorObjetivo = jogObj, EstadoIntroducao = estadoIntro};

            var mockIntro = new Mock<IIntroducaoService>();

            mockIntro.Setup(service => service.PatchEstadoIntroducao(It.IsAny<IntroducaoDto>()));

            IntroducoesController controller = new IntroducoesController(mockIntro.Object);

            var result = await controller.PatchIntroducao(introducaoId, intro);

            mockIntro.Verify(service => service.PatchEstadoIntroducao(It.IsAny<IntroducaoDto>()), Times.AtLeastOnce());

            Assert.IsType<ActionResult<IntroducaoDto>>(result);
        }


    }
}