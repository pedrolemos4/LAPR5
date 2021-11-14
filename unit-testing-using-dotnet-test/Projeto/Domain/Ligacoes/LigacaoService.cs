using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Jogadores;
using System;

namespace DDDSample1.Domain.Ligacoes
{
    public class LigacaoService : ILigacaoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILigacaoRepository _repo;

        private readonly IJogadorRepository _repoJog;

        public LigacaoService(IUnitOfWork unitOfWork, ILigacaoRepository repo, IJogadorRepository repoJog)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repoJog = repoJog;
        }

        public async Task<List<LigacaoDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<LigacaoDto> listDto = list.ConvertAll<LigacaoDto>(lig => new LigacaoDto { Id = lig.Id.AsGuid(), TextoLigacao = lig.TextoLigacao.Texto, Estado = lig.EstadoLigacao.ToString(), Jogador1 = lig.Jogador1.Id.AsGuid(), Jogador2 = lig.Jogador2.Id.AsGuid() });

            return listDto;
        }

        public async Task<List<LigacaoDto>> GetLigacaoPendente(LigacaoId id)
        {
            var list = await this._repo.GetLigacaoPendente(id);

            List<LigacaoDto> listDto = list.ConvertAll<LigacaoDto>(lig => new LigacaoDto { Id = lig.Id.AsGuid(), TextoLigacao = lig.TextoLigacao.Texto, Estado = lig.EstadoLigacao.ToString(), Jogador1 = lig.Jogador1.Id.AsGuid(), Jogador2 = lig.Jogador2.Id.AsGuid() });

            return listDto;
        }

        public async Task<LigacaoDto> GetByIdAsync(LigacaoId id)
        {
            var lig = await this._repo.GetByIdAsync(id);

            if (lig == null)
                return null;

            return new LigacaoDto { Id = lig.Id.AsGuid(), TextoLigacao = lig.TextoLigacao.Texto, Estado = lig.EstadoLigacao.ToString(), Jogador1 = lig.Jogador1.Id.AsGuid(), Jogador2 = lig.Jogador2.Id.AsGuid() };
        }

        public async Task<LigacaoDto> AddAsync(CreatingLigacaoDto dto)
        {
            var jog1 = await this._repoJog.GetByIdAsync(new JogadorId(dto.Jogador1));
            var jog2 = await this._repoJog.GetByIdAsync(new JogadorId(dto.Jogador2));

            var ligacao = new Ligacao(dto.TextoLigacao, dto.EstadoLigacao.ToString(), jog1, jog2);

            await this._repo.AddAsync(ligacao);

            await this._unitOfWork.CommitAsync();

            return new LigacaoDto { Id = ligacao.Id.AsGuid(), TextoLigacao = ligacao.TextoLigacao.Texto, Estado = ligacao.EstadoLigacao.ToString(), Jogador1 = ligacao.Jogador1.Id.AsGuid(), Jogador2 = ligacao.Jogador2.Id.AsGuid() };
        }

        public async Task<LigacaoDto> PatchEstadoLigacao(LigacaoDto dto)
        {
            var lig = await this._repo.GetByIdAsync(new LigacaoId(dto.Id));

            if (lig == null)
                return null;

            lig.ChangeEstado(dto.Estado.ToString());

            await this._unitOfWork.CommitAsync();

            return new LigacaoDto { Id = lig.Id.AsGuid(), TextoLigacao = lig.TextoLigacao.Texto, Estado = lig.EstadoLigacao.ToString(), Jogador1 = lig.Jogador1.Id.AsGuid(), Jogador2 = lig.Jogador2.Id.AsGuid() };
        }

        public async Task<LigacaoDto> UpdateAsync(LigacaoDto dto)
        {
            var ligacao = await this._repo.GetByIdAsync(new LigacaoId(dto.Id));
            var jog = await this._repoJog.GetByIdAsync(new JogadorId(dto.Jogador2));
            if (ligacao == null)
                return null;

            // change all field
            ligacao.ChangeEstado(dto.Estado.ToString());
            ligacao.ChangeTextoLigacao(dto.TextoLigacao);
            ligacao.ChangeJogador2(jog);

            await this._unitOfWork.CommitAsync();

            return new LigacaoDto { Id = ligacao.Id.AsGuid(), TextoLigacao = ligacao.TextoLigacao.Texto, Estado = ligacao.EstadoLigacao.ToString(), Jogador1 = ligacao.Jogador1.Id.AsGuid(), Jogador2 = ligacao.Jogador2.Id.AsGuid() };
        }

        /*public async Task<LigacaoDto> InactivateAsync(LigacaoId id)
        {
            var ligacao = await this._repo.GetByIdAsync(id);

            if (ligacao == null)
                return null;

            // change all fields
            ligacao.MarkAsInative();

            await this._unitOfWork.CommitAsync();

            return new LigacaoDto { Id = ligacao.Id.AsGuid(), TextoLigacao = ligacao.TextoLigacao, Estado = ligacao.EstadoLigacao, Jogador1 = ligacao.Jogador1.Id, Jogador2 = ligacao.Jogador2.Id };
        }*/

        public async Task<LigacaoDto> DeleteAsync(LigacaoId id)
        {
            var ligacao = await this._repo.GetByIdAsync(id);

            if (ligacao == null)
                return null;

            if (ligacao.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active ligacao.");

            this._repo.Remove(ligacao);
            await this._unitOfWork.CommitAsync();

            return new LigacaoDto { Id = ligacao.Id.AsGuid(), TextoLigacao = ligacao.TextoLigacao.Texto, Estado = ligacao.EstadoLigacao.ToString(), Jogador1 = ligacao.Jogador1.Id.AsGuid(), Jogador2 = ligacao.Jogador2.Id.AsGuid() };
        }
    }
}