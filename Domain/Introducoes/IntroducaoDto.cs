using System;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.SharedValueObjects;


namespace DDDSample1.Domain.Introducoes
{
    public class IntroducaoDto
    {
        public Jogador JogadorInicial { get; set; }

        public Jogador JogadorIntrodutor { get; set; }

        public Jogador JogadorObjetivo { get; set; }

        public String Id { get; set; }

        public Estado EstadoIntroducao { get; set; }
    }
}