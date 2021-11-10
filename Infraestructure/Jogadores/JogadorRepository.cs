using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Perfis;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Infrastructure.Jogadores
{
    public class JogadorRepository : BaseRepository<Jogador,JogadorId>, IJogadorRepository
    {
        private readonly DDDSample1DbContext _context;

          public JogadorRepository(DDDSample1DbContext context):base(context.Jogadores)
        {
           _context = context;
        }

        public async Task<Jogador> GetJogadorByPerfil(Perfil perfil) {
            return await this._context.Jogadores.Where(x => perfil.Equals(x.perfil)).FirstOrDefaultAsync();
        }
    }
}