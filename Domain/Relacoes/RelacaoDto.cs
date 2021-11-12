using System;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.SharedValueObjects;
using System.Collections.Generic;

namespace DDDSample1.Domain.Relacoes
{
    public class RelacaoDto
    {
        public JogadorId Jogador1 { get; set; }

        public JogadorId Jogador2 { get; set; }

        public String Id { get; set; }

        public List<Tag> Tags { get; set; }

        public ForcaRelacao ForcaRelacao { get; set; }

        public ForcaLigacao ForcaLigacao { get; set; }
    }
}