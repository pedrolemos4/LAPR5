using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Jogadores
{

    public class CreatingJogadorDto
    {
        public int pontos { get; set; }
        public Guid perfilId { get; set; }
        public List<string> listaRelacoes { get; set; }

        public List<string> listaMissoes { get; set; }

        public List<string> listaPosts { get; set; }

        public CreatingJogadorDto(int pontos, Guid perfilId, List<string> listaRelacoes,
         List<string> listaMissoes,List<string> listaPosts)
        {
            this.pontos = (pontos);
            this.perfilId = perfilId;
            this.listaRelacoes = (listaRelacoes);
            this.listaMissoes = (listaMissoes);
            this.listaPosts = (listaPosts);
        }
    }
}