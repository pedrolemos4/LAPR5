using DDDSample1.Domain.Shared;
using System;
using System.Linq;

namespace DDDSample1.Domain.Perfis
{
    public class Password : IValueObject
    {
        public string password { get; private set; }

        public bool Active { get; private set; }

        public Password(string password)
        {
            setPassword(password);
            this.Active = true;
        }
        private void setPassword(string password)
        {
            char[] special = { '@', '#', '$', '%', '^', '&', '+', '=' };
            if (password.Length > 7 && password.Any(char.IsUpper) && password.IndexOfAny(special) != -1)
            {
                this.password = password;
            }
            else
            {
                throw new BusinessRuleValidationException("Password it´s not correct according to the rules.");
            }
        }

    }
}