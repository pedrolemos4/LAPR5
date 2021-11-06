using DDDSample1.Domain.Relacoes;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Relacoes
{
    public class RelacaoRepository : BaseRepository<Relacao, RelacaoId>,IRelacaoRepository
    {
        public RelacaoRepository(DDDSample1DbContext context):base(context.Relacoes)
        {
           
        }
    }
}