using DDDSample1.Domain.Introducoes;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Introducoes
{
    public class IntroducaoRepository : BaseRepository<Introducao,IntroducaoId>, IIntroducaoRepository
    {
          public IntroducaoRepository(DDDSample1DbContext context):base(context.Introducoes)
        {
           
        }
    }
}