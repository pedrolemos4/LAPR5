using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SharedValueObjects;
using DDDSample1.Domain.Perfis;

namespace DDDSample1.Domain.Jogadores
{
    public class Jogador : Entity<JogadorId>, IAggregateRoot
    {

        public Pontuacao Pontuacao { get; private set; }

        public bool Active { get; private set; }

        public Perfil perfil { get; private set; }

        private Jogador()
        {
            // this.Pontuacao = new Pontuacao();
            // this.Tags = new Tag();
            // this.Active = true;
        }

        public Jogador(string code, int pontuacao, string tags)
        {
            this.Id = new JogadorId(code);
            this.Pontuacao = new Pontuacao(pontuacao);
            this.Active = true;
        }

        public Jogador(string code, int pontuacao, string tags,
        string code, string nome, string email, int telefone, List<string> tag, string data, string estado, string password, string perfilFB, string perfilLI)
        {
            this.Id = new JogadorId(code);
            this.Pontuacao = new Pontuacao(pontuacao);
            this.Active = true;
            this.perfil = new Perfil(code, nome, email, telefone, tag, data, estado, password, perfilFB, perfilLI);
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
    }
}