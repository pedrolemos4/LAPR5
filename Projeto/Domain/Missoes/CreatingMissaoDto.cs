using System;
using DDDSample1.Domain.Jogadores;

namespace DDDSample1.Domain.Missoes
{
    public class CreatingMissaoDto
    {

        public int Dificuldade { get;  private set; }

        public string Data { get;  private set; }

        public Guid JogadorObjetivo { get;  private set; }

        public CreatingMissaoDto(int dificuldade, string data, Guid jog)
        {
            this.Dificuldade = dificuldade;
            this.Data = data;
            this.JogadorObjetivo = jog;
        }
    }
}