using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Domain.Perfis
{
    public interface IPerfilService
    {
        Task<PerfilDto> getPerfilByNome(string nome);
        Task<PerfilDto> GetPerfilByEmail(string email);
        Task<List<PerfilDto>> GetPerfilByPais(string pais);
        Task<PerfilDto> AddAsync(CreatingPerfilDto perfilDto);
        Task<PerfilDto> GetByIdAsync(PerfilId perfilId);
        Task<PerfilDto> PatchEstadoHumor(PerfilDto dto);
        Task<List<PerfilDto>> GetAllAsync();
        Task<PerfilDto> UpdateAsync(PerfilDto perfil);

        Task<PerfilDto> DeleteAsync(PerfilId ligacaoId);

    }
}