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
    public class UC8Test
    {
        [Fact]
        public async Task UC8()
        {
            Guid perfilId = new Guid();
            string nome = "Beatriz";
            string email = "beatriz@gmail.com";
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

            PerfilDto perfilDto = new PerfilDto { Nome = nome, Email = email, EstadoHumor = mapa2, Pais = pais };
            CreatingPerfilDto perfil = new CreatingPerfilDto("", "Beatriz", "beatriz@gmail.com", 351258963147, new List<string> { "tag1", "tag2" }, "2021/05/05",
            mapa2, "B+kasnda21", "en-PT", "Viseu1", "perfilfb1", "perfilli1");

            Guid idDto = new Guid();
            List<string> missoes = new List<string>();
            List<string> relacoes = new List<string>();
            List<string> posts = new List<string>();
            CreatingJogadorDto jogador = new CreatingJogadorDto(10, idDto, relacoes);
            var mockJog = new Mock<IJogadorService>();
            var mockPer = new Mock<IPerfilService>();
            Guid id = new Guid();

            int pontuacao = 0;
            List<Guid> missao = new List<Guid>();
            HashSet<Guid> relacao = new HashSet<Guid>();
            List<Guid> post = new List<Guid>();
            JogadorDto jog = new JogadorDto { Id = id, PerfilId = perfilId, Pontuacao = pontuacao };

            mockPer.Setup(service => service.AddAsync(It.IsAny<CreatingPerfilDto>())).Returns(Task.FromResult(perfilDto));
            mockJog.Setup(service => service.AddAsync(It.IsAny<CreatingJogadorDto>())).Returns(Task.FromResult(jog));
            PerfisController controller1 = new PerfisController(mockPer.Object);
            var result = await controller1.PostPerfil(perfil);

            JogadoresController controller = new JogadoresController(mockJog.Object, mockPer.Object);
            var result2 = await controller.PostJogador(jogador);

            mockPer.Verify(service => service.AddAsync(It.IsAny<CreatingPerfilDto>()), Times.AtLeastOnce());
            mockJog.Verify(service => service.AddAsync(It.IsAny<CreatingJogadorDto>()), Times.AtLeastOnce());
            Assert.IsType<ActionResult<PerfilDto>>(result);
            Assert.IsType<ActionResult<JogadorDto>>(result2);
        }
    }
}