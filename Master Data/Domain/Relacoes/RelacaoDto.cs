using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Relacoes
{
    public class RelacaoDto
    {
        public Guid Jogador1 { get; set; }

        public Guid Jogador2 { get; set; }

        public Guid Id { get; set; }

        public List<string> Tags { get; set; }

        public int ForcaRelacao { get; set; }

        public int ForcaLigacao { get; set; }
    }
}