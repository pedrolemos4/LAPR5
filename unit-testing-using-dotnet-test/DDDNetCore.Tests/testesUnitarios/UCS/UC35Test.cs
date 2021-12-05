using System.Threading.Tasks;
using DDDSample1.Domain.Introducoes;
using DDDSample1.Controllers;
using Moq;
using Xunit;
using System;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Ligacoes;
using DDDSample1.Domain.Perfis;

namespace DDDNetCore.Tests.testesUnitarios.UCS
{
    public class UC35Test
    {
        [Fact]
        public async Task UC35() {
            string email = "beatriz@gmail.com";
            var mockPer = new Mock<IPerfilService>();
            PerfisController controller = new PerfisController(mockPer.Object);

            var result = await controller.GetPerfilByEmail(email);
            Guid perfilId = new Guid();

            mockPer.Setup(service => service.GetPerfilByEmail(It.IsAny<string>()));
            mockPer.Verify(service => service.GetPerfilByEmail(It.IsAny<string>()), Times.AtLeastOnce());
            
            Guid jogadorId = new Guid();

            var mockJog = new Mock<IJogadorService>();
            mockJog.Setup(service => service.GetJogadorByPerfil(It.IsAny<PerfilId>()));
            JogadoresController controllerJog = new JogadoresController(mockJog.Object, mockPer.Object);
            var result2 = await controllerJog.GetJogadorByPerfil(perfilId);
            mockJog.Verify(service => service.GetJogadorByPerfil(It.IsAny<PerfilId>()), Times.AtLeastOnce());

            var mockLig = new Mock<ILigacaoService>();
            mockLig.Setup(service => service.GetLigacaoPendente(It.IsAny<JogadorId>()));
            LigacoesController controllerLig = new LigacoesController(mockLig.Object);

            var result3 = await controllerLig.GetLigacaoPendente(jogadorId);

            mockLig.Verify(service => service.GetLigacaoPendente(It.IsAny<JogadorId>()), Times.AtLeastOnce());
        }
    }
}