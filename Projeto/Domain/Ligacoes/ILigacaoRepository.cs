using DDDSample1.Domain.Shared;
using System.Collections.Generic;
using DDDSample1.Domain.Jogadores;
using System.Threading.Tasks;


namespace DDDSample1.Domain.Ligacoes
{
    public interface ILigacaoRepository : IRepository<Ligacao, LigacaoId>
    {
        Task<List<Ligacao>> GetLigacaoPendente(JogadorId id);
    }
}