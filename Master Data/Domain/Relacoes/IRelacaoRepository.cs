using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Jogadores;
using System.Collections.Generic;

namespace DDDSample1.Domain.Relacoes
{
    public interface IRelacaoRepository : IRepository<Relacao, RelacaoId>
    {
        Task<List<Relacao>> GetRelacoesDoJogador(JogadorId jog);
        Task<Relacao> GetRelacaoComDoisIds(JogadorId jogadorId1, JogadorId jogadorId2);
    }
}