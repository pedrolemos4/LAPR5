using DDDSample1.Domain.Shared;
using System;

namespace DDDSample1.Domain.Perfis
{
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
            if(!DateTime.TryParse(data, out dateOut)){
                throw new BusinessRuleValidationException("Date it is incorrect.");
            }else{
                this.DataNasc = dateOut; // Verificar
            }
           
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}