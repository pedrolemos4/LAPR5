using System;

namespace DDDSample1.Domain.Introducoes
{
    public class CreatingIntroducaoDto
    {
        public Guid JogadorInicial { get; set; }

        public Guid JogadorIntrodutor { get; set; }

        public Guid JogadorObjetivo { get; set; }

        public string EstadoIntroducao { get; set; }

        public string TextoIntroducao { get; set; }

        public CreatingIntroducaoDto(Guid jog_inicial, Guid jog_introdutor, Guid jog_objetivo, string estado, string texto)
        {
            this.JogadorInicial = jog_inicial;
            this.JogadorIntrodutor = jog_introdutor;
            this.JogadorObjetivo = jog_objetivo;
            this.EstadoIntroducao = estado;
            this.TextoIntroducao = texto;
        }
    }
}