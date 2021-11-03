using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.SharedValueObjects
{
    public class Tag : IValueObject
    {

        public string Tag { get;  private set; }

        public bool Active{ get;  private set; }

        private Tag()
        {
            this.Active = true;
        }

        public Tag(string tag)
        {
            this.Tag = tag;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}