using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;
using Xunit;
using System;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Perfis
{
    public class EstadoHumorTest
    {
        [Fact]
        public void TestCreateEstadoHumor()
        {

            EstadoHumor e = new EstadoHumor("Joyful", 0.5m);

            Assert.Equal("Joyful", e.Estado);
        }

        [Fact]
        public void TestCreateEstadoHumorErrado()
        {
            string estado = "Joyful";

            Assert.Throws<BusinessRuleValidationException>(() => new EstadoHumor(estado, 15));
        }
    }
}