using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Domain.Posts
{
    public interface IPostService
    {
        Task<List<PostDto>> GetAllAsync();
        Task<PostDto> GetByIdAsync(PostId id);
    }
}