using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Categories;

namespace DDDSample1.Infrastructure.Categories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DDDSample1DbContext _context;
        public CategoryRepository(DDDSample1DbContext context)
        {
            this._context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<List<Category>> GetAllAsync()
        {
            return await this._context.Categories.ToListAsync();
        }
        
        public async Task<Category> GetByIdAsync(CategoryId id)
        {
            //return await this._context.Categories.FindAsync(id);
            return await this._context
                .Categories
                .Where(x => id.Equals(x.Id)).FirstOrDefaultAsync();
        }
        public async Task<List<Category>> GetByIdsAsync(List<CategoryId> ids)
        {
            return await this._context
                .Categories
                .Where(x => ids.Contains(x.Id)).ToListAsync();
        }
        public async Task<Category> AddAsync(Category category)
        {
            var ret = await this._context.Categories.AddAsync(category);
            return ret.Entity;
        }

        public void Remove(Category category)
        {
            this._context.Categories.Remove(category);
        }
    }
}