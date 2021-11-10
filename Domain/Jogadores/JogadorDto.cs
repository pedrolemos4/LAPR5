using System;
using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Missoes;
using DDDSample1.Domain.Relacoes;
using System.Collections.Generic;
using DDDSample1.Domain.Posts;


namespace DDDSample1.Domain.Jogadores
{
    public class JogadorDto
    {
        public JogadorId Id { get; set; }

        public PerfilId perfilId { get; set; }
    }
}