using DDDSample1.Domain.Perfis;

namespace DDDSample1.Domain.Jogadores
{

    public class CreatingJogadorDto
    {
        public Perfil perfil { get; set; }

        public CreatingJogadorDto(Perfil perfil)
        {
            this.perfil = perfil;
        }
    }
}