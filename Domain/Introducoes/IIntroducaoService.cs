using System.Threading.Tasks;

namespace DDDSample1.Domain.Introducoes
{
    public interface IIntroducaoService {
        Task<IntroducaoDto> AddAsync(Introducao intro);

        Task<IntroducaoDto> PatchEstadoIntroducao(IntroducaoDto dto);
    }
}