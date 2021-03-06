using DDDSample1.Domain.SharedValueObjects;
using DDDSample1.Domain.Jogadores;
using System.Collections.Generic;
using System;

namespace DDDSample1.Domain.Relacoes
{
    public class CreatingRelacaoDto
    {

        public Guid Jogador1 { get;  set; }
        public Guid Jogador2 { get;  set; }
        public List<string> Tags { get;  set; }
        public int ForcaRelacao { get;  set; }
        public int ForcaLigacao { get;  set; }

        public CreatingRelacaoDto(Guid jog1, Guid jog2, List<string> tags, int fr, int fl)
        {
            this.Jogador1 = jog1;
            this.Jogador2 = jog2;
            this.Tags = tags;
            this.ForcaRelacao = fr;
            this.ForcaLigacao = fl;
        }

    }
}