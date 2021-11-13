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

            /*DateTime bdate = Convert.ToDateTime(data);

            DateTime dateOut;
            if (!DateTime.TryParse(data, out dateOut))
            {
                throw new BusinessRuleValidationException("Date it is incorrect." + dateOut);
            }
            else
            {
                if (dateOut.Year >= 16)
                {*/
            string[] p = data.Split("/");

            DateTime date = new DateTime(Int32.Parse(p[0]), Int32.Parse(p[1]), Int32.Parse(p[2]));
            if (2021 - date.Year >= 16)
            {
                this.DataNasc = Convert.ToDateTime(data);
            }
            else
            {
                throw new BusinessRuleValidationException("Date it is incorrect.");
            }
            //}
            //}

        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}