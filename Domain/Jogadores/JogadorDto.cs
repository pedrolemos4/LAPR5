using System;
using DDDSample1.Domain.SharedValueObjects;


namespace DDDSample1.Domain.Jogadores
{
    public class JogadorDto
    {
        public String Id { get; set; }

        public Pontuacao Pontuacao { get; set; }

        public Tag tags { get; set; }
    }
}