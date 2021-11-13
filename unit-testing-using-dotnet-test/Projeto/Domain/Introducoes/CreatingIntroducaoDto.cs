using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.SharedValueObjects;
using System;

namespace DDDSample1.Domain.Introducoes
{
    public class CreatingIntroducaoDto
    {
        public Jogador JogadorInicial { get;  private set; }

        public Jogador JogadorIntrodutor { get;  private set; }

        public Jogador JogadorObjetivo { get;  private set; }

        public Estado EstadoIntroducao { get;  private set; }

        public CreatingIntroducaoDto(Jogador jog_inicial, Jogador jog_introdutor, Jogador jog_objetivo, string estado)
        {
            this.JogadorInicial = jog_inicial;
            this.JogadorIntrodutor = jog_introdutor;
            this.JogadorObjetivo = jog_objetivo;
            setEstado(estado);
        }

        private void setEstado(string estado)
        {
                Estado enumerado;
                Estado.TryParse(estado, out enumerado);
                this.EstadoIntroducao = enumerado;
            
        }
    }
}