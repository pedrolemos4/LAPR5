using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Ligacoes
{
    public class TextoLigacao : IValueObject
    {

        public string Texto { get;  private set; }

        public bool Active{ get;  private set; }

        private TextoLigacao()
        {
            this.Texto = "";
            this.Active = true;
        }

        public TextoLigacao(string texto)
        {
            this.Texto = texto;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}