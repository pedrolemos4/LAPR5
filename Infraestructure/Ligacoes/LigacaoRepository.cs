using DDDSample1.Domain.Ligacoes;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Ligacoes
{
    public class LigacaoRepository : BaseRepository<Ligacao,LigacaoId>, ILigacaoRepository
    {
          public LigacaoRepository(DDDSample1DbContext context):base(context.Ligacoes)
        {
           
        }
    }
}