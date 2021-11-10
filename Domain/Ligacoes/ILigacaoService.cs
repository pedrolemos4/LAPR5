using System.Threading.Tasks;

namespace DDDSample1.Domain.Ligacoes
{
    public interface ILigacaoService
    {
        Task<LigacaoDto> AddAsync(CreatingLigacaoDto ligacaoDto);
    }
}