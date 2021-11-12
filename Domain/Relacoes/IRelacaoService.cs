using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Jogadores;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Domain.Relacoes
{
    public interface IRelacaoService
    {
        Task<List<RelacaoDto>> GetRelacoesDoJogador(Jogador jog);
        Task<RelacaoDto> PatchRelacaoTagsForca(RelacaoDto dto);
        Task<List<RelacaoDto>> ToListAsync();
    }
}