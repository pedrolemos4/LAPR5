using System;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Controllers;
using System.Collections.Generic;
using DDDSample1.Domain.Perfis;
using System.Threading.Tasks;
using Xunit;
using Moq;
using DDDSample1.Domain.Shared;

namespace Name
{
    public class PerfilControllerTest
    {
        [Fact]
        public async Task PostPerfil()
        {
            CreatingPerfilDto request = new CreatingPerfilDto("Beatriz", "beatriz@gmail.com", 351258963147, new List<string> { "tag1", "tag2" }, "2000/05/05",
            "Angry", "B+kasnda21", "en-PT", "Viseu1", "perfilfb1", "perfilli1");

            Perfil perfil = new Perfil("Beatriz", "beatriz@gmail.com", 351258963147, new List<string> { "tag1", "tag2" }, "2000/05/05",
             "Angry", "B+kasnda21", "en-PT", "Viseu1", "perfilfb1", "perfilli1");

            PerfilDto perfilDto = new PerfilDto { Nome = request.nome, Email = request.email, EstadoHumor = request.estadoHumor, Pais = request.pais };

            var mockRep = new Mock<IPerfilRepository>();

            mockRep.Setup(service => service.AddAsync(It.IsAny<Perfil>())).Returns(Task.FromResult(perfil));

            var mockUnit = new Mock<IUnitOfWork>();

            PerfilService perfilService = new PerfilService(mockUnit.Object, mockRep.Object);
            PerfisController perfisController = new PerfisController(perfilService);

            var result = await perfisController.PostPerfil(request);

            mockRep.Verify(repository => repository.AddAsync(It.IsAny<Perfil>()), Times.AtLeastOnce());
            mockUnit.Verify(unit => unit.CommitAsync(), Times.AtLeastOnce());
            Assert.IsType<ActionResult<PerfilDto>>(result);

        }

        [Fact]
        public async Task GetPerfis()
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
        public async Task GetPerfil()
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
        public async Task GetPerfilByNome()
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
        public async Task GetPerfilByEmail()
        {
            var mockRepository = new Mock<IPerfilRepository>();
            mockRepository.Setup(repository => repository.GetPerfilByEmail(It.IsAny<string>()));

            var mockUnit = new Mock<IUnitOfWork>();

            PerfilService PerfilService = new PerfilService(mockUnit.Object, mockRepository.Object);
            PerfisController controller = new PerfisController(PerfilService);

            var result = await controller.GetPerfilByEmail("beatriz@gmail.com");

            mockRepository.Verify(repository => repository.GetPerfilByEmail(It.IsAny<string>()), Times.AtLeastOnce());
            Assert.IsType<ActionResult<PerfilDto>>(result);
        }

        [Fact]
        public async Task GetPerfilByPais()
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