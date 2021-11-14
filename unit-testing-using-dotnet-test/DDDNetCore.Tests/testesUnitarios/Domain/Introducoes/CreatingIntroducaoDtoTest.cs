
using System;
using DDDSample1.Domain.Introducoes;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Introducoes
{
    public class CreatingIntroducaoDtoTest
    {
        [Fact]
        public void CriacaoIntroducaoDto() {
            Guid jogInicial = new Guid();
            Guid jogIntro = new Guid();
            Guid jogObj = new Guid();

            string estadoIntro = "Pendente";
            CreatingIntroducaoDto intro = new CreatingIntroducaoDto(jogInicial,jogIntro,jogObj, estadoIntro);
            Assert.Equal(jogInicial, intro.JogadorInicial);
            Assert.Equal(jogIntro, intro.JogadorIntrodutor);
            Assert.Equal(jogObj, intro.JogadorObjetivo);
            Assert.Equal(estadoIntro, intro.EstadoIntroducao.ToString());
        }
    }
}