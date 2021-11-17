using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.SharedValueObjects;
using System;

namespace DDDSample1.Domain.Introducoes
{
    public class Introducao : Entity<IntroducaoId>, IAggregateRoot
    {
        public Jogador JogadorInicial { get;  private set; }

        public Jogador JogadorIntrodutor { get;  private set; }

        public Jogador JogadorObjetivo { get;  private set; }

        public Estado EstadoIntroducao { get;  private set; }

        public bool Active{ get;  private set; }

        private Introducao()
        {
            this.Active = true;
        }

        public Introducao(Jogador jog_inicial, Jogador jog_introdutor, Jogador jog_objetivo, string estado)
        {
            if(jog_inicial == null || jog_introdutor == null || jog_objetivo == null){
                throw new BusinessRuleValidationException("It is not possible to create an introduction with a player null.");
            }
            this.Id = new IntroducaoId(Guid.NewGuid());
            this.JogadorInicial = jog_inicial;
            this.JogadorIntrodutor = jog_introdutor;
            this.JogadorObjetivo = jog_objetivo;
            setEstado(estado);
            this.Active = true;
        }

        public void ChangeEstado(string estado)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive family.");
            setEstado(estado);
        }

        private void setEstado(string estado)
        {
            try
            {
                Estado enumerado;
                Estado.TryParse(estado, out enumerado);
                this.EstadoIntroducao = enumerado;
            }
            catch
            {
                throw new BusinessRuleValidationException("Estado de Pedido de Introdução inválido.");
            }
        }

        public void ChangeJogadorIntrodutor(Jogador jog)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the jogadorIntrodutor to an inactive introducao.");
            this.JogadorIntrodutor = jog;
        }

        public void ChangeJogadorObjetivo(Jogador jog)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the jogadorObjetivo to an inactive introducao.");
            this.JogadorObjetivo = jog;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}