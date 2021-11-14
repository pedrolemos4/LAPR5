using System.Threading.Tasks;
using DDDSample1.Domain.Introducoes;
using DDDSample1.Controllers;
using Moq;
using Xunit;
using DDDSample1.Domain.Relacoes;
using System;

namespace DDDNetCore.Tests.testesUnitarios.Controller
{
    public class IntroducoesControllerTest
    {
        [Fact]
        public async Task GetIntroducoes() {
            var mockRel = new Mock<IRelacaoService>();
            var mockIntro = new Mock<IIntroducaoService>();
            IntroducoesController controller = new IntroducoesController(mockRel.Object, mockIntro.Object);

            var result = await controller.GetIntroducoes();

            mockIntro.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());
        }

        [Fact]
        public async Task GetIntroducaoById() {
            Guid introducaoId = new Guid();

            var mockRel = new Mock<IRelacaoService>();
            var mockIntro = new Mock<IIntroducaoService>();
            mockIntro.Setup(service => service.GetByIdAsync(It.IsAny<IntroducaoId>()));
            IntroducoesController controller = new IntroducoesController(mockRel.Object, mockIntro.Object);

            var result = await controller.GetIntroducao(introducaoId);

            mockIntro.Verify(service => service.GetByIdAsync(It.IsAny<IntroducaoId>()), Times.AtLeastOnce());
        }


    }
}