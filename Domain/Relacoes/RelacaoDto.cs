using System;
using DDDSample1.Domain.SharedValueObjects;


namespace DDDSample1.Domain.Relacoes
{
    public class RelacaoDto
    {
        public String Id { get; set; }

        public Tag Tags { get; set; }

        public ForcaRelacao ForcaRelacao { get; set; }

        public ForcaLigacao ForcaLigacao { get; set; }
    }
}