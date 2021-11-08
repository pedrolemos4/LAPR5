using System;
using DDDSample1.Domain.Jogadores;

namespace DDDSample1.Domain.Missoes
{
    public class MissaoDto
    {
        public String Id { get; set; }

        public Dificuldade Dificuldade { get; set; }

        public Data Data { get; set; }

        public Jogador JogadorObjetivo { get; set; }

    }
}