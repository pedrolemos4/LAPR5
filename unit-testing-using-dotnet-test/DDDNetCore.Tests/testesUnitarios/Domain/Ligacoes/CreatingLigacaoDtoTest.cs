using System;
using DDDSample1.Domain.Ligacoes;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Ligacoes
{
    public class CreatingLigacaoDtoTest
    {
        [Fact]
        public void CriacaoLigacaoDto()
        {
            Guid jogador1 = new Guid();
            Guid jogador2 = new Guid();
            string textoLigacao = "friends";
            string estadoLigacao = "pendente";

            CreatingLigacaoDto lig = new CreatingLigacaoDto(textoLigacao, estadoLigacao, jogador1, jogador2);
            Assert.Equal(textoLigacao, lig.TextoLigacao);
            Assert.Equal(estadoLigacao, lig.EstadoLigacao);
            Assert.Equal(jogador1, lig.Jogador1);
            Assert.Equal(jogador2, lig.Jogador2);
        }
    }
}