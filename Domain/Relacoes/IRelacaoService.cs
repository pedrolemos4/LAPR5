using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Jogadores;

namespace DDDSample1.Domain.Relacoes
{
    public interface IRelacaoService
    {
        Task<List<RelacaoDto>> GetRelacoesDoJogador(Jogador jog);
    }
}