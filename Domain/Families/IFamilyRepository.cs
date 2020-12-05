using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;


namespace DDDSample1.Domain.Families
{
    public interface IFamilyRepository:IRepository<Family,FamilyId>
    {

    }
}