using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using DDDSample1.Domain.Ligacoes;
using DDDSample1.Domain.SharedValueObjects;

namespace DDDSample1.Infrastructure.Ligacoes
{
    public class LigacaoRepository : BaseRepository<Ligacao, LigacaoId>, ILigacaoRepository
    {

        private readonly DDDSample1DbContext _context;
        public LigacaoRepository(DDDSample1DbContext context) : base(context.Ligacoes)
        {
            _context = context;
        }

        public async Task<List<Ligacao>> GetLigacaoPendente(JogadorId id)
        {
            return await _context.Ligacoes.Where(r => (r.Jogador1.Equals(id) && (r.EstadoLigacao.Equals(Estado.Pendente)))).ToListAsync();
        }

        public async Task<List<Ligacao>> GetByIdJogadorAsync(JogadorId id)
        {
            return await _context.Ligacoes.Where(r => (r.Jogador1.Equals(id) || r.Jogador2.Equals(id))).ToListAsync();
        }
    }
}