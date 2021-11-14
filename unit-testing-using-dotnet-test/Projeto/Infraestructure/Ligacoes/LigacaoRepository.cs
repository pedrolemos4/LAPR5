using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using DDDSample1.Domain.Ligacoes;
using System;

namespace DDDSample1.Infrastructure.Ligacoes
{
    public class LigacaoRepository : BaseRepository<Ligacao, LigacaoId>, ILigacaoRepository
    {

        private readonly DDDSample1DbContext _context;
        public LigacaoRepository(DDDSample1DbContext context) : base(context.Ligacoes)
        {
            _context = context;
        }

        public async Task<List<Ligacao>> GetLigacaoPendente(LigacaoId id)
        {
            return await _context.Ligacoes.Where(r => (r.Jogador1.Id.Equals(id) && (r.EstadoLigacao.Equals("Pendente")))  ).ToListAsync();
        }
    }
}