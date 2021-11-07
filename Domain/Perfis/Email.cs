using DDDSample1.Domain.Shared;
using System.Net.Mail;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Perfis
{
    [Owned]
    public class Email : IValueObject
    {

        public string EnderecoEmail { get; private set; }

        public bool Active { get; private set; }

        private Email()
        {
            this.Active = true;
        }

        public Email(string email)
        {
            setEmail(email);
            this.Active = true;
        }

        private void setEmail(string email)
        {
            try
            {
                MailAddress endereco = new MailAddress(email);
                this.EnderecoEmail = endereco.ToString();
            }
            catch
            {
                throw new BusinessRuleValidationException("Email it is incorrect.");
            }
        }


        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}