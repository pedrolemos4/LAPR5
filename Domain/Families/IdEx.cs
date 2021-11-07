using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SharedValueObjects;
using Microsoft.EntityFrameworkCore;


namespace DDDSample1.Domain.Families
{
    [Owned]
    public class IdEx : IValueObject{

        string id;
        public IdEx(String value){

        }

        protected  Object createFromString(String text){
            return this.id = text;
        }

        
    }
}