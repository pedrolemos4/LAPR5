using System;
using System.Collections.Generic;
using DDDSample1.Domain.Relacoes;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Relacoes
{
    public class CreatingRelacaoDtoTest
    {
        [Fact]
        public void TestCreateRelacaoDto()
        {
            Guid jogador1 = new Guid();
            Guid jogador2 = new Guid();
            List<string> tags =  new List<string>();
            tags.Add("tag1");
            tags.Add("tag2");
            int fr = 5;
            int fl = 2;

            CreatingRelacaoDto dto = new CreatingRelacaoDto(jogador1, jogador2, tags, fr, fl);

            Assert.Equal(jogador1, dto.Jogador1);
            Assert.Equal(jogador2, dto.Jogador2);
            Assert.Equal(tags, dto.Tags);
            Assert.Equal(fr, dto.ForcaRelacao);
            Assert.Equal(fl, dto.ForcaLigacao);
        }
    }
}