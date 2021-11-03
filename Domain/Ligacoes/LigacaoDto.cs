using System;


namespace DDDSample1.Domain.Ligacoes
{
    public class LigacaoDto
    {
        public String Id { get; set; }

        public TextoLigacao TextoLigacao { get; set; }

        public Estado Estado { get; set; }
    }
}