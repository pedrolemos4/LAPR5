using DDDSample1.Domain.Shared;
using System;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Perfis
{
    [Owned]
    public class DataNascimento : IValueObject
    {

        public DateTime DataNasc { get; private set; }

        public bool Active { get; private set; }

        private DataNascimento()
        {
            this.Active = true;
        }

        public DataNascimento(string data)
        {
            setDataNascimento(data);
            this.Active = true;
        }

        private void setDataNascimento(string data)
        {
            DateTime dateOut;
            if (!DateTime.TryParse(data, out dateOut))
            {
                throw new BusinessRuleValidationException("Date it is incorrect.");
            }
            else
            {
                if (dateOut.Year >= 16)
                {
                    this.DataNasc = dateOut;
                }
            }

        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}