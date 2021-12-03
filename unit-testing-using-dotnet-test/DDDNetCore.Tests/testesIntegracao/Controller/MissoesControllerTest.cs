using System.Threading.Tasks;
using DDDSample1.Domain.Introducoes;
using DDDSample1.Controllers;
using Moq;
using Xunit;
using System;
using DDDSample1.Domain.Jogadores;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Missoes;

namespace DDDNetCore.Tests.testesIntegracao.Controller
{
    public class MissoesControllerTest
    {
        [Fact]
        public async Task GetMissoesTest() {
            
            var mockIntro = new Mock<IMissaoRepository>();
            var mockJog = new Mock<IJogadorRepository>();
            mockIntro.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<Missao>()));
            mockJog.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<Jogador>()));

            var mockUnit = new Mock<IUnitOfWork>();

            MissaoService service = new MissaoService(mockUnit.Object,mockIntro.Object, mockJog.Object);
            MissoesController controller = new MissoesController(service);

            var result = await controller.GetMissoes();

            mockIntro.Verify(repository => repository.GetAllAsync(), Times.AtLeastOnce());
            Assert.IsType<ActionResult<List<MissaoDto>>>(result);
        }

        [Fact]
        public async Task GetMissaoByIdTest() {
            Guid missaoId = new Guid();

            var mockIntro = new Mock<IMissaoRepository>();
            var mockJog = new Mock<IJogadorRepository>();
            mockIntro.Setup(repository => repository.GetByIdAsync(It.IsAny<MissaoId>()));

            var mockUnit = new Mock<IUnitOfWork>();

            MissaoService service = new MissaoService(mockUnit.Object,mockIntro.Object, mockJog.Object);
            MissoesController controller = new MissoesController(service);

            var result = await controller.GetMissao(missaoId);

            mockIntro.Verify(repository => repository.GetByIdAsync(It.IsAny<MissaoId>()), Times.AtLeastOnce());
            Assert.IsType<ActionResult<MissaoDto>>(result);
        }

        /*[Fact]
        public async Task PostMissao(){

            string nome = "Beatriz";
            string email = "beatriz.vaz2001@gmail.com";
            long telefone = 351915246058;
            List<string> tag = new List<string>();
            tag.Add("musica");
            string data = "2000/08/15";
            string estado = "Disappointed";
            string password = "Q178oAX.qw@";
            string pais = "en-PT";
            string cidade = "Porto1";
            string perfilFB = "perfilFb";
            string perfilLI = "perfilLin";
            Perfil per = new Perfil(nome, email, telefone, tag, data, estado, password, pais, cidade, perfilFB, perfilLI);
            Jogador jogador = new Jogador(per);

            int dificuldade = 2;
            string dataMissao = "2020/05/12";

            CreatingMissaoDto missao = new CreatingMissaoDto(dificuldade, dataMissao, jogador.Id.AsGuid());

            var mockIntro = new Mock<IMissaoRepository>();
            var mockJog = new Mock<IJogadorRepository>();
            
            MissaoDto dto = new MissaoDto{Dificuldade = missao.Dificuldade, Data = missao.Data, JogadorObjetivo = missao.JogadorObjetivo};
            Missao i = new Missao(dto.Dificuldade, dto.Data, jogador);

            mockIntro.Setup(repository => repository.AddAsync(It.IsAny<Missao>())).Returns(Task.FromResult(i));
            var mockUnit = new Mock<IUnitOfWork>();

            MissaoService service = new MissaoService(mockUnit.Object,mockIntro.Object, mockJog.Object);
            MissoesController controller = new MissoesController(service);

            var result = await controller.PostMissao(missao);

            mockIntro.Verify(repository => repository.AddAsync(It.IsAny<Missao>()), Times.AtLeastOnce());
            mockUnit.Verify(unit => unit.CommitAsync(), Times.AtLeastOnce());

            Assert.IsType<ActionResult<MissaoDto>>(result);
        }*/

    }
}