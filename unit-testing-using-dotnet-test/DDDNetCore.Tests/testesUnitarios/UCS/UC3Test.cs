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
    public class UC3Test
    {
        [Fact]
        public async Task UC3() {
            Guid relacaoId = new Guid();
            Guid jog1 = new Guid();
            Guid jog2 = new Guid();
            int fr = 10;
            int fl = 5;
            int novaFL = 4;
            List<string> tags = new List<string>();
            List<string> novasTags = new List<string>();
            tags.Add("musica");
            novasTags.Add("desporto");
            novasTags.Add("Porto");
            
            RelacaoDto rel = new RelacaoDto{Id = relacaoId, Jogador1 = jog1, Jogador2 = jog2, ForcaRelacao = fr, ForcaLigacao = fl, Tags = tags};
            rel = new RelacaoDto{Id = relacaoId, Jogador1 = jog1, Jogador2 = jog2, ForcaRelacao = fr, ForcaLigacao = novaFL, Tags = novasTags};

            var mockRel = new Mock<IRelacaoService>();

            mockRel.Setup(service => service.PatchRelacaoTagsForca(It.IsAny<RelacaoDto>()));

            RelacoesController controller = new RelacoesController(mockRel.Object);

            var result = await controller.PatchRelacao(relacaoId, rel);

            mockRel.Verify(service => service.PatchRelacaoTagsForca(It.IsAny<RelacaoDto>()), Times.AtLeastOnce());

            Assert.IsType(typeof(ActionResult<RelacaoDto>), result);
        }
    }
}