using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Perfis
{
    public class CidadeTest
    {
        [Fact]
        public void TestCreateCidade()
        {
            string cidade = "Porto1";
            Cidade c = new Cidade(cidade);
            
            Assert.Equal(cidade, c.City);
        }
    }
}