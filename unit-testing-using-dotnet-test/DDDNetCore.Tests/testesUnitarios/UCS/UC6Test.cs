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

            Dictionary<string, decimal> mapa2 = new Dictionary<string, decimal>();
            mapa2.Add("Joyful", 0.5m);
            mapa2.Add("Distressed", 0.7m);
            mapa2.Add("Hopeful", 0.5m);
            mapa2.Add("Fearful", 0.5m);
            mapa2.Add("Relieved", 0.5m);
            mapa2.Add("Disappointed", 0.5m);
            mapa2.Add("Proud", 0.5m);
            mapa2.Add("Remorseful", 0.5m);
            mapa2.Add("Grateful", 0.5m);
            mapa2.Add("Angry", 0.8m);
            
            string pais = "en-PT";

            PerfilDto perfil = new PerfilDto { Nome = nome, Email = email, EstadoHumor = mapa1, Pais = pais };
            perfil = new PerfilDto { Nome = nome, Email = email, EstadoHumor = mapa2, Pais = pais };

            var mock = new Mock<IPerfilService>();
            mock.Setup(service => service.PatchEstadoHumor(It.IsAny<PerfilDto>()));

            PerfisController controller = new PerfisController(mock.Object);

            var result = await controller.PatchPerfil(id, perfil);

            mock.Verify(service => service.PatchEstadoHumor(It.IsAny<PerfilDto>()), Times.AtLeastOnce());
            Assert.IsType(typeof(ActionResult<PerfilDto>), result);
        }
    }
}