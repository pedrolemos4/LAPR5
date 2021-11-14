using DDDSample1.Domain.Perfis;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Perfis
{
    public class PerfilLinkedinTest
    {
        [Fact]
        public void TestCreatePerfilLinkedin()
        {
            string perfilLI = "perfilLI";
            PerfilFacebook per = new PerfilFacebook(perfilLI);
            
            Assert.Equal(perfilLI, per.PerfilFace);
        }
    }
}