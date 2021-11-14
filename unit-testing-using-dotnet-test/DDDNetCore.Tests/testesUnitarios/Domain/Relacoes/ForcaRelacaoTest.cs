using DDDSample1.Domain.Relacoes;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Relacoes
{
    public class ForcaRelacaoTest
    {
        [Fact]
        public void TestCreateForcaRelacao()
        {
            int Valor = 5;
            ForcaRelacao fr = new ForcaRelacao(Valor);
            
            Assert.Equal(Valor, fr.Valor);
        }
    }
}