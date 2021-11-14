using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Perfis;
using System.Collections.Generic;
using DDDSample1.Domain.Missoes;
using DDDSample1.Domain.Relacoes;
using DDDSample1.Domain.Posts;
using System;

namespace DDDSample1.Domain.Jogadores
{
    public class Jogador : Entity<JogadorId>, IAggregateRoot
    {

        public Pontuacao Pontuacao { get; private set; }

        public bool Active { get; private set; }

        public List<Missao> ListaMissoes { get; private set; }

        public Perfil perfil { get; private set; }

        public HashSet<Relacao> ListaRelacoes { get; private set; }

        public List<Post> ListaPosts { get; private set; }

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
            this.ListaMissoes = new List<Missao>();
            this.ListaRelacoes = new HashSet<Relacao>();
            this.ListaPosts = new List<Post>();
            this.Active = true;
        }

        public Jogador(Perfil perfil)
        {
            //this.Id = new JogadorId(code);
            this.Id = new JogadorId(Guid.NewGuid());
            this.Pontuacao = new Pontuacao(0);
            this.ListaMissoes = new List<Missao>();
            this.ListaRelacoes = new HashSet<Relacao>();
            this.ListaPosts = new List<Post>();
            this.Active = true;
            this.perfil = perfil;
        }

        private void adicionaMissao(Missao missao)
        {
            this.ListaMissoes.Add(missao);
        }

        private void adicionaRelacao(Relacao relacao)
        {
            this.ListaRelacoes.Add(relacao);
        }

        private void adicionaPost(Post post)
        {
            this.ListaPosts.Add(post);
        }


        public void ChangePontuacao(int pontos)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to add more points to an inactive player.");
            this.Pontuacao = new Pontuacao(pontos);
        }

        public void ChangePerfil(Perfil perfil)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to add more points to an inactive player.");
            this.perfil = perfil;
        }

        public void ChangeMissoes(List<Missao> missoes)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to add more points to an inactive player.");
            this.ListaMissoes = missoes;
        }

        public void ChangeRelacoes(HashSet<Relacao> relacoes)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to add more points to an inactive player.");
            this.ListaRelacoes = relacoes;
        }

        public void ChangePosts(List<Post> posts)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to add more points to an inactive player.");
            this.ListaPosts = posts;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}