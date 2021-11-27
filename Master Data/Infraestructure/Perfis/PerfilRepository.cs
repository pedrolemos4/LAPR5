using System.Threading.Tasks;
using DDDSample1.Domain.Perfis;
using DDDSample1.Infrastructure.Shared;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace DDDSample1.Infrastructure.Perfis
{
    public class PerfilRepository : BaseRepository<Perfil, PerfilId>, IPerfilRepository
    {

        private readonly DDDSample1DbContext _context;
    
        public PerfilRepository(DDDSample1DbContext context):base(context.Perfis)
        {
           _context = context;
        }

        public async Task<Perfil> GetPerfilByEmailPassword(string email, string password){
            return await this._context.Perfis.Where(x => (email.Equals(x.email.EnderecoEmail)&& password.Equals(x.password.password))).FirstOrDefaultAsync();
        }

        public async Task<Perfil> GetPerfilByEmail(string email)
        {
            return await this._context.Perfis.Where(x => email.Equals(x.email.EnderecoEmail)).FirstOrDefaultAsync();
        }

        public async Task<Perfil> getPerfilByNome(string nome){
            return await this._context.Perfis.Where(x => nome.Equals(x.nome.Name)).FirstOrDefaultAsync();
        }

        public async Task<List<Perfil>> GetPerfilByPais(string pais)
        {
            return await this._context.Perfis.Where(x => pais.Equals(x.pais.Country)).ToListAsync();
        }
    }
}