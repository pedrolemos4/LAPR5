using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Introducoes
{
    [Owned]
    public class TextoIntroducao : IValueObject
    {
        public string Texto { get; private set; }

        public bool Active { get; private set; }

        private TextoIntroducao() { }
        
        public TextoIntroducao(string texto)
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