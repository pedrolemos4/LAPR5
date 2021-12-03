using System.Threading.Tasks;
using DDDSample1.Controllers;
using Moq;
using Xunit;
using System;
using DDDSample1.Domain.Jogadores;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using DDDSample1.Domain.Missoes;
using DDDSample1.Domain.Perfis;

namespace DDDNetCore.Tests.testesUnitarios.Controller
{
    public class MissoesControllerTest
    {
        [Fact]
        public async Task GetMissoesTest() {
            var mock = new Mock<IMissaoService>();
            MissoesController controller = new MissoesController(mock.Object);

            var result = await controller.GetMissoes();

            mock.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());
            Assert.IsType<ActionResult<List<MissaoDto>>>(result);
        }

        [Fact]
        public async Task GetMissaoByIdTest() {
            Guid missaoId = new Guid();

            var mock = new Mock<IMissaoService>();
            mock.Setup(service => service.GetByIdAsync(It.IsAny<MissaoId>()));
            MissoesController controller = new MissoesController(mock.Object);

            var result = await controller.GetMissao(missaoId);

            mock.Verify(service => service.GetByIdAsync(It.IsAny<MissaoId>()), Times.AtLeastOnce());
            Assert.IsType<ActionResult<MissaoDto>>(result);
        }

        [Fact]
        public async Task PostMissaoTest(){
            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 351915246058;
            List<string> tag = new List<string>();
            tag.Add("musica");
            string data = "2000-08-15";
            string estado = "Disappointed";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";
            Perfil per = new Perfil(nome, email, telefone, tag, data, estado, password, pais, cidade, perfilFB, perfilLI);
            Jogador jogador = new Jogador(per.Id);

            int dificuldade = 2;
            string dataMissao = "2020-05-12";

            CreatingMissaoDto missao = new CreatingMissaoDto(dificuldade, dataMissao, jogador.Id.AsGuid());

            var mock = new Mock<IMissaoService>();

            MissaoDto dto = new MissaoDto{Dificuldade = missao.Dificuldade, Data = missao.Data, JogadorObjetivo = missao.JogadorObjetivo};
            mock.Setup(service => service.AddAsync(It.IsAny<CreatingMissaoDto>())).Returns(Task.FromResult(dto));

            MissoesController controller = new MissoesController(mock.Object);

            var result = await controller.PostMissao(missao);

            mock.Verify(service => service.AddAsync(It.IsAny<CreatingMissaoDto>()), Times.AtLeastOnce());
            ActionResult<MissaoDto> d = dto;

            Assert.IsType<ActionResult<MissaoDto>>(result);
        }

    }
}