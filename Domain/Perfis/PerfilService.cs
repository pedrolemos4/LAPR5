using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Perfis
{
    public class PerfilService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPerfilRepository _repo;

        public PerfilService(IUnitOfWork unitOfWork, IPerfilRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<PerfilDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<PerfilDto> listDto = list.ConvertAll<PerfilDto>(async per => new PerfilDto{Id = per.Id.AsString(), Nome = per.Nome, Email = per.Email, Telefone = per.Telefone, DataNascimento = per.DataNascimento, EstadoHumor = per.EstadoHumor, PerfilFacebook = per.PerfilFacebook, PerfilLinkedin = per.PerfilLinkedin});

            return listDto;
        }

        public async Task<PerfilDto> GetByIdAsync(PerfilId id)
        {
            var per = await this._repo.GetByIdAsync(id);
            
            if(per == null)
                return null;

            return new PerfilDto{Id = per.Id.AsString(), Nome = per.Nome, Email = per.Email, Telefone = per.Telefone, DataNascimento = per.DataNascimento, EstadoHumor = per.EstadoHumor, PerfilFacebook = per.PerfilFacebook, PerfilLinkedin = per.PerfilLinkedin};
        }

        public async Task<PerfilDto> AddAsync(PerfilDto dto)
        {
            var perfil = new Perfil(dto.Id, dto.Nome);

            await this._repo.AddAsync(perfil);

            await this._unitOfWork.CommitAsync();

            return new PerfilDto { Id = perfil.Id.AsString(), Nome = perfil.Nome, Email = perfil.Email, Telefone = perfil.Telefone, DataNascimento = perfil.DataNascimento, EstadoHumor = perfil.EstadoHumor, PerfilFacebook = perfil.PerfilFacebook, PerfilLinkedin = perfil.PerfilLinkedin };
        }

        public async Task<PerfilDto> UpdateAsync(PerfilDto dto)
        {
            var perfil = await this._repo.GetByIdAsync(new PerfilId(dto.Id)); 

            if (perfil == null)
                return null;   

            // change all field
            perfil.AddPontuacao(dto.Nome);
            
            await this._unitOfWork.CommitAsync();

            return new PerfilDto { Id = perfil.Id.AsString(), Nome = perfil.Nome, Email = perfil.Email, Telefone = perfil.Telefone, DataNascimento = perfil.DataNascimento, EstadoHumor = perfil.EstadoHumor, PerfilFacebook = perfil.PerfilFacebook, PerfilLinkedin = perfil.PerfilLinkedin };
        }

        public async Task<PerfilDto> InactivateAsync(PerfilId id)
        {
            var perfil = await this._repo.GetByIdAsync(id); 

            if (perfil == null)
                return null;   

            // change all fields
            perfil.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new PerfilDto { Id = perfil.Id.AsString(), Nome = perfil.Nome, Email = perfil.Email, Telefone = perfil.Telefone, DataNascimento = perfil.DataNascimento, EstadoHumor = perfil.EstadoHumor, PerfilFacebook = perfil.PerfilFacebook, PerfilLinkedin = perfil.PerfilLinkedin };
        }

         public async Task<PerfilDto> DeleteAsync(PerfilId id)
        {
            var perfil = await this._repo.GetByIdAsync(id); 

            if (perfil == null)
                return null;   

            if (perfil.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active perfil.");
            
            this._repo.Remove(perfil);
            await this._unitOfWork.CommitAsync();

            return new PerfilDto { Id = perfil.Id.AsString(), Nome = perfil.Nome, Email = perfil.Email, Telefone = perfil.Telefone, DataNascimento = perfil.DataNascimento, EstadoHumor = perfil.EstadoHumor, PerfilFacebook = perfil.PerfilFacebook, PerfilLinkedin = perfil.PerfilLinkedin };
        }
    }
}