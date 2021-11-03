using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Missoes
{
    public class MissaoId : EntityId
    {

        public MissaoId(String value):base(value)
        {

        }

        override
        protected  Object createFromString(String text){
            return text;
        }
        override
        public String AsString(){
            return (String) base.Value;
        }
    }
}