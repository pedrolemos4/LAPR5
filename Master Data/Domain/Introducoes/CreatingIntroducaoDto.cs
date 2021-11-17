using System;

namespace DDDSample1.Domain.Introducoes
{
    public class CreatingIntroducaoDto
    {
        public Guid JogadorInicial { get;  private set; }

        public Guid JogadorIntrodutor { get;  private set; }

        public Guid JogadorObjetivo { get;  private set; }

        public string EstadoIntroducao { get;  private set; }

        public CreatingIntroducaoDto(Guid jog_inicial, Guid jog_introdutor, Guid jog_objetivo, string estado)
        {
            this.JogadorInicial = jog_inicial;
            this.JogadorIntrodutor = jog_introdutor;
            this.JogadorObjetivo = jog_objetivo;
            this.EstadoIntroducao = estado;
        }
    }
}