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

namespace DDDNetCore.Tests.testesUnitarios.UCS
{
    public class UC7Test
    {
        [Fact]
        public async Task UC7() {
            Guid jogadorId = new Guid();
            int nivel = 3;
            var mockRel = new Mock<IRelacaoService>();
            mockRel.Setup(service => service.GetRedeJogador(It.IsAny<JogadorId>(), nivel));
            RelacoesController controller = new RelacoesController(mockRel.Object);

            var result = await controller.GetRedeJogador(jogadorId, nivel);

            mockRel.Verify(service => service.GetRedeJogador(It.IsAny<JogadorId>(), nivel), Times.AtLeastOnce());
        }
    }
}