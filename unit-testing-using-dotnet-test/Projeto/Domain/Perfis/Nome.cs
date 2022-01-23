using System;
using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;
namespace DDDSample1.Domain.Perfis
{
    [Owned]
    public class Nome : IValueObject
    {

        public string Name { get; private set; }

        public bool Active { get; private set; }

        private Nome()
        {
            this.Active = true;
        }

        public Nome(string nome)
        {
            setNome(nome);
            this.Active = true;
        }

        private void setNome(string nome)
        {
            if (nome.Length == 0)
            {
                this.Name = nome;
            }
            else if (char.IsWhiteSpace(nome, 0))
            {//Verificar
                throw new BusinessRuleValidationException("Nome não pode começar com espaço em branco.");
            } else {
                this.Name = nome;
            }

        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}