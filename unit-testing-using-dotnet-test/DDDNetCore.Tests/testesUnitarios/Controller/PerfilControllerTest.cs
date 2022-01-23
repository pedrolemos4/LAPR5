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
            var mock = new Mock<IPerfilService>();
            PerfisController controller = new PerfisController(mock.Object);

            var result = await controller.GetPerfis();

            mock.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());
        }

        [Fact]
        public async Task GetPerfilTest()
        {
            Guid id = new Guid();
            var mock = new Mock<IPerfilService>();
            PerfisController controller = new PerfisController(mock.Object);

            var result = await controller.GetPerfil(id);

            mock.Verify(service => service.GetByIdAsync(It.IsAny<PerfilId>()), Times.AtLeastOnce());
        }

        [Fact]
        public async Task GetPerfilByNomeTest()
        {
            string id = "Beatriz";
            var mock = new Mock<IPerfilService>();
            PerfisController controller = new PerfisController(mock.Object);

            var result = await controller.GetPerfilByNome(id);

            mock.Verify(service => service.getPerfilByNome(It.IsAny<string>()), Times.AtLeastOnce());
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
            string id = "en-PT";
            var mock = new Mock<IPerfilService>();
            PerfisController controller = new PerfisController(mock.Object);

            var result = await controller.GetPerfilByPais(id);

            mock.Verify(service => service.GetPerfilByPais(id), Times.AtLeastOnce());
        }

        [Fact]
        public async Task PutPerfilTest()
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

            Guid id = new Guid();

            PerfilDto perfil = new PerfilDto { Nome = "Beatriz", Email = "beatriz@gmail.com", EstadoHumor = mapa1, Pais = "en-PT" };

            var mock = new Mock<IPerfilService>();

            mock.Setup(service => service.UpdateAsync(It.IsAny<PerfilDto>()));

            PerfisController controller = new PerfisController(mock.Object);

            var result = await controller.PutPerfil(id, perfil);

            mock.Verify(service => service.UpdateAsync(It.IsAny<PerfilDto>()), Times.AtLeastOnce());

            Assert.IsType(typeof(ActionResult<PerfilDto>), result);
        }

        [Fact]
        public async Task PatchPerfilTest()
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

            Guid id = new Guid();

            PerfilDto perfil = new PerfilDto { Nome = "Beatriz", Email = "beatriz@gmail.com", EstadoHumor = mapa1, Pais = "en-PT" };

            var mock = new Mock<IPerfilService>();

            mock.Setup(service => service.PatchEstadoHumor(It.IsAny<PerfilDto>()));

            PerfisController controller = new PerfisController(mock.Object);

            var result = await controller.PatchPerfil(id, perfil);

            mock.Verify(service => service.PatchEstadoHumor(It.IsAny<PerfilDto>()), Times.AtLeastOnce());

            Assert.IsType(typeof(ActionResult<PerfilDto>), result);
        }
    }

}
