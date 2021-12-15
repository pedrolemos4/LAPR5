using DDDSample1.Domain.Shared;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Perfis
{
    [Owned]
    public class Cidade : IValueObject
    {
        public string City { get; private set; }

        public bool Active { get; private set; }

        private Cidade(){
            this.Active = true;
        }
        public Cidade(string cidade)
        {
            setCidade(cidade);
            this.Active = true;
        }
        private void setCidade(string cidade)
        {
            //this.City = cidade;
            if(cidade.All(c => char.IsLetterOrDigit(c))){
                this.City = cidade;
            }else{
                throw new BusinessRuleValidationException("Invalid information, has to be alphanumeric.");
            }
        }

    }
}