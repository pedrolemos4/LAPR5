using System;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Controllers;
using System.Collections.Generic;
using DDDSample1.Domain.Perfis;
using System.Threading.Tasks;
using Xunit;
using Moq;
using DDDSample1.Domain.Shared;

namespace DDDNetCore.Tests.testesIntegracao.Controller
{
    public class PerfilControllerTest
    {
        [Fact]
        public async Task PostPerfilTest()
        {
            Dictionary<string, decimal> mapa1 = new Dictionary<string, decimal>();
            mapa1.Add("Joyful", 0.5m);
            mapa1.Add("Distressed", 0.5m);
            mapa1.Add("Hopeful", 0.5m);
            mapa1.Add("Fearful", 0.5m);
            mapa1.Add("Relieved", 0.5m);
            mapa1.Add("Disappointed", 0.5m);
            mapa1.Add("Proud", 0.5m);
            mapa1.Add("Remorseful", 0.5m);
            mapa1.Add("Grateful", 0.5m);
            mapa1.Add("Angry", 0.8m);
            CreatingPerfilDto request = new CreatingPerfilDto("", "Beatriz", "beatriz@gmail.com", 351258963147, new List<string> { "tag1", "tag2" }, "2021/05/05",
            mapa1, "B+kasnda21", "en-PT", "Viseu1", "perfilfb1", "perfilli1");

            var mock = new Mock<IPerfilService>();

            PerfilDto perfilDto = new PerfilDto { Nome = request.nome, Email = request.email, EstadoHumor = request.estadoHumor, Pais = request.pais };

            mock.Setup(service => service.AddAsync(It.IsAny<CreatingPerfilDto>())).Returns(Task.FromResult(perfilDto));
            PerfisController controller = new PerfisController(mock.Object);

            var result = await controller.PostPerfil(request);

            mock.Verify(service => service.AddAsync(It.IsAny<CreatingPerfilDto>()), Times.AtLeastOnce());
            ActionResult<PerfilDto> PerfilDto = perfilDto;
            Assert.IsType<ActionResult<PerfilDto>>(result);
        }

        [Fact]
        public async Task GetPerfisTest()
        {
            var mockRepository = new Mock<IPerfilRepository>();
            mockRepository.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<Perfil>()));

            var mockUnit = new Mock<IUnitOfWork>();

            PerfilService PerfilService = new PerfilService(mockUnit.Object, mockRepository.Object);
            PerfisController controller = new PerfisController(PerfilService);

            var result = await controller.GetPerfis();

            mockRepository.Verify(repository => repository.GetAllAsync(), Times.AtLeastOnce());
            Assert.IsType<ActionResult<List<PerfilDto>>>(result);
        }

        [Fact]
        public async Task GetPerfilTest()
        {
            Guid id = new Guid();

            var mockRepository = new Mock<IPerfilRepository>();
            mockRepository.Setup(repository => repository.GetByIdAsync(It.IsAny<PerfilId>()));

            var mockUnit = new Mock<IUnitOfWork>();

            PerfilService PerfilService = new PerfilService(mockUnit.Object, mockRepository.Object);
            PerfisController controller = new PerfisController(PerfilService);

            var result = await controller.GetPerfil(id);

            mockRepository.Verify(repository => repository.GetByIdAsync(It.IsAny<PerfilId>()), Times.AtLeastOnce());
            Assert.IsType<ActionResult<PerfilDto>>(result);
        }

        [Fact]
        public async Task GetPerfilByNomeTest()
        {
            var mockRepository = new Mock<IPerfilRepository>();
            mockRepository.Setup(repository => repository.getPerfilByNome(It.IsAny<string>()));

            var mockUnit = new Mock<IUnitOfWork>();

            PerfilService PerfilService = new PerfilService(mockUnit.Object, mockRepository.Object);
            PerfisController controller = new PerfisController(PerfilService);

            var result = await controller.GetPerfilByNome("Beatriz");

            mockRepository.Verify(repository => repository.getPerfilByNome(It.IsAny<string>()), Times.AtLeastOnce());
            Assert.IsType<ActionResult<PerfilDto>>(result);
        }

        [Fact]
        public async Task GetPerfilByEmailTest()
        {
            string id = "beatriz@gmail.com";
            var mock = new Mock<IPerfilService>();
            PerfisController controller = new PerfisController(mock.Object);

            var result = await controller.GetPerfilByEmail(id);

            mock.Verify(service => service.GetPerfilByEmail(It.IsAny<string>()), Times.AtLeastOnce());
        }

        [Fact]
        public async Task GetPerfilByPaisTest()
        {
            var mockRepository = new Mock<IPerfilRepository>();
            mockRepository.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<Perfil>()));

            var mockUnit = new Mock<IUnitOfWork>();

            PerfilService PerfilService = new PerfilService(mockUnit.Object, mockRepository.Object);
            PerfisController controller = new PerfisController(PerfilService);

            var result = await controller.GetPerfilByPais("en-PT");

            mockRepository.Verify(repository => repository.GetPerfilByPais("en-PT"), Times.AtLeastOnce());
            Assert.IsType<ActionResult<List<PerfilDto>>>(result);
        }

        // [Fact]
        // public async Task PutPerfil()
        // {
        //     Guid id = new Guid();

        //     PerfilDto perfil = new PerfilDto { Nome = "Beatriz", Email = "beatriz@gmail.com", EstadoHumor = "Angry", Pais = "en-PT" };

        //     var mock = new Mock<IPerfilService>();

        //     mock.Setup(service => service.UpdateAsync(It.IsAny<PerfilDto>()));

        //     PerfisController controller = new PerfisController(mock.Object);

        //     var result = await controller.PutPerfil(id, perfil);

        //     mock.Verify(service => service.UpdateAsync(It.IsAny<PerfilDto>()), Times.AtLeastOnce());

        //     Assert.IsType(typeof(ActionResult<PerfilDto>), result);
        // }

        // [Fact]
        // public async Task PatchPerfil()
        // {
        //     Guid id = new Guid();

        //     PerfilDto perfil = new PerfilDto { Nome = "Beatriz", Email = "beatriz@gmail.com", EstadoHumor = "Angry", Pais = "en-PT" };

        //     var mock = new Mock<IPerfilService>();

        //     mock.Setup(service => service.PatchEstadoHumor(It.IsAny<PerfilDto>()));

        //     PerfisController controller = new PerfisController(mock.Object);

        //     var result = await controller.PatchPerfil(id, perfil);

        //     mock.Verify(service => service.PatchEstadoHumor(It.IsAny<PerfilDto>()), Times.AtLeastOnce());

        //     Assert.IsType(typeof(ActionResult<PerfilDto>), result);
        // }

    }
}