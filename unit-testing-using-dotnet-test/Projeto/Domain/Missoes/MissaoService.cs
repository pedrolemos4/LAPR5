using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Missoes
{
    public class MissaoService : IMissaoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMissaoRepository _repo;

        public MissaoService(IUnitOfWork unitOfWork, IMissaoRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<MissaoDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<MissaoDto> listDto = list.ConvertAll<MissaoDto>(miss => new MissaoDto{Id = miss.Id.AsGuid(), Dificuldade = miss.Dificuldade, Data = miss.Data, JogadorObjetivo = miss.JogadorObjetivo.Id});

            return listDto;
        }

        public async Task<MissaoDto> GetByIdAsync(MissaoId id) {
            var miss = await this._repo.GetByIdAsync(id);
            
            if(miss == null)
                return null;

            return new MissaoDto{Id = miss.Id.AsGuid(), Dificuldade = miss.Dificuldade, Data = miss.Data, JogadorObjetivo = miss.JogadorObjetivo.Id};
        }

         public async Task<MissaoDto> AddAsync(CreatingMissaoDto dto) {
             var missao = new Missao(dto.Dificuldade.GrauDificuldade, dto.Data.Date, dto.JogadorObjetivo);

             await this._repo.AddAsync(missao);

             await this._unitOfWork.CommitAsync();

             return new MissaoDto { Id = missao.Id.AsGuid(), Dificuldade = missao.Dificuldade, Data = missao.Data, JogadorObjetivo = missao.JogadorObjetivo.Id};
         }


        public async Task<MissaoDto> InactivateAsync(MissaoId id)
        {
            var missao = await this._repo.GetByIdAsync(id); 

            if (missao == null)
                return null;   

            // change all fields
            missao.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new MissaoDto { Id = missao.Id.AsGuid(), Dificuldade = missao.Dificuldade, Data = missao.Data, JogadorObjetivo = missao.JogadorObjetivo.Id };
        }

         public async Task<MissaoDto> DeleteAsync(MissaoId id)
        {
            var missao = await this._repo.GetByIdAsync(id); 

            if (missao == null)
                return null;   

            if (missao.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active missao.");
            
            this._repo.Remove(missao);
            await this._unitOfWork.CommitAsync();

            return new MissaoDto { Id = missao.Id.AsGuid(), Dificuldade = missao.Dificuldade, Data = missao.Data, JogadorObjetivo = missao.JogadorObjetivo.Id };
        }
    }
}