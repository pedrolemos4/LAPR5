using System;
using DDDSample1.Domain.SharedValueObjects;
using DDDSample1.Domain.Jogadores;


namespace DDDSample1.Domain.Ligacoes
{
    public class LigacaoDto
    {
        public Guid Id { get; set; }

        public TextoLigacao TextoLigacao { get; set; }

        public Estado Estado { get; set; }

        public JogadorId Jogador1 { get; set; }

        public JogadorId Jogador2 { get; set; }
    }
}