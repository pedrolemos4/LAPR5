using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Relacoes;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Infrastructure.Relacoes
{
    public class RelacaoRepository : BaseRepository<Relacao, RelacaoId>,IRelacaoRepository
    {
        private readonly DDDSample1DbContext _context;
        
        public RelacaoRepository(DDDSample1DbContext context):base(context.Relacoes)
        {
           _context = context;
        }

        public async Task<Relacao> GetRelacaoComDoisIds(JogadorId jogadorId1, JogadorId jogadorId2)
        {
            return await this._context.Relacoes.Where(x => (jogadorId1.Equals(x.Jogador1) && (jogadorId2.Equals(x.Jogador2)))).FirstOrDefaultAsync();
        }

        public async Task<List<Relacao>> GetRelacoesDoJogador(JogadorId jog)
        {
            return await this._context.Relacoes.Where(x => jog.Equals(x.Jogador1)).ToListAsync();
        }
    }
}