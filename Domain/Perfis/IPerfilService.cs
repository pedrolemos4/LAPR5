using System.Collections.Generic;
using System.Threading.Tasks;

namespace DDDSample1.Domain.Perfis
{
    public interface IPerfilService {
        Task<PerfilDto> getPerfilByNome(string nome);
        Task<PerfilDto> GetPerfilByEmail(string email);
        Task<List<PerfilDto>> GetPerfilByPais(string pais);
        Task<PerfilDto> AddAsync(CreatingPerfilDto perfilDto);
        Task<PerfilDto> GetByIdAsync(PerfilId perfilId);
        Task<PerfilDto> PatchEstadoHumor(PerfilDto dto);
    }
}