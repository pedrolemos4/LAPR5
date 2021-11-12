using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using System;
using DDDSample1.Domain.Jogadores;

namespace DDDSample1.Domain.Ligacoes
{
    public class LigacaoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILigacaoRepository _repo;

        public LigacaoService(IUnitOfWork unitOfWork, ILigacaoRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<LigacaoDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<LigacaoDto> listDto = list.ConvertAll<LigacaoDto>(lig => new LigacaoDto{Id = lig.Id.AsString(), TextoLigacao = lig.TextoLigacao, Estado = lig.EstadoLigacao, Jogador1 = lig.Jogador1, Jogador2 = lig.Jogador2});

            return listDto;
        }

        public async Task<List<LigacaoDto>> GetLigacaoPendente(JogadorId id){
            var list = await this._repo.GetLigacaoPendente(id);
            
            List<LigacaoDto> listDto = list.ConvertAll<LigacaoDto>(lig => new LigacaoDto{Id = lig.Id.AsString(), TextoLigacao = lig.TextoLigacao, Estado = lig.EstadoLigacao, Jogador1 = lig.Jogador1, Jogador2 = lig.Jogador2});
       
            return listDto;
        }

        public async Task<LigacaoDto> GetByIdAsync(LigacaoId id)
        {
            var lig = await this._repo.GetByIdAsync(id);
            
            if(lig == null)
                return null;

            return new LigacaoDto{Id = lig.Id.AsString(), TextoLigacao = lig.TextoLigacao, Estado = lig.EstadoLigacao, Jogador1 = lig.Jogador1, Jogador2 = lig.Jogador2};
        }

        public async Task<LigacaoDto> AddAsync(CreatingLigacaoDto dto)
        {
            var ligacao = new Ligacao(dto.ligacaoId.AsString(), dto.TextoLigacao.Texto, dto.EstadoLigacao.ToString(), dto.Jogador1, dto.Jogador2);

            await this._repo.AddAsync(ligacao);

            await this._unitOfWork.CommitAsync();

            return new LigacaoDto { Id = ligacao.Id.AsString(), TextoLigacao = ligacao.TextoLigacao, Estado = ligacao.EstadoLigacao, Jogador1 = ligacao.Jogador1, Jogador2 = ligacao.Jogador2 };
        }

        // public async Task<LigacaoDto> UpdateAsync(LigacaoDto dto)
        // {
        //     var ligacao = await this._repo.GetByIdAsync(new LigacaoId(dto.Id)); 

        //     if (ligacao == null)
        //         return null;   

        //     // change all field
        //     ligacao.AddPontuacao(dto.TextoLigacao);
            
        //     await this._unitOfWork.CommitAsync();

        //     return new LigacaoDto { Id = ligacao.Id.AsString(), TextoLigacao = ligacao.TextoLigacao, Estado = lig.Estado };
        // }

        public async Task<LigacaoDto> InactivateAsync(LigacaoId id)
        {
            var ligacao = await this._repo.GetByIdAsync(id); 

            if (ligacao == null)
                return null;   

            // change all fields
            ligacao.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new LigacaoDto { Id = ligacao.Id.AsString(), TextoLigacao = ligacao.TextoLigacao, Estado = ligacao.EstadoLigacao, Jogador1 = ligacao.Jogador1, Jogador2 = ligacao.Jogador2 };
        }

         public async Task<LigacaoDto> DeleteAsync(LigacaoId id)
        {
            var ligacao = await this._repo.GetByIdAsync(id); 

            if (ligacao == null)
                return null;   

            if (ligacao.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active ligacao.");
            
            this._repo.Remove(ligacao);
            await this._unitOfWork.CommitAsync();

            return new LigacaoDto { Id = ligacao.Id.AsString(), TextoLigacao = ligacao.TextoLigacao, Estado = ligacao.EstadoLigacao, Jogador1 = ligacao.Jogador1, Jogador2 = ligacao.Jogador2 };
        }
    }
}