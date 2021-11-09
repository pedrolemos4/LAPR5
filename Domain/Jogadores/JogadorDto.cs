using System;
using DDDSample1.Domain.SharedValueObjects;
using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Missoes;
using DDDSample1.Domain.Relacoes;
using System.Collections.Generic;
using DDDSample1.Domain.Posts;


namespace DDDSample1.Domain.Jogadores
{
    public class JogadorDto
    {
        public String Id { get; set; }

        public Pontuacao Pontuacao { get; set; }

        public PerfilId perfilId {get; set;}

        public List<Missao> Missao{ get; set; }

        public List<Relacao> Relacao{ get; set; }

        public List<Post> Post{ get; set; }
    }
}