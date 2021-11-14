using System;
using System.Collections.Generic;



namespace DDDSample1.Domain.Jogadores
{
    public class JogadorDto
    {
        public Guid Id { get; set; }

        public int Pontuacao { get; set; }

        public Guid PerfilId {get; set;}

        public List<Guid> Missao{ get; set; }

        public HashSet<Guid> Relacao{ get; set; }

        public List<Guid> Post{ get; set; }
    }
}