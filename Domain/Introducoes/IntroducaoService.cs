using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Introducoes
{
    public class IntroducaoService : IIntroducaoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IIntroducaoRepository _repo;

        public IntroducaoService(IUnitOfWork unitOfWork, IIntroducaoRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<IntroducaoDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<IntroducaoDto> listDto = list.ConvertAll<IntroducaoDto>(intro => new IntroducaoDto{Id = intro.Id.AsString(), JogadorInicial = intro.JogadorInicial, JogadorIntrodutor = intro.JogadorIntrodutor, JogadorObjetivo = intro.JogadorObjetivo, EstadoIntroducao = intro.EstadoIntroducao});

            return listDto;
        }

        public async Task<IntroducaoDto> GetByIdAsync(IntroducaoId id)
        {
            var intro = await this._repo.GetByIdAsync(id);
            
            if(intro == null)
                return null;

            return new IntroducaoDto{Id = intro.Id.AsString(), JogadorInicial = intro.JogadorInicial, JogadorIntrodutor = intro.JogadorIntrodutor, JogadorObjetivo = intro.JogadorObjetivo, EstadoIntroducao = intro.EstadoIntroducao};
        }

        public async Task<IntroducaoDto> AddAsync(Introducao introducao)
        {
           // var introducao = new Introducao(dto.Id, dto.Estado);

            await this._repo.AddAsync(introducao);

            await this._unitOfWork.CommitAsync();

            return new IntroducaoDto { Id = introducao.Id.AsString(), JogadorInicial = introducao.JogadorInicial, JogadorIntrodutor = introducao.JogadorIntrodutor,
             JogadorObjetivo = introducao.JogadorObjetivo, EstadoIntroducao = introducao.EstadoIntroducao};
        }

        public async Task<IntroducaoDto> PatchEstadoIntroducao(IntroducaoDto dto)
        {
            var intro = await this._repo.GetByIdAsync(new IntroducaoId(dto.Id)); 

            if (intro == null)
                return null;   

            // change all field
            intro.ChangeEstado(dto.EstadoIntroducao.ToString());
            
            await this._unitOfWork.CommitAsync();

            return new IntroducaoDto { Id = intro.Id.AsString(), JogadorInicial = intro.JogadorInicial, JogadorIntrodutor = intro.JogadorIntrodutor, JogadorObjetivo = intro.JogadorObjetivo, EstadoIntroducao = intro.EstadoIntroducao };
        }

        public async Task<IntroducaoDto> InactivateAsync(IntroducaoId id)
        {
            var introducao = await this._repo.GetByIdAsync(id); 

            if (introducao == null)
                return null;   

            // change all fields
            introducao.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new IntroducaoDto { Id = introducao.Id.AsString(), JogadorInicial = introducao.JogadorInicial, JogadorIntrodutor = introducao.JogadorIntrodutor, JogadorObjetivo = introducao.JogadorObjetivo, EstadoIntroducao = introducao.EstadoIntroducao };
        }

         public async Task<IntroducaoDto> DeleteAsync(IntroducaoId id)
        {
            var introducao = await this._repo.GetByIdAsync(id); 

            if (introducao == null)
                return null;   

            if (introducao.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active introducao.");
            
            this._repo.Remove(introducao);
            await this._unitOfWork.CommitAsync();

            return new IntroducaoDto { Id = introducao.Id.AsString(), JogadorInicial = introducao.JogadorInicial, JogadorIntrodutor = introducao.JogadorIntrodutor, JogadorObjetivo = introducao.JogadorObjetivo, EstadoIntroducao = introducao.EstadoIntroducao };
        }
    }
}