using System;


namespace DDDSample1.Domain.Perfis
{
    public class PerfilDto
    {
        public String Id { get; set; }

        public Nome Nome { get; set; }

        public Email Email { get; set; }

        public Telefone Telefone { get; set; }

        public DataNascimento DataNascimento { get; set; }

        public EstadoHumor EstadoHumor { get; set; }

        public PerfilFacebook PerfilFacebook { get; set; }

        public PerfilLinkedin PerfilLinkedin { get; set; }
    }
}