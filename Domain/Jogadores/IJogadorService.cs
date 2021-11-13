using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Utils;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Domain.Jogadores
{
    public interface IJogadorService {
        Task<JogadorDto> GetByIdAsync(JogadorId id);
        Task<JogadorDto> GetJogadorByPerfil(Perfil perfil);
        Task<List<JogadorDto>> GetAmigosEmComum(JogadorId idJog, JogadorId idObj);
        Task<List<JogadorDto>> GetAmigos(JogadorId idJog);
        Task<JogadorDto> AddAsync(CreatingJogadorDto jogadorDto);
        Task<UndirectedGenericGraph<JogadorDto>> GetRedeJogador(List<JogadorDto> jogadores, JogadorDto centro);
        Task<List<JogadorDto>> GetAllAsync();
    }
}