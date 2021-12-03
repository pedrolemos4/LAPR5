using System;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.SharedValueObjects;


namespace DDDSample1.Domain.Introducoes
{
    public class IntroducaoDto
    {
        public Guid JogadorInicial { get; set; }

        public Guid JogadorIntrodutor { get; set; }

        public Guid JogadorObjetivo { get; set; }

        public Guid Id { get; set; }

        public string EstadoIntroducao { get; set; }

        public string TextoIntroducao { get; set; }
    }
}