using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Jogadores;

namespace DDDSample1.Domain.Introducoes
{
    public class IntroducaoService : IIntroducaoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IIntroducaoRepository _repo;

        private readonly IJogadorRepository _repoJog;

        public IntroducaoService(IUnitOfWork unitOfWork, IIntroducaoRepository repo, IJogadorRepository repoJog)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repoJog = repoJog;
        }

        public async Task<List<IntroducaoDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<IntroducaoDto> listDto = list.ConvertAll<IntroducaoDto>(intro => new IntroducaoDto
            {
                Id = intro.Id.AsGuid(),
                JogadorInicial = intro.JogadorInicial.AsGuid(),
                JogadorIntrodutor = intro.JogadorIntrodutor.AsGuid(),
                JogadorObjetivo = intro.JogadorObjetivo.AsGuid(),
                EstadoIntroducao = intro.EstadoIntroducao.ToString(),
                TextoIntroducao = intro.TextoIntroducao.ToString()
            });

            return listDto;
        }

        public async Task<IntroducaoDto> GetByIdAsync(IntroducaoId id)
        {
            var intro = await this._repo.GetByIdAsync(id);

            if (intro == null)
                return null;

            return new IntroducaoDto
            {
                Id = intro.Id.AsGuid(),
                JogadorInicial = intro.JogadorInicial.AsGuid(),
                JogadorIntrodutor = intro.JogadorIntrodutor.AsGuid(),
                JogadorObjetivo = intro.JogadorObjetivo.AsGuid(),
                EstadoIntroducao = intro.EstadoIntroducao.ToString(),
                TextoIntroducao = intro.TextoIntroducao.ToString(),
            };
        }

        public async Task<IntroducaoDto> AddAsync(CreatingIntroducaoDto introducao)
        {
            var jogadorIn = await _repoJog.GetByIdAsync(new JogadorId(introducao.JogadorInicial));
            var jogadorObj = await _repoJog.GetByIdAsync(new JogadorId(introducao.JogadorObjetivo));
            var jogadorIntr = await _repoJog.GetByIdAsync(new JogadorId(introducao.JogadorIntrodutor));

            var intro = new Introducao(jogadorIn.Id, jogadorIntr.Id, jogadorObj.Id, introducao.EstadoIntroducao.ToString(), introducao.TextoIntroducao.ToString());

            await this._repo.AddAsync(intro);

            await this._unitOfWork.CommitAsync();

            return new IntroducaoDto
            {
                Id = intro.Id.AsGuid(),
                JogadorInicial = intro.JogadorInicial.AsGuid(),
                JogadorIntrodutor = intro.JogadorIntrodutor.AsGuid(),
                JogadorObjetivo = intro.JogadorObjetivo.AsGuid(),
                EstadoIntroducao = intro.EstadoIntroducao.ToString(),
                TextoIntroducao = intro.TextoIntroducao.ToString()
            };

        }

        public async Task<IntroducaoDto> PatchEstadoIntroducao(IntroducaoDto dto)
        {
            var intro = await this._repo.GetByIdAsync(new IntroducaoId(dto.Id));

            if (intro == null)
                return null;

            // change all field
            intro.ChangeEstado(dto.EstadoIntroducao.ToString());

            await this._unitOfWork.CommitAsync();

            return new IntroducaoDto
            {
                Id = intro.Id.AsGuid(),
                JogadorInicial = intro.JogadorInicial.AsGuid(),
                JogadorIntrodutor = intro.JogadorIntrodutor.AsGuid(),
                JogadorObjetivo = intro.JogadorObjetivo.AsGuid(),
                EstadoIntroducao = intro.EstadoIntroducao.ToString(),
                TextoIntroducao = intro.TextoIntroducao.ToString()
            };
        }

        public async Task<IntroducaoDto> InactivateAsync(IntroducaoId id)
        {
            var intro = await this._repo.GetByIdAsync(id);

            if (intro == null)
                return null;

            // change all fields
            intro.MarkAsInative();

            await this._unitOfWork.CommitAsync();

            return new IntroducaoDto
            {
                Id = intro.Id.AsGuid(),
                JogadorInicial = intro.JogadorInicial.AsGuid(),
                JogadorIntrodutor = intro.JogadorIntrodutor.AsGuid(),
                JogadorObjetivo = intro.JogadorObjetivo.AsGuid(),
                EstadoIntroducao = intro.EstadoIntroducao.ToString(),
                TextoIntroducao = intro.TextoIntroducao.ToString()
            };
        }

        public async Task<List<IntroducaoDto>> GetIntroducoesPorAprovar(JogadorId idJog)
        {
            var list = await this._repo.GetIntroducoesPorAprovar(idJog);
            List<IntroducaoDto> listIntro = list.ConvertAll<IntroducaoDto>(intro => new IntroducaoDto
            {
                JogadorInicial = intro.JogadorInicial.AsGuid(),
                JogadorIntrodutor = intro.JogadorIntrodutor.AsGuid(),
                JogadorObjetivo = intro.JogadorObjetivo.AsGuid(),
                Id = intro.Id.AsGuid(),
                EstadoIntroducao = intro.EstadoIntroducao.ToString(),
                TextoIntroducao = intro.TextoIntroducao.ToString()
            });
            return listIntro;
        }

        public async Task<List<IntroducaoDto>> GetIntroducoesAprovarRejeitar(JogadorId idJog)
        {
            var list = await this._repo.GetIntroducoesAprovarRejeitar(idJog);
            List<IntroducaoDto> listIntro = list.ConvertAll<IntroducaoDto>(intro => new IntroducaoDto
            {
                JogadorInicial = intro.JogadorInicial.AsGuid(),
                JogadorIntrodutor = intro.JogadorIntrodutor.AsGuid(),
                JogadorObjetivo = intro.JogadorObjetivo.AsGuid(),
                Id = intro.Id.AsGuid(),
                EstadoIntroducao = intro.EstadoIntroducao.ToString(),
                TextoIntroducao = intro.TextoIntroducao.ToString()
            });
            return listIntro;
        }

        public async Task<IntroducaoDto> DeleteAsync(IntroducaoId id)
        {
            var intro = await this._repo.GetByIdAsync(id);

            if (intro == null)
                return null;

            if (intro.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active introducao.");

            this._repo.Remove(intro);
            await this._unitOfWork.CommitAsync();

            return new IntroducaoDto
            {
                Id = intro.Id.AsGuid(),
                JogadorInicial = intro.JogadorInicial.AsGuid(),
                JogadorIntrodutor = intro.JogadorIntrodutor.AsGuid(),
                JogadorObjetivo = intro.JogadorObjetivo.AsGuid(),
                EstadoIntroducao = intro.EstadoIntroducao.ToString(),
                TextoIntroducao = intro.TextoIntroducao.ToString()
            };
        }

        public async Task<IntroducaoDto> UpdateAsync(IntroducaoDto introducao)
        {
            var intro = await this._repo.GetByIdAsync(new IntroducaoId(introducao.Id));
            var jogIntro = await this._repoJog.GetByIdAsync(new JogadorId(introducao.JogadorIntrodutor));
            var jogObj = await this._repoJog.GetByIdAsync(new JogadorId(introducao.JogadorObjetivo));

            if (intro == null)
                return null;

            // change all field
            intro.ChangeEstado(introducao.EstadoIntroducao.ToString());
            intro.ChangeJogadorIntrodutor(jogIntro.Id);
            intro.ChangeJogadorObjetivo(jogObj.Id);

            await this._unitOfWork.CommitAsync();

            return new IntroducaoDto
            {
                Id = intro.Id.AsGuid(),
                JogadorInicial = intro.JogadorInicial.AsGuid(),
                JogadorIntrodutor = intro.JogadorIntrodutor.AsGuid(),
                JogadorObjetivo = intro.JogadorObjetivo.AsGuid(),
                EstadoIntroducao = intro.EstadoIntroducao.ToString(),
                TextoIntroducao = intro.TextoIntroducao.ToString()
            };
        }
    }
}