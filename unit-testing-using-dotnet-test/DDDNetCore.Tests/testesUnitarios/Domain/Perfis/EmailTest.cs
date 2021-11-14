using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Perfis
{
    public class EmailTest
    {
        [Fact]
        public void TestCreateEmail()
        {
            string email = "email123@gmail.com";
            Email e = new Email(email);
            
            Assert.Equal(email, e.EnderecoEmail);
        }

        [Fact]
        public void TestCreateEmailErrado()
        {
            string email = "email123";
            
            Assert.Throws<BusinessRuleValidationException>(() => new Email(email));
        }
    }
}