using DDDSample1.Domain.Shared;
using System;
using System.Linq;

namespace DDDSample1.Domain.Perfis
{
    public class Password : IValueObject
    {
        private string password { get; private set;}

        public Password(string password)
        {
            setPassword(password);
        }
        private void password(string password)
        {
            if (password.Length > 7 && password.Any(char.IsUpper) && password.Any(!char.IsLetterOrDigit && char.IsWhiteSpace))
            {
                this.password = password;
            }
        }

    }
}