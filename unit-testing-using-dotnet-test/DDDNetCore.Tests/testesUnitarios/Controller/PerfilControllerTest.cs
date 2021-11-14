using System;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Controllers;
using System.Collections.Generic;
using DDDSample1.Domain.Perfis;
using System.Threading.Tasks;
using Xunit;
using Moq;
using DDDSample1.Domain.Shared;

namespace DDDNetCore.Tests.testesUnitarios.Controller
{
    public class PerfilControllerTest
    {
        [Fact]
        public async Task PostPerfil()
        {
            CreatingPerfilDto request = new CreatingPerfilDto("Beatriz", "beatriz@gmail.com", 351258963147, new List<string> { "tag1", "tag2" }, "2021/05/05",
            "Angry", "B+kasnda21", "en-PT", "Viseu1", "perfilfb1", "perfilli1");

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
        public async Task GetPerfis()
        {
            var mock = new Mock<IPerfilService>();
            PerfisController controller = new PerfisController(mock.Object);

            var result = await controller.GetPerfis();

            mock.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());
        }

        [Fact]
        public async Task GetPerfil()
        {
            Guid id = new Guid();
            var mock = new Mock<IPerfilService>();
            PerfisController controller = new PerfisController(mock.Object);

            var result = await controller.GetPerfil(id);

            mock.Verify(service => service.GetByIdAsync(It.IsAny<PerfilId>()), Times.AtLeastOnce());
        }

        [Fact]
        public async Task GetPerfilByNome()
        {
            string id = "Beatriz";
            var mock = new Mock<IPerfilService>();
            PerfisController controller = new PerfisController(mock.Object);

            var result = await controller.GetPerfilByNome(id);

            mock.Verify(service => service.getPerfilByNome(It.IsAny<string>()), Times.AtLeastOnce());
        }

        [Fact]
        public async Task GetPerfilByEmail()
        {
            string id = "beatriz@gmail.com";
            var mock = new Mock<IPerfilService>();
            PerfisController controller = new PerfisController(mock.Object);

            var result = await controller.GetPerfilByEmail(id);

            mock.Verify(service => service.GetPerfilByEmail(It.IsAny<string>()), Times.AtLeastOnce());
        }

        [Fact]
        public async Task GetPerfilByPais()
        {
            string id = "en-PT";
            var mock = new Mock<IPerfilService>();
            PerfisController controller = new PerfisController(mock.Object);

            var result = await controller.GetPerfilByPais(id);

            mock.Verify(service => service.GetPerfilByPais(id), Times.AtLeastOnce());
        }

        [Fact]
        public async Task PutPerfil()
        {
            Guid id = new Guid();

            PerfilDto perfil = new PerfilDto { Nome = "Beatriz", Email = "beatriz@gmail.com", EstadoHumor = "Angry", Pais = "en-PT" };

            var mock = new Mock<IPerfilService>();

            mock.Setup(service => service.UpdateAsync(It.IsAny<PerfilDto>()));

            PerfisController controller = new PerfisController(mock.Object);

            var result = await controller.PutPerfil(id, perfil);

            mock.Verify(service => service.UpdateAsync(It.IsAny<PerfilDto>()), Times.AtLeastOnce());

            Assert.IsType(typeof(ActionResult<PerfilDto>), result);
        }

        [Fact]
        public async Task PatchPerfil()
        {
            Guid id = new Guid();

            PerfilDto perfil = new PerfilDto { Nome = "Beatriz", Email = "beatriz@gmail.com", EstadoHumor = "Angry", Pais = "en-PT" };

            var mock = new Mock<IPerfilService>();

            mock.Setup(service => service.PatchEstadoHumor(It.IsAny<PerfilDto>()));

            PerfisController controller = new PerfisController(mock.Object);

            var result = await controller.PatchPerfil(id, perfil);

            mock.Verify(service => service.PatchEstadoHumor(It.IsAny<PerfilDto>()), Times.AtLeastOnce());

            Assert.IsType(typeof(ActionResult<PerfilDto>), result);
        }
    }

}
