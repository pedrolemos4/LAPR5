using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Perfis;

namespace DDDSample1.Domain.Jogadores
{
    public class JogadorService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IJogadorRepository _repo;

        public JogadorService(IUnitOfWork unitOfWork, IJogadorRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<JogadorDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<JogadorDto> listDto = list.ConvertAll<JogadorDto>( jog => new JogadorDto{Id = jog.Id.AsString(), Pontuacao = jog.Pontuacao, perfilId = jog.perfil.Id, Missao = jog.ListaMissoes, Relacao = jog.ListaRelacoes, Post = jog.ListaPosts});

            return listDto;
        }

        public async Task<JogadorDto> GetByIdAsync(JogadorId id)
        {
            var jog = await this._repo.GetByIdAsync(id);
            
            if(jog == null)
                return null;

            return new JogadorDto{Id = jog.Id.AsString(), Pontuacao = jog.Pontuacao, perfilId = jog.perfil.Id, Post = jog.ListaPosts};
        }

        public async Task<Jogador> AddAsync(Jogador jogador)
        {

            await this._repo.AddAsync(jogador);

            await this._unitOfWork.CommitAsync();

            return jogador;
        }

        public async Task<JogadorDto> GetJogadorByPerfil(Perfil perfil)
        {
            var jogador = await this._repo.GetJogadorByPerfil(perfil);
            
            if(jogador == null)
                return null;

            return new JogadorDto { Id = jogador.Id.AsString(), Pontuacao = jogador.Pontuacao, perfilId = jogador.perfil.Id, Missao = jogador.ListaMissoes, Relacao = jogador.ListaRelacoes, Post = jogador.ListaPosts};
        }

        // public async Task<JogadorDto> AddAsync(JogadorDto dto)
        // {
        //     var jogador = new Jogador(dto.Id, dto.Pontuacao,dto.tags);

        //     await this._repo.AddAsync(jogador);

        //     await this._unitOfWork.CommitAsync();

        //     return new JogadorDto { Id = jogador.Id.AsString(), Pontuacao = jogador.Pontuacao, Tags = jog.Tags };
        // }

        // public async Task<JogadorDto> UpdateAsync(JogadorDto dto)
        // {
        //     var jogador = await this._repo.GetByIdAsync(new JogadorId(dto.Id)); 

        //     if (jogador == null)
        //         return null;   

        //     // change all field
        //     jogador.AddPontuacao(dto.Pontuacao);

        //     await this._unitOfWork.CommitAsync();

        //     return new JogadorDto { Id = jogador.Id.AsString(), Pontuacao = jogador.Pontuacao, Tags = jog.Tags };
        // }

        public async Task<JogadorDto> InactivateAsync(JogadorId id)
        {
            var jogador = await this._repo.GetByIdAsync(id); 

            if (jogador == null)
                return null;   

            // change all fields
            jogador.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new JogadorDto { Id = jogador.Id.AsString(), Pontuacao = jogador.Pontuacao, perfilId = jogador.perfil.Id, Missao = jogador.ListaMissoes, Relacao = jogador.ListaRelacoes, Post = jogador.ListaPosts};
        }

         public async Task<JogadorDto> DeleteAsync(JogadorId id)
        {
            var jogador = await this._repo.GetByIdAsync(id); 

            if (jogador == null)
                return null;   

            if (jogador.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active jogador.");
            
            this._repo.Remove(jogador);
            await this._unitOfWork.CommitAsync();

            return new JogadorDto { Id = jogador.Id.AsString(), Pontuacao = jogador.Pontuacao, perfilId = jogador.perfil.Id, Missao = jogador.ListaMissoes,  Relacao = jogador.ListaRelacoes, Post = jogador.ListaPosts};
        }
    }
}