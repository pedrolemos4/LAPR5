using System;
using System.Collections.Generic;



namespace DDDSample1.Domain.Jogadores
{
    public class JogadorDto
    {
        public Guid Id { get; set; }

        public int Pontuacao { get; set; }

        public Guid PerfilId {get; set;}

        public HashSet<Guid> Relacao{ get; set; }

    }
}