using System.Threading.Tasks;
using DDDSample1.Controllers;
using Moq;
using Xunit;
using System;
using DDDSample1.Domain.Relacoes;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Domain.Jogadores;
using System.Collections.Generic;

namespace DDDNetCore.Tests.testesUnitarios.Controller
{
    public class RelacoesControllerTest
    {
        [Fact]
        public async Task GetRelacoesTest() {
            var mockRel = new Mock<IRelacaoService>();
            RelacoesController controller = new RelacoesController(mockRel.Object);

            var result = await controller.GetRelacoes();

            mockRel.Verify(service => service.ToListAsync(), Times.AtLeastOnce());
        }

        [Fact]
        public async Task GetRelacaoTest() {
            Guid relacaoId = new Guid();

            var mockRel = new Mock<IRelacaoService>();
            mockRel.Setup(service => service.GetByIdAsync(It.IsAny<RelacaoId>()));
            RelacoesController controller = new RelacoesController(mockRel.Object);

            var result = await controller.GetRelacao(relacaoId);

            mockRel.Verify(service => service.GetByIdAsync(It.IsAny<RelacaoId>()), Times.AtLeastOnce());
        }

        [Fact]
        public async Task GetRelacaoComDoisIdsTest() {
            Guid jog1Id = new Guid();
            Guid jog2Id = new Guid();

            var mockRel = new Mock<IRelacaoService>();
            mockRel.Setup(service => service.GetRelacaoComDoisIds(It.IsAny<JogadorId>(), It.IsAny<JogadorId>()));
            RelacoesController controller = new RelacoesController(mockRel.Object);

            var result = await controller.GetRelacaoComDoisIds(jog1Id, jog2Id);

            mockRel.Verify(service => service.GetRelacaoComDoisIds(It.IsAny<JogadorId>(), It.IsAny<JogadorId>()), Times.AtLeastOnce());
        }

        [Fact]
        public async Task GetRelacoesJogadorTest() {
            Guid jogadorId = new Guid();

            var mockRel = new Mock<IRelacaoService>();
            mockRel.Setup(service => service.GetRelacoesDoJogador(It.IsAny<JogadorId>()));
            RelacoesController controller = new RelacoesController(mockRel.Object);

            var result = await controller.GetRelacoesDoJogador(jogadorId);

            mockRel.Verify(service => service.GetRelacoesDoJogador(It.IsAny<JogadorId>()), Times.AtLeastOnce());
        }

        [Fact]
        public async Task PutRelacaoTest(){
            Guid relacaoId = new Guid();
            Guid jog1 = new Guid();
            Guid jog2 = new Guid();
            int fr = 10;
            int fl = 5;
            List<string> tags = new List<string>();
            tags.Add("musica");
            
            RelacaoDto rel = new RelacaoDto{Id = relacaoId, Jogador1 = jog1, Jogador2 = jog2, ForcaRelacao = fr, ForcaLigacao = fl, Tags = tags};

            var mockRel = new Mock<IRelacaoService>();

            mockRel.Setup(service => service.UpdateAsync(It.IsAny<RelacaoDto>()));

            RelacoesController controller = new RelacoesController(mockRel.Object);

            var result = await controller.PutRelacao(relacaoId, rel);

            mockRel.Verify(service => service.UpdateAsync(It.IsAny<RelacaoDto>()), Times.AtLeastOnce());

            Assert.IsType(typeof(ActionResult<RelacaoDto>), result);
        }

        [Fact]
        public async Task PatchRelacaoTest(){
            Guid relacaoId = new Guid();
            Guid jog1 = new Guid();
            Guid jog2 = new Guid();
            int fr = 10;
            int fl = 5;
            List<string> tags = new List<string>();
            tags.Add("musica");
            
            RelacaoDto rel = new RelacaoDto{Id = relacaoId, Jogador1 = jog1, Jogador2 = jog2, ForcaRelacao = fr, ForcaLigacao = fl, Tags = tags};

            var mockRel = new Mock<IRelacaoService>();

            mockRel.Setup(service => service.PatchRelacaoTagsForca(It.IsAny<RelacaoDto>()));

            RelacoesController controller = new RelacoesController(mockRel.Object);

            var result = await controller.PatchRelacao(relacaoId, rel);

            mockRel.Verify(service => service.PatchRelacaoTagsForca(It.IsAny<RelacaoDto>()), Times.AtLeastOnce());

            Assert.IsType(typeof(ActionResult<RelacaoDto>), result);
        }

        [Fact]
        public async Task PostRelacaoTest()
        {
            CreatingRelacaoDto request = new CreatingRelacaoDto(new Guid(), new Guid(), new List<string>(), 10, 5);

            var mock = new Mock<IRelacaoService>();

            RelacaoDto relacaoDto = new RelacaoDto { Jogador1 = request.Jogador1, Jogador2 = request.Jogador2, Tags = request.Tags, ForcaRelacao = request.ForcaRelacao, ForcaLigacao = request.ForcaLigacao };

            mock.Setup(service => service.AddAsync(It.IsAny<CreatingRelacaoDto>())).Returns(Task.FromResult(relacaoDto));
            RelacoesController controller = new RelacoesController(mock.Object);

            var result = await controller.PostRelacao(request);

            mock.Verify(service => service.AddAsync(It.IsAny<CreatingRelacaoDto>()), Times.AtLeastOnce());
            ActionResult<RelacaoDto> RelacaoDto = relacaoDto;
            Assert.IsType<ActionResult<RelacaoDto>>(result);

        }

        [Fact]
        public async Task GetRedeJogadorTest()
        {
            Guid jogadorId = new Guid();
            int nivel = 3;

            var mockRel = new Mock<IRelacaoService>();
            mockRel.Setup(service => service.GetRedeJogador(It.IsAny<JogadorId>(), nivel));
            RelacoesController controller = new RelacoesController(mockRel.Object);

            var result = await controller.GetRedeJogador(jogadorId, nivel);

            mockRel.Verify(service => service.GetRedeJogador(It.IsAny<JogadorId>(), nivel), Times.AtLeastOnce());

        }
    }
}