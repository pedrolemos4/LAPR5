using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Perfis;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Domain.Jogadores
{
    public interface IJogadorService {
        Task<JogadorDto> GetByIdAsync(JogadorId id);
        Task<JogadorDto> GetJogadorByPerfil(PerfilId perfil);
        Task<List<JogadorDto>> GetAmigosEmComum(JogadorId idJog, JogadorId idObj);
        Task<List<JogadorDto>> GetAmigos(JogadorId idJog);
        Task<JogadorDto> AddAsync(CreatingJogadorDto jogadorDto);
        Task<List<JogadorDto>> GetAllAsync();
        Task<JogadorDto> UpdateAsync(JogadorDto jogador);
        Task<JogadorDto> DeleteAsync(JogadorId jogadorId);
    }
}