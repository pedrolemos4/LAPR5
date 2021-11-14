using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;
namespace DDDSample1.Domain.Missoes
{
    [Owned]
    public class Dificuldade : IValueObject
    {

        public int GrauDificuldade { get;  private set; }

        public bool Active{ get;  private set; }

        private Dificuldade()
        {
            this.Active = true;
        }

        public Dificuldade(int dificuldade)
        {
            if(dificuldade <= 0){
                throw new BusinessRuleValidationException("It is not possible to create a negative difficulty.");
            }
            this.GrauDificuldade = dificuldade;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}