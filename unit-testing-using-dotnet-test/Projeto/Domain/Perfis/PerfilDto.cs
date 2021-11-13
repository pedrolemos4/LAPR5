using System;


namespace DDDSample1.Domain.Perfis
{
    public class PerfilDto
    {
        public Guid Id { get; set; }

        public Nome Nome { get; set; }

        public EstadoHumor EstadoHumor { get; set; }

        public Email Email{ get; set; }

        public Pais Pais { get; set; }

    }
}