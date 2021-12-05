using System.Threading.Tasks;
using DDDSample1.Domain.Introducoes;
using DDDSample1.Controllers;
using Moq;
using Xunit;
using DDDSample1.Domain.Relacoes;
using System;
using DDDSample1.Domain.Jogadores;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using DDDSample1.Domain.Perfis;

namespace DDDNetCore.Tests.testesUnitarios.UCS
{
    public class UC6Test
    {
        [Fact]
        public async Task UC6() {
            Guid id = new Guid();
            string nome = "Beatriz";
            string email = "beatriz@gmail.com";
            string estado = "Angry";
            string novoEstado = "Joyful";
            string pais = "en-PT";

            PerfilDto perfil = new PerfilDto { Nome = nome, Email = email, EstadoHumor = estado, Pais = pais };
            perfil = new PerfilDto { Nome = nome, Email = email, EstadoHumor = novoEstado, Pais = pais };

            var mock = new Mock<IPerfilService>();
            mock.Setup(service => service.PatchEstadoHumor(It.IsAny<PerfilDto>()));

            PerfisController controller = new PerfisController(mock.Object);

            var result = await controller.PatchPerfil(id, perfil);

            mock.Verify(service => service.PatchEstadoHumor(It.IsAny<PerfilDto>()), Times.AtLeastOnce());
            Assert.IsType(typeof(ActionResult<PerfilDto>), result);
        }
    }
}