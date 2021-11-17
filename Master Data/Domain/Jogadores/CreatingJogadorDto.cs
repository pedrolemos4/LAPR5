using System;

namespace DDDSample1.Domain.Jogadores
{

    public class CreatingJogadorDto
    {
        public Guid perfilId { get; set; }

        public CreatingJogadorDto(Guid perfil)
        {
            this.perfilId = perfil;
        }
    }
}