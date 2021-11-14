using DDDSample1.Domain.Perfis;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Perfis
{
    public class NomeTest
    {
        [Fact]
        public void TestCreateNome()
        {
            string nome = "Maria";
            Nome name = new Nome(nome);
            
            Assert.Equal(nome, name.Name);
        }
    }
}