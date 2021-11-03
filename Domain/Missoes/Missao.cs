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

        public Missao(string code, Dificuldade dificuldade, Data data)
        {
            this.Id = new MissaoId(code);
            this.Dificuldade = dificuldade;
            this.Data = data;
            this.Active = true;
        }

        public void ChangeDificuldade(Dificuldade dificuldade)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the dificulty to an inactive mission.");
            this.Dificuldade = dificuldade;
        }

        public void ChangeData(Data data)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the date to an inactive mission.");
            this.Data = data;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}