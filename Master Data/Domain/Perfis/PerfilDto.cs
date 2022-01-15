using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Perfis
{
    public class PerfilDto
    {
        public Guid Id { get; set; }

        public string avatar { get; set; }

        public string Nome { get; set; }

        public DateTime dataN { get; set; }

        public Dictionary <string, decimal> EstadoHumor { get; set; }

        public string Email { get; set; }

        public string Pais { get; set; }

        public string cidade { get; set; }

        public List<string> Tags { get; set; }

        public long telefone { get; set; }
        
        public string perfilFacebook { get; set; }

        public string perfilLinkedin { get; set; }
    }
}