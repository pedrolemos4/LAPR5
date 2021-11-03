using System;


namespace DDDSample1.Domain.Missoes
{
    public class MissaoDto
    {
        public String Id { get; set; }

        public Dificuldade Dificuldade { get; set; }

        public Data Data { get; set; }
    }
}