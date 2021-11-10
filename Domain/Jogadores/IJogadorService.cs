using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Perfis;

namespace DDDSample1.Domain.Jogadores
{
    public interface IJogadorService {
        Task<JogadorDto> GetByIdAsync(JogadorId id);
        Task<JogadorDto> GetJogadorByPerfil(Perfil perfil);
        Task<List<JogadorDto>> GetAmigosEmComum(JogadorId idJog, JogadorId idObj);
        Task<JogadorDto> AddAsync(CreatingJogadorDto jogadorDto);
    }
}