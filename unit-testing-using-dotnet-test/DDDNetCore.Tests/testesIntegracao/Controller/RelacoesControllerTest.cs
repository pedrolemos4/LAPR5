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
using DDDSample1.Domain.Relacoes;

namespace DDDNetCore.Tests.testesIntegracao.Controller
{
    public class RelacoesControllerTest
    {
        [Fact]
        public async Task GetRelacoesTest() {
            
            var mockRel = new Mock<IRelacaoRepository>();
            mockRel.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<Relacao>()));

            var mockUnit = new Mock<IUnitOfWork>();

            RelacaoService service = new RelacaoService(mockUnit.Object, mockRel.Object);
            RelacoesController controller = new RelacoesController(service);

            var result = await controller.GetRelacoes();

            mockRel.Verify(repository => repository.GetAllAsync(), Times.AtLeastOnce());
            Assert.IsType<ActionResult<List<RelacaoDto>>>(result);
        }

        [Fact]
        public async Task GetRelacaoTest() {
            Guid relacaoId = new Guid();

            var mockRel = new Mock<IRelacaoRepository>();
            mockRel.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<Relacao>()));

            var mockUnit = new Mock<IUnitOfWork>();

            RelacaoService service = new RelacaoService(mockUnit.Object, mockRel.Object);
            RelacoesController controller = new RelacoesController(service);

            var result = await controller.GetRelacao(relacaoId);

            mockRel.Verify(service => service.GetByIdAsync(It.IsAny<RelacaoId>()), Times.AtLeastOnce());
            Assert.IsType<ActionResult<RelacaoDto>>(result);
        }

        [Fact]
        public async Task GetRelacaoComDoisIdsTest() {
            Guid jog1Id = new Guid();
            Guid jog2Id = new Guid();

            var mockRel = new Mock<IRelacaoRepository>();
            mockRel.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<Relacao>()));

            var mockUnit = new Mock<IUnitOfWork>();

            RelacaoService service = new RelacaoService(mockUnit.Object, mockRel.Object);
            RelacoesController controller = new RelacoesController(service);

            var result = await controller.GetRelacaoComDoisIds(jog1Id, jog2Id);

            mockRel.Verify(service => service.GetRelacaoComDoisIds(It.IsAny<JogadorId>(),It.IsAny<JogadorId>()), Times.AtLeastOnce());
            Assert.IsType<ActionResult<RelacaoDto>>(result);
        }

        [Fact]
        public async Task GetRelacoesDoJogadorTest() {
            Guid jogadorId = new Guid();

            var mockRel = new Mock<IRelacaoRepository>();
            mockRel.Setup(repository => repository.GetRelacoesDoJogador(It.IsAny<JogadorId>())).Returns(Task.FromResult(new List<Relacao>()));

            var mockUnit = new Mock<IUnitOfWork>();

            RelacaoService service = new RelacaoService(mockUnit.Object, mockRel.Object);
            RelacoesController controller = new RelacoesController(service);

            var result = await controller.GetRelacoesDoJogador(jogadorId);

            mockRel.Verify(service => service.GetRelacoesDoJogador(It.IsAny<JogadorId>()), Times.AtLeastOnce());
            Assert.IsType<ActionResult<List<RelacaoDto>>>(result);
        }

        [Fact]
        public async Task GetRedeJogadorTest()
        {
            Guid jogadorId = new Guid();
            int nivel = 3;

            var mockRel = new Mock<IRelacaoRepository>();
            mockRel.Setup(repository => repository.GetRelacoesDoJogador(It.IsAny<JogadorId>())).Returns(Task.FromResult(new List<Relacao>()));

            var mockUnit = new Mock<IUnitOfWork>();

            RelacaoService service = new RelacaoService(mockUnit.Object, mockRel.Object);
            RelacoesController controller = new RelacoesController(service);

            var result = await controller.GetRedeJogador(jogadorId, nivel);

            mockRel.Verify(service => service.GetRelacoesDoJogador(It.IsAny<JogadorId>()), Times.AtLeastOnce());

        }
    }
}