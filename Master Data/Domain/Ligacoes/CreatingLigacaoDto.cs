using System;

namespace DDDSample1.Domain.Ligacoes
{
    public class CreatingLigacaoDto
    {
        public string TextoLigacao { get ; set; }
        public string EstadoLigacao { get ; set; }
        public Guid Jogador1 { get ; set; }

        public Guid Jogador2 { get ; set; }

        public CreatingLigacaoDto(string texto, string estado, Guid jogador1, Guid jogador2)
        {
            this.TextoLigacao = texto;
            this.EstadoLigacao = estado;
            this.Jogador1 = jogador1;
            this.Jogador2 = jogador2;
        }

    }
}