using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Categories;
using DDDSample1.Domain.Products;

namespace DDDSample1.Infrastructure.Products
{
    public class ProductRepository : IProductRepository
    {
        private readonly DDDSample1DbContext _context;
        public ProductRepository(DDDSample1DbContext context)
        {
            this._context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<List<Product>> GetAllAsync()
        {
            return await this._context.Products.ToListAsync();
        }
        public async Task<Product> GetByIdAsync(ProductId id)
        {
            return await this._context
                .Products
                .Where(x => id.Equals(x.Id)).FirstOrDefaultAsync();
        }
        public async Task<List<Product>> GetByIdsAsync(List<ProductId> ids)
        {
            return await this._context
                .Products
                .Where(x => ids.Contains(x.Id)).ToListAsync();
        }
        public async Task<Product> AddAsync(Product product)
        {
            var ret = await this._context.Products.AddAsync(product);
            return ret.Entity;
        }

        public void Remove(Product product)
        {
            this._context.Products.Remove(product);
        }
    }
}