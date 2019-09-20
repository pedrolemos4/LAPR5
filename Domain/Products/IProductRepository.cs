using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DDDSample1.Domain.Products
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllAsync();
        Task<Product> GetByIdAsync(ProductId id);
        Task<List<Product>> GetByIdsAsync(List<ProductId> ids);
        Task<Product> AddAsync(Product product);
        void Remove(Product product);
    }
}