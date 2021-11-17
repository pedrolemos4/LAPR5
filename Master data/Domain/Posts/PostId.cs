using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Posts
{
    public class PostId : EntityId
    {

        public PostId(Guid value):base(value)
        {

        }

        public PostId(String value):base(value)
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

        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}