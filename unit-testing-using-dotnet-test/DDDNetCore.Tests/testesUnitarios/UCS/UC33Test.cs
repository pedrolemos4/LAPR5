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

namespace DDDNetCore.Tests.testesUnitarios.UCS
{
    public class UC33Test
    {
        [Fact]
        public async Task UC33() {
            Guid introducaoId = new Guid();
            Guid jogInicial = new Guid();
            Guid jogIntro = new Guid();
            Guid jogObj = new Guid();

            var mockIntro = new Mock<IIntroducaoService>();
            var mockRel = new Mock<IRelacaoService>();

            IntroducoesController controllerIntro = new IntroducoesController(mockIntro.Object);
            RelacoesController controllerRel = new RelacoesController(mockRel.Object);

            string estadoIntro = "Pendente";
            IntroducaoDto intro = new IntroducaoDto{Id = introducaoId, JogadorInicial = jogInicial, JogadorIntrodutor = jogIntro, JogadorObjetivo = jogObj, EstadoIntroducao = estadoIntro};
            var introducao = await controllerIntro.PatchIntroducao(introducaoId, intro);
            
            CreatingRelacaoDto request = new CreatingRelacaoDto(new Guid(), new Guid(), new List<string>(), 10, 5);
            RelacaoDto relacaoDto1 = new RelacaoDto { Jogador1 = request.Jogador1, Jogador2 = request.Jogador2, Tags = request.Tags, ForcaRelacao = request.ForcaRelacao, ForcaLigacao = request.ForcaLigacao };

            CreatingRelacaoDto request2 = new CreatingRelacaoDto(new Guid(), new Guid(), new List<string>(), 10, 5);
            RelacaoDto relacaoDto2 = new RelacaoDto { Jogador1 = request2.Jogador1, Jogador2 = request2.Jogador2, Tags = request2.Tags, ForcaRelacao = request2.ForcaRelacao, ForcaLigacao = request2.ForcaLigacao };

            mockRel.Setup(service => service.AddAsync(It.IsAny<CreatingRelacaoDto>())).Returns(Task.FromResult(relacaoDto1));
            mockRel.Setup(service => service.AddAsync(It.IsAny<CreatingRelacaoDto>())).Returns(Task.FromResult(relacaoDto2));

            var relacao1 = await controllerRel.PostRelacao(request);
            var relacao2 = await controllerRel.PostRelacao(request2);

            Assert.IsType<ActionResult<IntroducaoDto>>(introducao);
            Assert.IsType<ActionResult<RelacaoDto>>(relacao1);
            Assert.IsType<ActionResult<RelacaoDto>>(relacao2);
        }
    }
}