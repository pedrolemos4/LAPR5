using DDDSample1.Domain.Perfis;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Perfis
{
    public class PerfilFacebookTest
    {
        [Fact]
        public void TestCreatePerfilFacebook()
        {
            string perfilFB = "perfilFB";
            PerfilFacebook per = new PerfilFacebook(perfilFB);
            
            Assert.Equal(perfilFB, per.PerfilFace);
        }
    }
}