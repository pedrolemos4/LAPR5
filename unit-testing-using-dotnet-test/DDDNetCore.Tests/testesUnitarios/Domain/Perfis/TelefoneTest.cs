using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Perfis
{
    public class TelefoneTest
    {
        [Fact]
        public void TestCreateTelefone()
        {
            long telefone = 111122224444;
            Telefone tele = new Telefone(telefone);
            
            Assert.Equal(telefone, tele.NumTelefone);
        }

        [Fact]
        public void TestCreateTelefoneErrado()
        {
            long telefone = 111444;
            
            Assert.Throws<BusinessRuleValidationException>(() => new Telefone(telefone));
        }
    }
}