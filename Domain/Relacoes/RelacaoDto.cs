using System;


namespace DDDSample1.Domain.Perfis
{
    public class PerfilDto
    {
        public String Id { get; set; }

        public Tag Tags { get; set; }

        public ForcaRelacao ForcaRelacao { get; set; }

        public ForcaLigacao ForcaLigacao { get; set; }
    }
}