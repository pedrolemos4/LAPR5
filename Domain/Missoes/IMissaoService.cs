using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Domain.Missoes
{
    public interface IMissaoService {
        Task<List<MissaoDto>> GetAllAsync();
        Task<MissaoDto> GetByIdAsync(MissaoId id);
        Task<MissaoDto> AddAsync(CreatingMissaoDto missao);
        Task<MissaoDto> DeleteAsync(MissaoId missaoId);
    }
}