using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Perfis
{
    public class PaisTest
    {
        [Fact]
        public void TestCreatePais()
        {
            string pais = "en-PT";
            string paisformatado = "Portugal";
            Pais p = new Pais(pais);
            
            Assert.Equal(paisformatado, p.Country);
        }

        [Fact]
        public void TestCreatePaisErrado()
        {
            string pais = "pais";
            
            Assert.Throws<BusinessRuleValidationException>(() => new Pais(pais));
        }
    }
}