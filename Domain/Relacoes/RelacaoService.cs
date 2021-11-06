using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Relacoes
{
    public class RelacaoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRelacaoRepository _repo;

        public RelacaoService(IUnitOfWork unitOfWork, IRelacaoRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        // public async Task<List<RelacaoDto>> GetAllAsync()
        // {
        //     var list = await this._repo.GetAllAsync();
            
        //     List<RelacaoDto> listDto = list.ConvertAll<RelacaoDto>(async relacao => new RelacaoDto{Id = relacao.Id.AsString(), Tags = relacao.Tags, ForcaRelacao = relacao.ForcaRelacao, ForcaLigacao = relacao.ForcaLigacao});

        //     return listDto;
        // }

        public async Task<RelacaoDto> GetByIdAsync(RelacaoId id)
        {
            var relacao = await this._repo.GetByIdAsync(id);
            
            if(relacao == null)
                return null;

            return new RelacaoDto{Id = relacao.Id.AsString(), Tags = relacao.Tags, ForcaRelacao = relacao.ForcaRelacao, ForcaLigacao = relacao.ForcaLigacao};
        }

        // public async Task<RelacaoDto> AddAsync(RelacaoDto dto)
        // {
        //     var relacao = new Relacao(dto.Id, dto.Tags);

        //     await this._repo.AddAsync(relacao);

        //     await this._unitOfWork.CommitAsync();

        //     return new RelacaoDto { Id = relacao.Id.AsString(), Tags = relacao.Tags, ForcaRelacao = relacao.ForcaRelacao, ForcaLigacao = relacao.ForcaLigacao };
        // }

        // public async Task<RelacaoDto> UpdateAsync(RelacaoDto dto)
        // {
        //     var relacao = await this._repo.GetByIdAsync(new RelacaoId(dto.Id)); 

        //     if (relacao == null)
        //         return null;   

        //     // change all field
        //     relacao.AddPontuacao(dto.Tags);
            
        //     await this._unitOfWork.CommitAsync();

        //     return new RelacaoDto { Id = relacao.Id.AsString(), Tags = relacao.Tags, ForcaRelacao = relacao.ForcaRelacao, ForcaLigacao = relacao.ForcaLigacao };
        // }

        public async Task<RelacaoDto> InactivateAsync(RelacaoId id)
        {
            var relacao = await this._repo.GetByIdAsync(id); 

            if (relacao == null)
                return null;   

            // change all fields
            relacao.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new RelacaoDto { Id = relacao.Id.AsString(), Tags = relacao.Tags, ForcaRelacao = relacao.ForcaRelacao, ForcaLigacao = relacao.ForcaLigacao };
        }

         public async Task<RelacaoDto> DeleteAsync(RelacaoId id)
        {
            var relacao = await this._repo.GetByIdAsync(id); 

            if (relacao == null)
                return null;   

            if (relacao.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active relacao.");
            
            this._repo.Remove(relacao);
            await this._unitOfWork.CommitAsync();

            return new RelacaoDto { Id = relacao.Id.AsString(), Tags = relacao.Tags, ForcaRelacao = relacao.ForcaRelacao, ForcaLigacao = relacao.ForcaLigacao };
        }
    }
}