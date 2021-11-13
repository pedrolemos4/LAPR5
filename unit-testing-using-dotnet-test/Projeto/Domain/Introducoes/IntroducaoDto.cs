using System;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.SharedValueObjects;


namespace DDDSample1.Domain.Introducoes
{
    public class IntroducaoDto
    {
        public JogadorId JogadorInicial { get; set; }

        public JogadorId JogadorIntrodutor { get; set; }

        public JogadorId JogadorObjetivo { get; set; }

        public Guid Id { get; set; }

        public Estado EstadoIntroducao { get; set; }
    }
}