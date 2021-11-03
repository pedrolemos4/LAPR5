using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Jogadores
{
    public class JogadorId : EntityId
    {

        public JogadorId(String value):base(value)
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