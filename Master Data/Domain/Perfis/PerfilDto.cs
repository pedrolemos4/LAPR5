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

        public string EstadoHumor { get; set; }

        public string Email { get; set; }

        public string Pais { get; set; }

        public List<string> Tags { get; set; }

    }
}