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
using DDDSample1.Domain.Missoes;
using DDDSample1.Domain.Relacoes;

namespace DDDNetCore.Tests.testesIntegracao.Controller
{
    public class JogadoresControllerTest
    {
        [Fact]
        public async Task GetAllJogadoresTest()
        {
            var mockJog = new Mock<IJogadorRepository>();
            var mockPer = new Mock<IPerfilRepository>();
            var mockMiss = new Mock<IMissaoRepository>();
            var mockRel = new Mock<IRelacaoRepository>();
            mockJog.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<Jogador>()));

            var mockUnit = new Mock<IUnitOfWork>();

            JogadorService service = new JogadorService(mockUnit.Object, mockJog.Object, mockPer.Object, mockMiss.Object, mockRel.Object, null);
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
            var mockMiss = new Mock<IMissaoRepository>();
            var mockRel = new Mock<IRelacaoRepository>();
            mockJog.Setup(repository => repository.GetByIdAsync(It.IsAny<JogadorId>()));

            var mockUnit = new Mock<IUnitOfWork>();

            JogadorService service = new JogadorService(mockUnit.Object, mockJog.Object, mockPer.Object, mockMiss.Object, mockRel.Object, null);
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
            var mockMiss = new Mock<IMissaoRepository>();
            var mockRel = new Mock<IRelacaoRepository>();
            mockJog.Setup(repository => repository.GetJogadorByPerfil(It.IsAny<PerfilId>()));

            var mockUnit = new Mock<IUnitOfWork>();

            JogadorService service = new JogadorService(mockUnit.Object, mockJog.Object, mockPer.Object, mockMiss.Object, mockRel.Object, null);
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
            var mockMiss = new Mock<IMissaoRepository>();
            var mockRel = new Mock<IRelacaoRepository>();
            mockPer.Setup(repository => repository.GetByIdAsync(It.IsAny<PerfilId>()));

            var mockUnit = new Mock<IUnitOfWork>();

            JogadorService service = new JogadorService(mockUnit.Object, mockJog.Object, mockPer.Object, mockMiss.Object, mockRel.Object, null);
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
            var mockMiss = new Mock<IMissaoRepository>();
            var mockRel = new Mock<IRelacaoRepository>();

            mockPer.Setup(repository => repository.GetPerfilByEmailPassword(email, pass));
            mockJog.Setup(repository => repository.GetJogadorByPerfil(It.IsAny<PerfilId>()));

            var mockUnit = new Mock<IUnitOfWork>();

            JogadorService service = new JogadorService(mockUnit.Object, mockJog.Object, mockPer.Object, mockMiss.Object, mockRel.Object, null);
            PerfilService perService = new PerfilService(mockUnit.Object, mockPer.Object);
            JogadoresController controller = new JogadoresController(service, perService);

            var result = await controller.GetJogadorByPerfil(perfilId);

            mockJog.Verify(service => service.GetJogadorByPerfil(It.IsAny<PerfilId>()), Times.AtLeastOnce());

        }

        [Fact]
        public async Task GetAmigosEmComumTest()
        {
            Guid jogadorId = new Guid();
            Guid objetoId = new Guid();

            var mockJog = new Mock<IJogadorRepository>();
            var mockPer = new Mock<IPerfilRepository>();
            var mockMiss = new Mock<IMissaoRepository>();
            var mockRel = new Mock<IRelacaoRepository>();
            mockJog.Setup(repository => repository.GetAmigosEmComum(It.IsAny<JogadorId>(), It.IsAny<JogadorId>()));

            var mockUnit = new Mock<IUnitOfWork>();

            JogadorService service = new JogadorService(mockUnit.Object, mockJog.Object, mockPer.Object, mockMiss.Object, mockRel.Object, null);
            PerfilService perService = new PerfilService(mockUnit.Object, mockPer.Object);
            JogadoresController controller = new JogadoresController(service, perService);

            var result = controller.GetAmigosEmComum(jogadorId, objetoId);

            mockJog.Verify(service => service.GetAmigosEmComum(It.IsAny<JogadorId>(), It.IsAny<JogadorId>()), Times.AtLeastOnce());
        }

        [Fact]
        public async Task GetAmigosTest()
        {
            Guid jogadorId = new Guid();

            var mockJog = new Mock<IJogadorRepository>();
            var mockPer = new Mock<IPerfilRepository>();
            var mockMiss = new Mock<IMissaoRepository>();
            var mockRel = new Mock<IRelacaoRepository>();
            mockJog.Setup(repository => repository.GetAmigos(It.IsAny<JogadorId>()));

            var mockUnit = new Mock<IUnitOfWork>();

            JogadorService service = new JogadorService(mockUnit.Object, mockJog.Object, mockPer.Object, mockMiss.Object, mockRel.Object, null);
            PerfilService perService = new PerfilService(mockUnit.Object, mockPer.Object);
            JogadoresController controller = new JogadoresController(service, perService);

            var result = controller.GetAmigos(jogadorId);

            mockJog.Verify(service => service.GetAmigos(It.IsAny<JogadorId>()), Times.AtLeastOnce());
        }

        [Fact]
        public async Task GetPossiveisAmigosTest()
        {
            Guid jogadorId = new Guid();

            var mockJog = new Mock<IJogadorRepository>();
            var mockPer = new Mock<IPerfilRepository>();
            var mockMiss = new Mock<IMissaoRepository>();
            var mockRel = new Mock<IRelacaoRepository>();
            mockJog.Setup(repository => repository.GetPossiveisAmigos(It.IsAny<JogadorId>()));

            var mockUnit = new Mock<IUnitOfWork>();

            JogadorService service = new JogadorService(mockUnit.Object, mockJog.Object, mockPer.Object, mockMiss.Object, mockRel.Object, null);
            PerfilService perService = new PerfilService(mockUnit.Object, mockPer.Object);
            JogadoresController controller = new JogadoresController(service, perService);

            var result = controller.GetPossiveisAmigos(jogadorId);

            mockJog.Verify(service => service.GetPossiveisAmigos(It.IsAny<JogadorId>()), Times.AtLeastOnce());
        }
    }
}
