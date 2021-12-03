using System.Threading.Tasks;
using DDDSample1.Domain.Jogadores;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Domain.Introducoes
{
    public interface IIntroducaoService
    {
        Task<IntroducaoDto> AddAsync(CreatingIntroducaoDto intro);
        Task<IntroducaoDto> PatchEstadoIntroducao(IntroducaoDto dto);
        Task<List<IntroducaoDto>> GetIntroducoesPorAprovar(JogadorId idJog);
        Task<List<IntroducaoDto>> GetIntroducoesAprovarRejeitar(JogadorId idJog);
        Task<IntroducaoDto> UpdateAsync(IntroducaoDto introducao);
        Task<List<IntroducaoDto>> GetAllAsync();
        Task<IntroducaoDto> GetByIdAsync(IntroducaoId id);
        Task<IntroducaoDto> DeleteAsync(IntroducaoId introducaoId);
    }
}