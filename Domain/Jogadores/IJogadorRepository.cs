using System.Threading.Tasks;
using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;


namespace DDDSample1.Domain.Jogadores
{
    public interface IJogadorRepository : IRepository<Jogador, JogadorId>
    {
        Task<Jogador> GetJogadorByPerfil(Perfil perfil);
        Task<List<JogadorId>> GetAmigosEmComum(JogadorId idJog, JogadorId idObj);
        Task<List<JogadorId>> GetAmigos(JogadorId idJog);
    }
}