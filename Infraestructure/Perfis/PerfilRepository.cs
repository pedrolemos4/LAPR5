using DDDSample1.Domain.Perfis;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Perfis
{
    public class PerfilRepository : BaseRepository<Perfil, PerfilId>, IPerfilRepository
    {
    
        public PerfilRepository(DDDSample1DbContext context):base(context.Perfis)
        {
           
        }


    }
}