using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Perfis
{
    public class EstadoHumorTest
    {
        [Fact]
        public void TestCreateEstadoHumor()
        {
            string estado = "Joyful";
            EstadoHumor e = new EstadoHumor(estado);
            
            Assert.Equal(estado, e.Estado);
        }

        [Fact]
        public void TestCreateEstadoHumorErrado()
        {
            string estado = "estado";
            
            Assert.Throws<BusinessRuleValidationException>(() => new EstadoHumor(estado));
        }
    }
}