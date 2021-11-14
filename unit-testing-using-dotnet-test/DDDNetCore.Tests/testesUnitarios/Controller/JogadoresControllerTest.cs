using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Perfis;
using DDDSample1.Controllers;
using Moq;
using System.Threading.Tasks;
using Xunit;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Tests.testesUnitarios.Controller
{
    public class JogadoresControllerTest
    {
        [Fact]
        public async Task GetAllJogadoresTest()
        {
            var mockJog = new Mock<IJogadorService>();
            var mockPer = new Mock<IPerfilService>();
            JogadoresController controller = new JogadoresController(mockJog.Object, mockPer.Object);

            var result = await controller.GetJogadores();

            mockJog.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());
        }

        [Fact]
        public async Task GetJogadorByIdTest()
        {
            Guid jogadorId = new Guid();
            var mockJog = new Mock<IJogadorService>();
            var mockPer = new Mock<IPerfilService>();
            mockJog.Setup(service => service.GetByIdAsync(It.IsAny<JogadorId>()));
            JogadoresController controller = new JogadoresController(mockJog.Object, mockPer.Object);

            var result = await controller.GetJogador(jogadorId);

            mockJog.Verify(service => service.GetByIdAsync(It.IsAny<JogadorId>()), Times.AtLeastOnce());
        }

        [Fact]
        public async Task GetPerfilJogadorTest()
        {
            Guid jogadorId = new Guid();
            var mockJog = new Mock<IJogadorService>();
            var mockPer = new Mock<IPerfilService>();
            mockPer.Setup(service => service.GetByIdAsync(It.IsAny<PerfilId>()));
            JogadoresController controller = new JogadoresController(mockJog.Object, mockPer.Object);
            var result = await controller.GetPerfilJogador(jogadorId);
            mockPer.Verify(service => service.GetByIdAsync(It.IsAny<PerfilId>()), Times.AtLeastOnce());
        }

        [Fact]
        public async Task GetJogadorByPerfilTest()
        {
            Guid perfilId = new Guid();
            var mockJog = new Mock<IJogadorService>();
            var mockPer = new Mock<IPerfilService>();
            mockJog.Setup(service => service.GetJogadorByPerfil(It.IsAny<PerfilId>()));
            JogadoresController controller = new JogadoresController(mockJog.Object, mockPer.Object);
            var result = await controller.GetJogadorByPerfil(perfilId);
            mockJog.Verify(service => service.GetJogadorByPerfil(It.IsAny<PerfilId>()), Times.AtLeastOnce());

        }

        [Fact]
        public async Task GetAmigosEmComumTest()
        {
            Guid idJog = new Guid();
            Guid idObj = new Guid();
            var mockJog = new Mock<IJogadorService>();
            var mockPer = new Mock<IPerfilService>();
            mockJog.Setup(service => service.GetAmigosEmComum(It.IsAny<JogadorId>(), It.IsAny<JogadorId>()));
            JogadoresController controller = new JogadoresController(mockJog.Object, mockPer.Object);
            var result = await controller.GetAmigosEmComum(idJog, idObj);
            mockJog.Verify(service => service.GetAmigosEmComum(It.IsAny<JogadorId>(), It.IsAny<JogadorId>()), Times.AtLeastOnce());
        }

        [Fact]
        public async Task GetAmigosTest()
        {
            Guid idJog = new Guid();
            var mockJog = new Mock<IJogadorService>();
            var mockPer = new Mock<IPerfilService>();
            mockJog.Setup(service => service.GetAmigos(It.IsAny<JogadorId>()));
            JogadoresController controller = new JogadoresController(mockJog.Object, mockPer.Object);
            var result = await controller.GetAmigos(idJog);
            mockJog.Verify(service => service.GetAmigos(It.IsAny<JogadorId>()), Times.AtLeastOnce());
        }

        [Fact]
        public async Task PutJogadorTest()
        {
            Guid id = new Guid();
            Guid perfilId = new Guid();
            int pontuacao = 0;
            List<Guid> missao = new List<Guid>();
            HashSet<Guid> relacao = new HashSet<Guid>();
            List<Guid> post = new List<Guid>();
            JogadorDto jog = new JogadorDto { Id = id, PerfilId = perfilId, Pontuacao = pontuacao, Missao = missao, Relacao = relacao, Post = post };

            var mockJog = new Mock<IJogadorService>();
            var mockPer = new Mock<IPerfilService>();

            mockJog.Setup(service => service.UpdateAsync(It.IsAny<JogadorDto>()));

            JogadoresController controller = new JogadoresController(mockJog.Object, mockPer.Object);

            var result = await controller.PutJogador(id, jog);

            mockJog.Verify(service => service.UpdateAsync(It.IsAny<JogadorDto>()), Times.AtLeastOnce());

            Assert.IsType<ActionResult<JogadorDto>>(result);
        }

        [Fact]
        public async Task PostJogadorTest()
        {
            Guid idDto = new Guid();
            CreatingJogadorDto jogador = new CreatingJogadorDto(idDto);
            var mockJog = new Mock<IJogadorService>();
            var mockPer = new Mock<IPerfilService>();
            Guid id = new Guid();
            Guid perfilId = new Guid();
            int pontuacao = 0;
            List<Guid> missao = new List<Guid>();
            HashSet<Guid> relacao = new HashSet<Guid>();
            List<Guid> post = new List<Guid>();
            JogadorDto jog = new JogadorDto { Id = id, PerfilId = perfilId, Pontuacao = pontuacao, Missao = missao, Relacao = relacao, Post = post };

            mockJog.Setup(service => service.AddAsync(It.IsAny<CreatingJogadorDto>())).Returns(Task.FromResult(jog));
            JogadoresController controller = new JogadoresController(mockJog.Object, mockPer.Object);
            var result = await controller.PostJogador(jogador);
            mockJog.Verify(service => service.AddAsync(It.IsAny<CreatingJogadorDto>()),Times.AtLeastOnce());
            ActionResult<JogadorDto> JogadorDto = jog;
            Assert.IsType<ActionResult<JogadorDto>>(result);
        }
    }
}
