using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Perfis
{
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
            this.Name = setNome(nome);
            this.Active = true;
        }

        private void setNome(string nome)
        {
            if (char.IsWhiteSpace(nome, 0))
            {//Verificar
                throw new BusinessRuleValidationException("Name does not have the correct syntax.");
            }
            else
            {
                this.Name = nome;
            }
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}