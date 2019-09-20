using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Products
{
    public class ProductId : TypedIdValueBase
    {
        public ProductId(Guid value) : base(value)
        {
        }
    }
}