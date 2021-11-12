using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Perfis;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace DDDSample1.Infrastructure.Jogadores
{
    public class JogadorRepository : BaseRepository<Jogador, JogadorId>, IJogadorRepository
    {
        private readonly DDDSample1DbContext _context;
        
        public JogadorRepository(DDDSample1DbContext context) : base(context.Jogadores)
        {
            _context = context;
        }

        public async Task<Jogador> GetJogadorByPerfil(Perfil perfil) {
            return await this._context.Jogadores.Where(x => perfil.Equals(x.perfil)).FirstOrDefaultAsync();
        }

        public async Task<List<Jogador>> GetAmigosEmComum(JogadorId jogadorId, JogadorId jogObjId)
        {
            var amigosObj = await _context.Relacoes
                .Where(r => (r.Jogador1.Id.Equals(jogObjId))
                || (r.Jogador2.Id.Equals(jogObjId))).ToListAsync();
            var amigosJog = await _context.Relacoes
                .Where(r => (r.Jogador1.Id.Equals(jogadorId)) || (r.Jogador2.Id.Equals(jogadorId))).ToListAsync();
            List<Jogador> amigos = amigosJog.Select(r => !r.Jogador1.Equals(jogadorId) ? r.Jogador1 : r.Jogador2).ToList();
            List<Jogador> amigosOj = amigosObj.Select(r => !r.Jogador1.Equals(jogObjId) ? r.Jogador1 : r.Jogador2).ToList();
            return amigos.Intersect(amigosOj).ToList();
        }

        public async Task<List<Jogador>> GetAmigos(JogadorId jogadorId)
        {
            var amigosJog = await _context.Relacoes
                .Where(r => (r.Jogador1.Id.Equals(jogadorId))).ToListAsync();
            List<Jogador> amigos = amigosJog.Select(r => !r.Jogador1.Equals(jogadorId) ? r.Jogador1 : r.Jogador2).ToList();
            return amigos.ToList();
        }
    }
}