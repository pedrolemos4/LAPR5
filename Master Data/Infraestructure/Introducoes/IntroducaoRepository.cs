using DDDSample1.Domain.Introducoes;
using DDDSample1.Infrastructure.Shared;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.Jogadores;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace DDDSample1.Infrastructure.Introducoes
{
    public class IntroducaoRepository : BaseRepository<Introducao, IntroducaoId>, IIntroducaoRepository
    {
        private readonly DDDSample1DbContext _context;
        public IntroducaoRepository(DDDSample1DbContext context) : base(context.Introducoes)
        {
            _context = context;
        }

        public async Task<List<Introducao>> GetIntroducoesPorAprovar(JogadorId idJog)
        {
            var introducoes = await _context.Introducoes
            .Where(i => (i.JogadorIntrodutor.Equals(idJog)) && (i.EstadoIntroducao.Equals("Pendente"))).ToListAsync();
            return introducoes;   
        }

        public async Task<List<Introducao>> GetIntroducoesAprovarRejeitar(JogadorId idJog)
        {
            var introducoes = await _context.Introducoes
            .Where(i => (i.JogadorObjetivo.Equals(idJog)) && (i.EstadoIntroducao.Equals("Pendente"))).ToListAsync();
            return introducoes;   
        }

    }
}