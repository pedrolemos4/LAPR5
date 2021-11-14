using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Perfis
{
    public class PasswordTest
    {
        [Fact]
        public void TestCreatePassword()
        {
            string pass = "password123PASS+";
            Password p = new Password(pass);
            
            Assert.Equal(pass, p.password);
        }

        [Fact]
        public void TestCreatePasswordErrada()
        {
            string pass = "password";

            Assert.Throws<BusinessRuleValidationException>(() => new Password(pass));
        }
    }
}