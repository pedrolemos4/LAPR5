using System;
using DDDSample1.Domain.SharedValueObjects;
using DDDSample1.Domain.Jogadores;


namespace DDDSample1.Domain.Ligacoes
{
    public class LigacaoDto
    {
        public String Id { get; set; }

        public TextoLigacao TextoLigacao { get; set; }

        public Estado Estado { get; set; }

        public Jogador Jogador1 { get; set; }

        public Jogador Jogador2 { get; set; }
    }
}