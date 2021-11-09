using DDDSample1.Domain.Shared;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace DDDSample1.Domain.Jogadores
{
    public interface IJogadorRepository:IRepository<Jogador,JogadorId>
    {
        Task<List<Jogador>> GetAmigosEmComum(JogadorId idJog, JogadorId idObj);
    }
}