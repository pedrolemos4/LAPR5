using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Categories;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Categories
{
    public class CategoryRepository : BaseRepository<Category, CategoryId>, ICategoryRepository
    {
        private readonly DDDSample1DbContext _context;
        public CategoryRepository(DDDSample1DbContext context):base(context.Categories)
        {
           
        }


    }
}