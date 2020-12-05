using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Families;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Families
{
    public class FamilyRepository : BaseRepository<Family, FamilyId>, IFamilyRepository
    {
      
        public FamilyRepository(DDDSample1DbContext context):base(context.Families)
        {
            
        }

    }
}