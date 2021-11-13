using DDDSample1.Domain.Jogadores;

namespace DDDSample1.Domain.Missoes
{
    public class CreatingMissaoDto
    {

        public Dificuldade Dificuldade { get;  private set; }

        public Data Data { get;  private set; }

        public Jogador JogadorObjetivo { get;  private set; }

        public CreatingMissaoDto(int dificuldade, string data, Jogador jog)
        {
            this.Dificuldade = new Dificuldade(dificuldade);
            this.Data = new Data(data);
            this.JogadorObjetivo = jog;
        }
    }
}