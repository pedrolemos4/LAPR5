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
using DDDSample1.Domain.Ligacoes;

namespace DDDNetCore.Tests.testesIntegracao.Controller
{
    public class LigacoesControllerTest
    {
        [Fact]
        public async Task GetLigacoesTest() {
            
            var mockLig = new Mock<ILigacaoRepository>();
            var mockJog = new Mock<IJogadorRepository>();
            mockLig.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<Ligacao>()));
            mockJog.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<Jogador>()));

            var mockUnit = new Mock<IUnitOfWork>();

            LigacaoService service = new LigacaoService(mockUnit.Object,mockLig.Object, mockJog.Object);
            LigacoesController controller = new LigacoesController(service);

            var result = await controller.GetLigacoes();

            mockLig.Verify(repository => repository.GetAllAsync(), Times.AtLeastOnce());
            Assert.IsType<ActionResult<List<LigacaoDto>>>(result);
        }

        [Fact]
        public async Task GetLigacaoTest() {
            Guid ligacaoId = new Guid();

            var mockLig = new Mock<ILigacaoRepository>();
            var mockJog = new Mock<IJogadorRepository>();
            mockLig.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<Ligacao>()));

            var mockUnit = new Mock<IUnitOfWork>();

            LigacaoService service = new LigacaoService(mockUnit.Object,mockLig.Object, mockJog.Object);
            LigacoesController controller = new LigacoesController(service);

            var result = await controller.GetLigacao(ligacaoId);

            mockLig.Verify(service => service.GetByIdAsync(It.IsAny<LigacaoId>()), Times.AtLeastOnce());
            Assert.IsType<ActionResult<LigacaoDto>>(result);
        }

        [Fact]
        public async Task GetLigacaoPendenteTest() {
            Guid jogadorId = new Guid();

            var mockLig = new Mock<ILigacaoRepository>();
            var mockJog = new Mock<IJogadorRepository>();
            mockLig.Setup(repository => repository.GetLigacaoPendente(It.IsAny<LigacaoId>())).Returns(Task.FromResult(new List<Ligacao>()));

            var mockUnit = new Mock<IUnitOfWork>();

            LigacaoService service = new LigacaoService(mockUnit.Object,mockLig.Object, mockJog.Object);
            LigacoesController controller = new LigacoesController(service);

            var result = await controller.GetLigacaoPendente(jogadorId);

            mockLig.Verify(service => service.GetLigacaoPendente(It.IsAny<LigacaoId>()), Times.AtLeastOnce());
            Assert.IsType<ActionResult<List<LigacaoDto>>>(result);
        }
    }
}