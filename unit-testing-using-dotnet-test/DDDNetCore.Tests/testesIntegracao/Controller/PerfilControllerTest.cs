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
        // [Fact]
        // public async Task PostPerfil()
        // {
        //     CreatingPerfilDto request = new CreatingPerfilDto("Beatriz", "beatriz@gmail.com", 351258963147, new List<string> { "tag1", "tag2" }, "2021/05/05",
        //     "Angry", "B+kasnda21", "en-PT", "Viseu1", "perfilfb1", "perfilli1");

        //     var mock = new Mock<IPerfilService>();

        //     PerfilDto perfilDto = new PerfilDto { Nome = request.nome, Email = request.email, EstadoHumor = request.estadoHumor, Pais = request.pais };

        //     mock.Setup(service => service.AddAsync(It.IsAny<CreatingPerfilDto>())).Returns(Task.FromResult(perfilDto));
        //     PerfisController controller = new PerfisController(mock.Object);

        //     var result = await controller.PostPerfil(request);

        //     mock.Verify(service => service.AddAsync(It.IsAny<CreatingPerfilDto>()), Times.AtLeastOnce());
        //     ActionResult<PerfilDto> PerfilDto = perfilDto;
        //     Assert.IsType<ActionResult<PerfilDto>>(result);

        // }

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
        public async Task GetPerfilByEmail(){
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
        public async Task GetPerfilByPais(){
            var mockRepository = new Mock<IPerfilRepository>();
            mockRepository.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<Perfil>()));

            var mockUnit = new Mock<IUnitOfWork>();

            PerfilService PerfilService = new PerfilService(mockUnit.Object, mockRepository.Object);
            PerfisController controller = new PerfisController(PerfilService);

            var result = await controller.GetPerfilByPais("en-PT");

            mockRepository.Verify(repository => repository.GetPerfilByPais("en-PT"), Times.AtLeastOnce());
            Assert.IsType<ActionResult<List<PerfilDto>>>(result);
        }

    }
}