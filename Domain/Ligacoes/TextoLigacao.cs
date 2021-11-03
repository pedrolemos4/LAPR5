using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Ligacoes
{
    public class TextoLigacao : IValueObject
    {

        public string TextoLigacao { get;  private set; }

        public bool Active{ get;  private set; }

        private TextoLigacao()
        {
            this.TextoLigacao = "";
            this.Active = true;
        }

        public TextoLigacao(string texto)
        {
            this.TextoLigacao = texto;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}