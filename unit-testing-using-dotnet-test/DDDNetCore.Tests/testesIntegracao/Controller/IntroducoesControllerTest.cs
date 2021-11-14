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

        [Fact]
        public async Task GetIntroducoesPorAprovar() {
            Guid jogadorId = new Guid();

            var mockIntro = new Mock<IIntroducaoRepository>();
            var mockJog = new Mock<IJogadorRepository>();
            mockIntro.Setup(repository => repository.GetIntroducoesPorAprovar(It.IsAny<JogadorId>()));

            var mockUnit = new Mock<IUnitOfWork>();

            IntroducaoService service = new IntroducaoService(mockUnit.Object,mockIntro.Object, mockJog.Object);
            IntroducoesController controller = new IntroducoesController(service);

            var result = await controller.GetIntroducoesPorAprovar(jogadorId);

            mockIntro.Verify(service => service.GetIntroducoesPorAprovar(It.IsAny<JogadorId>()), Times.AtLeastOnce());
            Assert.IsType<ActionResult<IntroducaoDto>>(result);
        }

        /*[Fact]
        public async Task PostIntroducao(){
            Guid jogInicial = new Guid();
            Guid jogIntro = new Guid();
            Guid jogObj = new Guid();

            string estadoIntro = "Pendente";
            CreatingIntroducaoDto intro = new CreatingIntroducaoDto(jogInicial,jogIntro,jogObj, estadoIntro);

            var mockRel = new Mock<IRelacaoService>();
            var mockIntro = new Mock<IIntroducaoService>();

            IntroducaoDto dto = new IntroducaoDto{JogadorInicial = intro.JogadorInicial, JogadorIntrodutor = intro.JogadorIntrodutor, JogadorObjetivo = intro.JogadorObjetivo, EstadoIntroducao = intro.EstadoIntroducao.ToString()};
            mockIntro.Setup(service => service.AddAsync(It.IsAny<CreatingIntroducaoDto>())).Returns(Task.FromResult(dto));

            IntroducoesController controller = new IntroducoesController(mockRel.Object, mockIntro.Object);

            var result = await controller.PostIntroducao(intro);

            mockIntro.Verify(service => service.AddAsync(It.IsAny<CreatingIntroducaoDto>()), Times.AtLeastOnce());
            ActionResult<IntroducaoDto> d = dto;

            Assert.IsType<ActionResult<IntroducaoDto>>(result);


            CreatingWorkblockDto creatingWorkblockDto = new CreatingWorkblockDto("Workblock6","VehicleDutyKey", new string[] {"Workblock:1","Workblock:2"}, 34000,45000);

            WorkblockDto WorkblockDto = WorkblockMapper.toDTO(creatingWorkblockDto);
            Workblock Workblock = WorkblockMapper.toDomain(WorkblockDto);          
            var mockRepository = new Mock<IWorkblockRepository>();
            mockRepository.Setup(repository => repository.AddAsync(It.IsAny<Workblock>())).Returns(Task.FromResult(Workblock));

            var mockUnit = new Mock<IUnitOfWork>();

            WorkblockService WorkblockService = new WorkblockService(mockUnit.Object,mockRepository.Object);
            WorkblocksController controller = new WorkblocksController(WorkblockService);

            var result = await controller.Create(creatingWorkblockDto);

            mockRepository.Verify(repository => repository.AddAsync(It.IsAny<Workblock>()), Times.AtLeastOnce());
            mockUnit.Verify(unit => unit.CommitAsync(), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<WorkblockDto>));
        }


        [Fact]
        public async Task PutIntroducao(){
            Guid introducaoId = new Guid();
            Guid jogInicial = new Guid();
            Guid jogIntro = new Guid();
            Guid jogObj = new Guid();

            string estadoIntro = "Pendente";
            IntroducaoDto intro = new IntroducaoDto{Id = introducaoId, JogadorInicial = jogInicial, JogadorIntrodutor = jogIntro, JogadorObjetivo = jogObj, EstadoIntroducao = estadoIntro};

            var mockRel = new Mock<IRelacaoService>();
            var mockIntro = new Mock<IIntroducaoService>();

            mockIntro.Setup(service => service.UpdateAsync(It.IsAny<IntroducaoDto>()));

            IntroducoesController controller = new IntroducoesController(mockRel.Object, mockIntro.Object);

            var result = await controller.PutIntroducao(introducaoId, intro);

            mockIntro.Verify(service => service.UpdateAsync(It.IsAny<IntroducaoDto>()), Times.AtLeastOnce());

            Assert.IsType<ActionResult<IntroducaoDto>>(result);
        }

        [Fact]
        public async Task PatchIntroducao(){
            Guid introducaoId = new Guid();
            Guid jogInicial = new Guid();
            Guid jogIntro = new Guid();
            Guid jogObj = new Guid();

            string estadoIntro = "Pendente";
            IntroducaoDto intro = new IntroducaoDto{Id = introducaoId, JogadorInicial = jogInicial, JogadorIntrodutor = jogIntro, JogadorObjetivo = jogObj, EstadoIntroducao = estadoIntro};

            var mockRel = new Mock<IRelacaoService>();
            var mockIntro = new Mock<IIntroducaoService>();

            mockIntro.Setup(service => service.PatchEstadoIntroducao(It.IsAny<IntroducaoDto>()));

            IntroducoesController controller = new IntroducoesController(mockRel.Object, mockIntro.Object);

            var result = await controller.PatchIntroducao(introducaoId, intro);

            mockIntro.Verify(service => service.PatchEstadoIntroducao(It.IsAny<IntroducaoDto>()), Times.AtLeastOnce());

            Assert.IsType<ActionResult<IntroducaoDto>>(result);
        }*/


    }
}