using System;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.SharedValueObjects;


namespace DDDSample1.Domain.Introducoes
{
    public class IntroducaoDto
    {
        public Jogador JogadorInicial { get;  private set; }

        public Jogador JogadorIntrodutor { get;  private set; }

        public Jogador JogadorObjetivo { get;  private set; }

        public String Id { get; set; }

        public Estado Estado { get; set; }
    }
}