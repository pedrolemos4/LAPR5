using System;
using DDDSample1.Domain.Jogadores;

namespace DDDSample1.Domain.Missoes
{
    public class MissaoDto
    {
        public Guid Id { get; set; }

        public int Dificuldade { get; set; }

        public string Data { get; set; }

        public Guid JogadorObjetivo { get; set; }

    }
}