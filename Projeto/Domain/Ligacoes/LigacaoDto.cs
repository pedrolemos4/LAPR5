using System;


namespace DDDSample1.Domain.Ligacoes
{
    public class LigacaoDto
    {
        public Guid Id { get; set; }

        public string TextoLigacao { get; set; }

        public string Estado { get; set; }

        public Guid Jogador1 { get; set; }

        public Guid Jogador2 { get; set; }
    }
}