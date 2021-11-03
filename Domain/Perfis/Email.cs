using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Perfis
{
    public class Email : IValueObject
    {

        public string Email { get;  private set; }

        public bool Active{ get;  private set; }

        private Email()
        {
            this.Active = true;
        }

        public Email(string email)
        {
            this.Email = email;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}