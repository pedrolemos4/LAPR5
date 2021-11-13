using DDDSample1.Domain.SharedValueObjects;
using DDDSample1.Domain.Jogadores;

namespace DDDSample1.Domain.Ligacoes
{
    public class CreatingLigacaoDto
    {

        public LigacaoId ligacaoId { get; private set; } 
        public TextoLigacao TextoLigacao { get;  private set; }
        public Estado EstadoLigacao { get;  private set; }
        public bool Active{ get;  private set; }
        public Jogador Jogador1 { get; private set; }

        public Jogador Jogador2 { get; private set; }

        public CreatingLigacaoDto(string code, string texto, string estado, Jogador jogador1, Jogador jogador2)
        {
            this.ligacaoId = new LigacaoId(code);
            this.TextoLigacao = new TextoLigacao(texto);
            setEstado(estado);
            this.Jogador1 = jogador1;
            this.Jogador2 = jogador2;
            this.Active = true;
        }

        private void setEstado(string estado)
        {
            Estado enumerado;
            Estado.TryParse(estado, out enumerado);
            this.EstadoLigacao = enumerado;
        }

    }
}