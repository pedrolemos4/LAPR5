using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.SharedValueObjects;
using System;

namespace DDDSample1.Domain.Introducoes
{
    public class Introducao : Entity<IntroducaoId>, IAggregateRoot
    {
        public JogadorId JogadorInicial { get; private set; }

        public JogadorId JogadorIntrodutor { get; private set; }

        public JogadorId JogadorObjetivo { get; private set; }

        public Estado EstadoIntroducao { get; private set; }

        public TextoIntroducao TextoIntroducao { get; private set; }

        public bool Active { get; private set; }

        private Introducao()
        {
            this.Active = true;
        }

        public Introducao(JogadorId jog_inicial, JogadorId jog_introdutor, JogadorId jog_objetivo, string estado, string texto)
        {
            if (jog_inicial == null || jog_introdutor == null || jog_objetivo == null)
            {
                throw new BusinessRuleValidationException("It is not possible to create an introduction with a player null.");
            }
            this.Id = new IntroducaoId(Guid.NewGuid());
            this.JogadorInicial = jog_inicial;
            this.JogadorIntrodutor = jog_introdutor;
            this.JogadorObjetivo = jog_objetivo;
            setEstado(estado);
            this.TextoIntroducao = new TextoIntroducao(texto);
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

        public void ChangeJogadorIntrodutor(JogadorId jog)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the jogadorIntrodutor to an inactive introducao.");
            this.JogadorIntrodutor = jog;
        }

        public void ChangeJogadorObjetivo(JogadorId jog)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the jogadorObjetivo to an inactive introducao.");
            this.JogadorObjetivo = jog;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }

        public void ChangeTextoIntroducao(string textoIntroducao){
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the textoIntroducao to an inactive introducao.");
            this.TextoIntroducao = new TextoIntroducao(textoIntroducao);
        }
    }
}