using DDDSample1.Domain.Jogadores;
using DDDSample1.Infrastructure.Shared;


namespace DDDSample1.Infrastructure.Jogadores
{
    public class JogadorRepository : BaseRepository<Jogador,JogadorId>, IJogadorRepository
    {
          public JogadorRepository(DDDSample1DbContext context):base(context.Jogadores)
        {
           
        }
    }
}