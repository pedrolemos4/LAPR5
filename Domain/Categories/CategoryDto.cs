using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Categories
{
    public class CategoryDto
    {
        public Guid Id { get; set; }

        public string Description { get; set; }
    }
}