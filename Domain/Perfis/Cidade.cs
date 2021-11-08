using DDDSample1.Domain.Shared;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Perfis
{
    [Owned]
    public class Cidade : IValueObject
    {
        public string cidade { get; private set; }

        public bool Active { get; private set; }

        public Cidade(string cidade)
        {
            setCidade(cidade);
            this.Active = true;
        }
        private void setCidade(string cidade)
        {
            if(cidade.Any(char.IsLetterOrDigit)){
                this.cidade = cidade;
            }else{
                throw new BusinessRuleValidationException("Invalid information, has to be alphanumeric.");
            }
        }

    }
}