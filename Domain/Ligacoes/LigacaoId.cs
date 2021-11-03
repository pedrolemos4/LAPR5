using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Ligacoes
{
    public class LigacaoId : EntityId
    {

        public LigacaoId(String value):base(value)
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