using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SharedValueObjects;
using DDDSample1.Domain.Jogadores;
using System;

namespace DDDSample1.Domain.Ligacoes
{
    public class Ligacao : Entity<LigacaoId>, IAggregateRoot
    {

        public TextoLigacao TextoLigacao { get;  private set; }
        public Estado EstadoLigacao { get;  private set; }
        public bool Active{ get;  private set; }
        public JogadorId Jogador1 { get; private set; }
        public JogadorId Jogador2 { get; private set; }

        private Ligacao()
        {
            this.Active = true;
        }

        public Ligacao(/*string code, */string texto, string estado, JogadorId jogador1, JogadorId jogador2)
        {
            if(jogador1 == null || jogador2 == null){
                throw new BusinessRuleValidationException("It is not possible to create an introduction with a player null.");
            }
            this.Id = new LigacaoId(Guid.NewGuid());
            this.TextoLigacao = new TextoLigacao(texto);
            setEstado(estado);
            this.Jogador1 = jogador1;
            this.Jogador2 = jogador2;
            this.Active = true;
        }

        private void setEstado(string estado)
        {
            try
            {
                Estado enumerado;
                Estado.TryParse(estado, out enumerado);
                this.EstadoLigacao = enumerado;
            }
            catch
            {
                throw new BusinessRuleValidationException("Estado de Pedido de Ligação inválido.");
            }
        }

        public void ChangeTextoLigacao(string texto)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the text to an inactive connection.");
            this.TextoLigacao = new TextoLigacao(texto);
        }

        public void ChangeEstado(string estado)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the state to an inactive connection.");
            setEstado(estado);
        }

        public void ChangeJogador2(JogadorId jog) {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change Jogador2 to an inactive connection.");
            this.Jogador2 = jog;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}