using System;
using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Perfis
{
    public class DataNascimentoTest
    {
        [Fact]
        public void TestCreateDataNascimento()
        {
            string data = "2000-09-20";
            string dataformatada = "20/09/2000 00:00:00";
            DataNascimento d = new DataNascimento(data);
            
            Assert.Equal(dataformatada, d.DataNasc.ToString());
        }

        [Fact]
        public void TestCreateDataNascimentoErrada()
        {
            string data = "2000-18-39";
            
            Assert.Throws<ArgumentOutOfRangeException>(() => new DataNascimento(data));
        }
    }
}