using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Perfis;
using DDDSample1.Controllers;
using Moq;
using System.Threading.Tasks;
using Xunit;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Domain.Shared;

namespace DDDNetCore.Tests.testesIntegracao.Controller
{
    public class JogadoresControllerTest
    {
        [Fact]
        public async Task GetAllJogadoresTest()
        {
            var mockJog = new Mock<IJogadorRepository>();
            var mockPer = new Mock<IPerfilRepository>();
            mockJog.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<Jogador>()));

            var mockUnit = new Mock<IUnitOfWork>();

            JogadorService service = new JogadorService(mockUnit.Object, mockJog.Object, mockPer.Object);
            PerfilService perService = new PerfilService(mockUnit.Object, mockPer.Object);
            JogadoresController controller = new JogadoresController(service, perService);

            var result = await controller.GetJogadores();

            mockJog.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());
        }

        [Fact]
        public async Task GetJogadorByIdTest()
        {
            Guid jogadorId = new Guid();

            var mockJog = new Mock<IJogadorRepository>();
            var mockPer = new Mock<IPerfilRepository>();
            mockJog.Setup(repository => repository.GetByIdAsync(It.IsAny<JogadorId>()));

            var mockUnit = new Mock<IUnitOfWork>();

            JogadorService service = new JogadorService(mockUnit.Object, mockJog.Object, mockPer.Object);
            PerfilService perService = new PerfilService(mockUnit.Object, mockPer.Object);
            JogadoresController controller = new JogadoresController(service, perService);

            var result = await controller.GetJogador(jogadorId);

            mockJog.Verify(service => service.GetByIdAsync(It.IsAny<JogadorId>()), Times.AtLeastOnce());
        }

        [Fact]
        public async Task GetJogadorByPerfilTest()
        {
            Guid perfilId = new Guid();

            var mockJog = new Mock<IJogadorRepository>();
            var mockPer = new Mock<IPerfilRepository>();
            mockJog.Setup(repository => repository.GetJogadorByPerfil(It.IsAny<PerfilId>()));

            var mockUnit = new Mock<IUnitOfWork>();

            JogadorService service = new JogadorService(mockUnit.Object, mockJog.Object, mockPer.Object);
            PerfilService perService = new PerfilService(mockUnit.Object, mockPer.Object);
            JogadoresController controller = new JogadoresController(service, perService);

            var result = await controller.GetJogadorByPerfil(perfilId);

            mockJog.Verify(service => service.GetJogadorByPerfil(It.IsAny<PerfilId>()), Times.AtLeastOnce());

        }

        [Fact]
        public async Task GetPerfilJogadorTest()
        {
            Guid perfilId = new Guid();

            var mockJog = new Mock<IJogadorRepository>();
            var mockPer = new Mock<IPerfilRepository>();
            mockPer.Setup(repository => repository.GetByIdAsync(It.IsAny<PerfilId>()));

            var mockUnit = new Mock<IUnitOfWork>();

            JogadorService service = new JogadorService(mockUnit.Object, mockJog.Object, mockPer.Object);
            PerfilService perService = new PerfilService(mockUnit.Object, mockPer.Object);
            JogadoresController controller = new JogadoresController(service, perService);

            var result = await controller.GetPerfilJogador(perfilId);

            Assert.IsType<ActionResult<PerfilDto>>(result);

        }

        [Fact]
        public async Task GetJogadorByEmailPasswordTest()
        {
            Guid perfilId = new Guid();
            string email = "email@gmail.com";
            string pass = "password123";

            var mockJog = new Mock<IJogadorRepository>();
            var mockPer = new Mock<IPerfilRepository>();

            mockPer.Setup(repository => repository.GetPerfilByEmailPassword(email, pass));
            mockJog.Setup(repository => repository.GetJogadorByPerfil(It.IsAny<PerfilId>()));

            var mockUnit = new Mock<IUnitOfWork>();

            JogadorService service = new JogadorService(mockUnit.Object, mockJog.Object, mockPer.Object);
            PerfilService perService = new PerfilService(mockUnit.Object, mockPer.Object);
            JogadoresController controller = new JogadoresController(service, perService);

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
        public async Task GetPossiveisAmigosTest()
        {
            Guid idJog = new Guid();
            var mockJog = new Mock<IJogadorService>();
            var mockPer = new Mock<IPerfilService>();
            mockJog.Setup(service => service.GetPossiveisAmigos(It.IsAny<JogadorId>()));
            JogadoresController controller = new JogadoresController(mockJog.Object, mockPer.Object);
            var result = await controller.GetPossiveisAmigos(idJog);
            mockJog.Verify(service => service.GetPossiveisAmigos(It.IsAny<JogadorId>()), Times.AtLeastOnce());
        }
    }
}
