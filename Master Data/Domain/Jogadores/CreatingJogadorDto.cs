using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Jogadores
{

    public class CreatingJogadorDto
    {
        public int pontos { get; set; }
        public Guid perfilId { get; set; }
        public List<string> listaRelacoes { get; set; }

        public CreatingJogadorDto(int pontos, Guid perfilId, List<string> listaRelacoes)
        {
            this.pontos = (pontos);
            this.perfilId = perfilId;
            this.listaRelacoes = (listaRelacoes);
        }
    }
}