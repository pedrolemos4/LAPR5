using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Missoes
{
    public class Missao : Entity<MissaoId>, IAggregateRoot
    {

        public Dificuldade Dificuldade { get;  private set; }

        public Data Data { get;  private set; }

        public bool Active{ get;  private set; }

        private Missao()
        {
            this.Active = true;
        }

        public Missao(string code, string dificuldade, string data)
        {
            this.Id = new MissaoId(code);
            this.Dificuldade = new Dificuldade(dificuldade);
            this.Data = new Data(data);
            this.Active = true;
        }

        public void ChangeDificuldade(string dificuldade)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the dificulty to an inactive mission.");
            this.Dificuldade = new Dificuldade(dificuldade);
        }

        public void ChangeData(string data)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the date to an inactive mission.");
            this.Data = new Data(data);
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}