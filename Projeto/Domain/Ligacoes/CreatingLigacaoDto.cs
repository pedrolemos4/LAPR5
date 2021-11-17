using System;

namespace DDDSample1.Domain.Ligacoes
{
    public class CreatingLigacaoDto
    {
        public string TextoLigacao { get;  private set; }
        public string EstadoLigacao { get;  private set; }
        public Guid Jogador1 { get; private set; }

        public Guid Jogador2 { get; private set; }

        public CreatingLigacaoDto(string texto, string estado, Guid jogador1, Guid jogador2)
        {
            this.TextoLigacao = texto;
            this.EstadoLigacao = estado;
            this.Jogador1 = jogador1;
            this.Jogador2 = jogador2;
        }

    }
}