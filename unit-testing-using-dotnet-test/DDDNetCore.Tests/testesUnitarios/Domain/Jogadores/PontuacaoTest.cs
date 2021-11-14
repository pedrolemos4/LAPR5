using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Jogadores
{
    public class PontuacaoTest
    {
        [Fact]
        public void CriacaoPontuacao() {
            int pontos = 2;
            Pontuacao pont = new Pontuacao(pontos);

            Assert.Equal(pontos, pont.Pontos);
        }

        [Fact]
        public void VerificaPontuacaoNegativa() {
            int pontos = -45;

            Assert.Throws<BusinessRuleValidationException>(() => new Pontuacao(pontos));
        }
    }
}