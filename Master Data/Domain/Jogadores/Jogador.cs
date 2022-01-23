using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Perfis;
using System.Collections.Generic;
using DDDSample1.Domain.Relacoes;
using System;

namespace DDDSample1.Domain.Jogadores
{
    public class Jogador : Entity<JogadorId>, IAggregateRoot
    {

        public Pontuacao Pontuacao { get; private set; }

        public bool Active { get; private set; }

        public PerfilId Perfil { get; private set; }

        private Jogador()
        {
            // this.Pontuacao = new Pontuacao();
            // this.Tags = new Tag();
            // this.Active = true;
        }

        public Jogador(string code, int pontuacao)
        {
            this.Id = new JogadorId(Guid.NewGuid());
            this.Pontuacao = new Pontuacao(pontuacao);
            this.Active = true;
        }

        public Jogador(PerfilId perfil) {
            if(perfil == null){
                throw new BusinessRuleValidationException("It is not possible to create a player without his profile.");
            }
            this.Id = new JogadorId(Guid.NewGuid());
            this.Pontuacao = new Pontuacao(0);
            this.Active = true;
            this.Perfil = perfil;
        }

        public void ChangePontuacao(int pontos)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to add more points to an inactive player.");
            this.Pontuacao = new Pontuacao(pontos);
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }

        public void toString(){
             Console.WriteLine("Id: " + this.Id.AsGuid() + "\nIdPerfil: " + this.Perfil.AsGuid());
        }
    }
}