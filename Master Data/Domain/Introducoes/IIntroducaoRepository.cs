using DDDSample1.Domain.Shared;
using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Jogadores;


namespace DDDSample1.Domain.Introducoes
{
    public interface IIntroducaoRepository:IRepository<Introducao,IntroducaoId>
    {
         Task<List<Introducao>> GetIntroducoesPorAprovar(JogadorId idJog);
    }
}