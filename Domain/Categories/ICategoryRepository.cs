using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DDDSample1.Domain.Categories
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllAsync();
        Task<Category> GetByIdAsync(CategoryId id);
        Task<List<Category>> GetByIdsAsync(List<CategoryId> ids);
        Task<Category> AddAsync(Category category);
        void Remove(Category category);
    }
}