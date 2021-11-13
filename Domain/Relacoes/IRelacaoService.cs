using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Jogadores;

namespace DDDSample1.Domain.Relacoes
{
    public interface IRelacaoService
    {
        Task<List<RelacaoDto>> GetRelacoesDoJogador(JogadorId jog);
        Task<RelacaoDto> PatchRelacaoTagsForca(RelacaoDto dto);
        Task<RelacaoDto> GetByIdAsync(RelacaoId id);
        Task<RelacaoDto> DeleteAsync(RelacaoId id);
        Task<RelacaoDto> UpdateAsync(RelacaoDto dto);
        Task<List<RelacaoDto>> ToListAsync();
        Task<List<RelacaoDto>> GetRedeJogador(JogadorId id, int n);
        Task<RelacaoDto> AddAsync(CreatingRelacaoDto relacaoDto);
    }
}