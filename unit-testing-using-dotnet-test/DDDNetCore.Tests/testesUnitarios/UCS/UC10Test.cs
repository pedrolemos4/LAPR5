using System.Threading.Tasks;
using DDDSample1.Domain.Introducoes;
using DDDSample1.Controllers;
using Moq;
using Xunit;
using DDDSample1.Domain.Relacoes;
using System;
using DDDSample1.Domain.Jogadores;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Ligacoes;

namespace DDDNetCore.Tests.testesUnitarios.UCS
{
    public class UC10Test
    {
        [Fact]
        public async Task UC10() {
            string nome = "Beatriz";
            string email = "beatriz@gmail.com";
            string pais = "en-PT";
            var mockPer = new Mock<IPerfilService>();
            PerfisController controller = new PerfisController(mockPer.Object);

            var result1 = await controller.GetPerfilByNome(nome);
            var result2 = await controller.GetPerfilByEmail(email);
            Guid perfilId = new Guid();
            var result3 = await controller.GetPerfilByPais(pais);

            mockPer.Verify(service => service.getPerfilByNome(It.IsAny<string>()), Times.AtLeastOnce());
            mockPer.Verify(service => service.GetPerfilByEmail(It.IsAny<string>()), Times.AtLeastOnce());
            mockPer.Verify(service => service.GetPerfilByPais(It.IsAny<string>()), Times.AtLeastOnce());

            var mockJog = new Mock<IJogadorService>();
            mockJog.Setup(service => service.GetJogadorByPerfil(It.IsAny<PerfilId>()));
            JogadoresController controllerJog = new JogadoresController(mockJog.Object, mockPer.Object);
            var result4 = await controllerJog.GetJogadorByPerfil(perfilId);
            mockJog.Verify(service => service.GetJogadorByPerfil(It.IsAny<PerfilId>()), Times.AtLeastOnce());

            CreatingLigacaoDto request = new CreatingLigacaoDto("Texto", "Pendente", new Guid(), new Guid());

            var mockLig = new Mock<ILigacaoService>();

            LigacaoDto ligacaoDto = new LigacaoDto { TextoLigacao = request.TextoLigacao, Estado = request.EstadoLigacao, Jogador1 = request.Jogador1, Jogador2 = request.Jogador2 };

            mockLig.Setup(service => service.AddAsync(It.IsAny<CreatingLigacaoDto>())).Returns(Task.FromResult(ligacaoDto));
            LigacoesController controllerLig = new LigacoesController(mockLig.Object);

            var result5 = await controllerLig.PostLigacao(request);

            mockLig.Verify(service => service.AddAsync(It.IsAny<CreatingLigacaoDto>()), Times.AtLeastOnce());
            ActionResult<LigacaoDto> LigacaoDto = ligacaoDto;
            Assert.IsType<ActionResult<LigacaoDto>>(result5);
        }
    }
}