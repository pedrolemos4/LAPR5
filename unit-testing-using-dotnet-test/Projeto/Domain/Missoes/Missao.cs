using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Jogadores;
using System;

namespace DDDSample1.Domain.Missoes
{
    public class Missao : Entity<MissaoId>, IAggregateRoot
    {

        public Dificuldade Dificuldade { get;  private set; }

        public Data Data { get;  private set; }

        public Jogador JogadorObjetivo { get;  private set; }

        public bool Active{ get;  private set; }

        private Missao()
        {
            this.Active = true;
        }

        public Missao(int dificuldade, string data, Jogador jog)
        {
            if(jog == null){
                throw new BusinessRuleValidationException("It is not possible to change the mission without a player.");
            }
            this.Id = new MissaoId(Guid.NewGuid());
            this.Dificuldade = new Dificuldade(dificuldade);
            this.Data = new Data(data);
            this.JogadorObjetivo = jog;
            this.Active = true;
        }

        public void ChangeDificuldade(int dificuldade)
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

        public void ChangeObjetivo(Jogador jogador_objetivo)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the objective to an inactive mission.");
            this.JogadorObjetivo = jogador_objetivo;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}