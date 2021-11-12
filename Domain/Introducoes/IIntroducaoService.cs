using System.Threading.Tasks;
using DDDSample1.Domain.Jogadores;
using System.Collections.Generic;


namespace DDDSample1.Domain.Introducoes
{
    public interface IIntroducaoService
    {
        Task<IntroducaoDto> AddAsync(Introducao intro);
        Task<IntroducaoDto> PatchEstadoIntroducao(IntroducaoDto dto);
        Task<List<IntroducaoDto>> GetIntroducoesPorAprovar(JogadorId idJog);

    }
}