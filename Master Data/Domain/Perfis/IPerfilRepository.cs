using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;

namespace DDDSample1.Domain.Perfis
{
    public interface IPerfilRepository : IRepository<Perfil, PerfilId>
    {
        Task<Perfil> GetPerfilByEmailPassword(string email, string password);
        Task<Perfil> getPerfilByNome(string nome);
        Task<Perfil> GetPerfilByEmail(string email);
        Task<List<Perfil>> GetPerfilByPais(string pais);
    }
}