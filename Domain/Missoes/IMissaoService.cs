using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Domain.Missoes
{
    public interface IMissaoService
    {
        Task<List<MissaoDto>> GetAllAsync();
    }
}