using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Domain.Jogadores;

namespace DDDSample1.Domain.Ligacoes
{
    public interface ILigacaoService
    {
        Task<LigacaoDto> AddAsync(CreatingLigacaoDto ligacaoDto);
        Task<List<LigacaoDto>> GetAllAsync();

        Task<List<LigacaoDto>> GetLigacaoPendente(JogadorId id);
    }
}