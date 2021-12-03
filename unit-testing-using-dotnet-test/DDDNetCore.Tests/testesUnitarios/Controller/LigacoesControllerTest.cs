using System.Threading.Tasks;
using DDDSample1.Controllers;
using Moq;
using Xunit;
using System;
using DDDSample1.Domain.Ligacoes;
using DDDSample1.Domain.Jogadores;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Tests.testesUnitarios.Controller
{
    public class LigacoesControllerTest
    {
        [Fact]
        public async Task GetLigacoesTest() {
            var mockLig = new Mock<ILigacaoService>();
            LigacoesController controller = new LigacoesController(mockLig.Object);

            var result = await controller.GetLigacoes();

            mockLig.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());
        }

        [Fact]
        public async Task GetLigacaoTest() {
            Guid ligacaoId = new Guid();

            var mockLig = new Mock<ILigacaoService>();
            mockLig.Setup(service => service.GetByIdAsync(It.IsAny<LigacaoId>()));
            LigacoesController controller = new LigacoesController(mockLig.Object);

            var result = await controller.GetLigacao(ligacaoId);

            mockLig.Verify(service => service.GetByIdAsync(It.IsAny<LigacaoId>()), Times.AtLeastOnce());
        }

        [Fact]
        public async Task GetLigacaoPendenteTest() {
            Guid jogadorId = new Guid();

            var mockLig = new Mock<ILigacaoService>();
            mockLig.Setup(service => service.GetLigacaoPendente(It.IsAny<JogadorId>()));
            LigacoesController controller = new LigacoesController(mockLig.Object);

            var result = await controller.GetLigacaoPendente(jogadorId);

            mockLig.Verify(service => service.GetLigacaoPendente(It.IsAny<JogadorId>()), Times.AtLeastOnce());
        }

        [Fact]
        public async Task PutLigacaoTest(){
            Guid ligacaoId = new Guid();
            string textoLig = "Texto";
            string estadoLig = "Pendente";
            Guid jog1 = new Guid();
            Guid jog2 = new Guid();

            
            LigacaoDto lig = new LigacaoDto{Id = ligacaoId, TextoLigacao = textoLig, Estado = estadoLig, Jogador1 = jog1, Jogador2 = jog2};

            var mockLig = new Mock<ILigacaoService>();

            mockLig.Setup(service => service.UpdateAsync(It.IsAny<LigacaoDto>()));

            LigacoesController controller = new LigacoesController(mockLig.Object);

            var result = await controller.PutLigacao(ligacaoId, lig);

            mockLig.Verify(service => service.UpdateAsync(It.IsAny<LigacaoDto>()), Times.AtLeastOnce());

            Assert.IsType(typeof(ActionResult<LigacaoDto>), result);
        }

        [Fact]
        public async Task PatchLigacaoTest(){
            Guid ligacaoId = new Guid();
            string textoLig = "Texto";
            string estadoLig = "Pendente";
            Guid jog1 = new Guid();
            Guid jog2 = new Guid();

            
            LigacaoDto lig = new LigacaoDto{Id = ligacaoId, TextoLigacao = textoLig, Estado = estadoLig, Jogador1 = jog1, Jogador2 = jog2};

            var mockLig = new Mock<ILigacaoService>();

            mockLig.Setup(service => service.PatchEstadoLigacao(It.IsAny<LigacaoDto>()));

            LigacoesController controller = new LigacoesController(mockLig.Object);

            var result = await controller.PatchLigacao(ligacaoId, lig);

            mockLig.Verify(service => service.PatchEstadoLigacao(It.IsAny<LigacaoDto>()), Times.AtLeastOnce());

            Assert.IsType(typeof(ActionResult<LigacaoDto>), result);
        }

        [Fact]
        public async Task PostLigacaoTest()
        {
            CreatingLigacaoDto request = new CreatingLigacaoDto("Texto", "Pendente", new Guid(), new Guid());

            var mock = new Mock<ILigacaoService>();

            LigacaoDto ligacaoDto = new LigacaoDto { TextoLigacao = request.TextoLigacao, Estado = request.EstadoLigacao, Jogador1 = request.Jogador1, Jogador2 = request.Jogador2 };

            mock.Setup(service => service.AddAsync(It.IsAny<CreatingLigacaoDto>())).Returns(Task.FromResult(ligacaoDto));
            LigacoesController controller = new LigacoesController(mock.Object);

            var result = await controller.PostLigacao(request);

            mock.Verify(service => service.AddAsync(It.IsAny<CreatingLigacaoDto>()), Times.AtLeastOnce());
            ActionResult<LigacaoDto> LigacaoDto = ligacaoDto;
            Assert.IsType<ActionResult<LigacaoDto>>(result);

        }
    }
}