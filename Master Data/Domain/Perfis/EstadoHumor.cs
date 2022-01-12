using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Shared;


namespace DDDSample1.Domain.Perfis
{
    [Owned]
    public class EstadoHumor : IValueObject
    {
        public string Estado { get; private set; }

        public decimal Valor { get; private set; }

        public bool Active { get; private set; }

        private EstadoHumor()
        {
            this.Active = true;
        }

        public EstadoHumor(string estado, decimal valor)
        {
            setEstadoHumor(estado);
            setValor(valor);
            this.Active = true;
        }
        private void setEstadoHumor(string estado)
        {
            List<string> lista = new List<string>() {"Joyful", "Distressed", "Hopeful", "Fearful", "Relieve", "Disappointed", "Proud", "Remorseful",
            "Grateful", "Angry"};
            if (lista.Contains(estado))
            {
                this.Estado = estado;
            }
            else
            {
                throw new BusinessRuleValidationException("Invalid emotional state.");
            }
        }

        private void setValor(decimal valor){
            if(valor >= 0.0m && valor <= 1.0m){
                this.Valor = valor;
            } else {
                throw new BusinessRuleValidationException("Valor do estado tem que estar no intervalo [0;1].");
            }
        }

    }
}