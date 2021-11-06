using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Missoes
{
    public class Dificuldade : IValueObject
    {

        public string GrauDificuldade { get;  private set; }

        public bool Active{ get;  private set; }

        private Dificuldade()
        {
            this.Active = true;
        }

        public Dificuldade(string dificuldade)
        {
            this.GrauDificuldade = dificuldade;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}