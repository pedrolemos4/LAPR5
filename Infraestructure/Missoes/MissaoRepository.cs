using DDDSample1.Domain.Missoes;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Missoes
{
    public class MissaoRepository : BaseRepository<Missao, MissaoId>, IMissaoRepository
    {
    
        public MissaoRepository(DDDSample1DbContext context):base(context.Missoes)
        {
           
        }


    }
}