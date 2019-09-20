using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Categories
{
    public class CategoryId : TypedIdValueBase
    {
        public CategoryId(Guid value) : base(value)
        {
        }
    }
}