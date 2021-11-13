using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.SharedValueObjects;

namespace DDDSample1.Domain.Relacoes
{
    public class RelacaoService : IRelacaoService
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

        //     List<RelacaoDto> listDto = list.ConvertAll<RelacaoDto>(async relacao => new RelacaoDto{Id = relacao.Id.AsString(), Jogador1 = relacao.Jogador1, Jogador2 = relacao.Jogador2, Tags = relacao.Tags, ForcaRelacao = relacao.ForcaRelacao, ForcaLigacao = relacao.ForcaLigacao});

        //     return listDto;
        // }
        public async Task<RelacaoDto> GetByIdAsync(RelacaoId id)
        {
            var relacao = await this._repo.GetByIdAsync(id);
            
            if(relacao == null)
                return null;

            return new RelacaoDto { Id = relacao.Id.AsGuid(), Jogador1 = relacao.Jogador1, Jogador2 = relacao.Jogador2, Tags = relacao.Tags, ForcaRelacao = relacao.ForcaRelacao, ForcaLigacao = relacao.ForcaLigacao };
        }

        public async Task<List<RelacaoDto>> GetRelacoesDoJogador(JogadorId jog)
        {
            var relacao = await this._repo.GetRelacoesDoJogador(jog);

            if (relacao == null)
                return null;

            List<RelacaoDto> lista = relacao.ConvertAll<RelacaoDto>(relacao => new RelacaoDto { Id = relacao.Id.AsGuid(), Jogador1 = relacao.Jogador1, Jogador2 = relacao.Jogador2, Tags = relacao.Tags, ForcaRelacao = relacao.ForcaRelacao, ForcaLigacao = relacao.ForcaLigacao });

            return lista;
        }

        public async Task<RelacaoDto> AddAsync(CreatingRelacaoDto dto)
        {
            List<string> tags = converteParaListaString(dto.Tags);

            var relacao = new Relacao(dto.Jogador1.Id, dto.Jogador2.Id, tags, dto.ForcaRelacao.Valor, dto.ForcaLigacao.Valor);

            await this._repo.AddAsync(relacao);

            await this._unitOfWork.CommitAsync();

            return new RelacaoDto { Id = relacao.Id.AsGuid(), Jogador1 = relacao.Jogador1, Jogador2 = relacao.Jogador2, Tags = relacao.Tags, ForcaRelacao = relacao.ForcaRelacao, ForcaLigacao = relacao.ForcaLigacao };
        }

        public async Task<RelacaoDto> UpdateAsync(RelacaoDto dto)
        {
            var relacao = await this._repo.GetByIdAsync(new RelacaoId(dto.Id));

            if (relacao == null)
                return null;

            // change all field

            await this._unitOfWork.CommitAsync();

            return new RelacaoDto { Id = relacao.Id.AsGuid(), Jogador1 = relacao.Jogador1, Jogador2 = relacao.Jogador2, Tags = relacao.Tags, ForcaRelacao = relacao.ForcaRelacao, ForcaLigacao = relacao.ForcaLigacao };
        }

        /*public async Task<RelacaoDto> InactivateAsync(RelacaoId id)
        {
            var relacao = await this._repo.GetByIdAsync(id);

            if (relacao == null)
                return null;

            // change all fields
            relacao.MarkAsInative();

            await this._unitOfWork.CommitAsync();

            return new RelacaoDto { Id = relacao.Id.AsGuid(), Jogador1 = relacao.Jogador1, Jogador2 = relacao.Jogador2, Tags = relacao.Tags, ForcaRelacao = relacao.ForcaRelacao, ForcaLigacao = relacao.ForcaLigacao };
        }*/

        public async Task<RelacaoDto> DeleteAsync(RelacaoId id)
        {
            var relacao = await this._repo.GetByIdAsync(id);

            if (relacao == null)
                return null;

            if (relacao.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active relacao.");

            this._repo.Remove(relacao);
            await this._unitOfWork.CommitAsync();

            return new RelacaoDto { Id = relacao.Id.AsGuid(), Jogador1 = relacao.Jogador1, Jogador2 = relacao.Jogador2, Tags = relacao.Tags, ForcaRelacao = relacao.ForcaRelacao, ForcaLigacao = relacao.ForcaLigacao };
        }

        public async Task<RelacaoDto> PatchRelacaoTagsForca(RelacaoDto dto)
        {
            var relacao = await this._repo.GetByIdAsync(new RelacaoId(dto.Id));

            if (relacao == null)
                return null;

            // change all field
            relacao.ChangeTags(converteParaListaString(dto.Tags));

            relacao.ChangeForcaLigacao(dto.ForcaLigacao.Valor);

            await this._unitOfWork.CommitAsync();

            return new RelacaoDto { Id = relacao.Id.AsGuid(), Jogador1 = relacao.Jogador1, Jogador2 = relacao.Jogador2, Tags = relacao.Tags, ForcaRelacao = relacao.ForcaRelacao, ForcaLigacao = relacao.ForcaLigacao };
        }

        public static List<string> converteParaListaString(List<Tag> lista)
        {
            List<string> ls = new List<string>();
            foreach (Tag tag in lista)
            {
                ls.Add(tag.Descricao);
            }
            return ls;
        }

        public async Task<List<RelacaoDto>> ToListAsync()
        {
            var relacao = await this._repo.GetAllAsync();

            if (relacao == null)
                return null;

            List<RelacaoDto> lista = relacao.ConvertAll<RelacaoDto>(relacao => new RelacaoDto { Id = relacao.Id.AsGuid(), Jogador1 = relacao.Jogador1, Jogador2 = relacao.Jogador2, Tags = relacao.Tags, ForcaRelacao = relacao.ForcaRelacao, ForcaLigacao = relacao.ForcaLigacao });

            return lista;
        }

        public async Task<List<RelacaoDto>> GetRedeJogador(JogadorId id, int nivel){
            
            List<Relacao> redeAmigos = new List<Relacao>();
            redeAmigos = await this.GetRedeJogador(id, nivel, redeAmigos);

            List<RelacaoDto> redeAmigosDto = redeAmigos.ConvertAll<RelacaoDto>(relacao =>
                new RelacaoDto{ Id = relacao.Id.AsGuid(), Jogador1 = relacao.Jogador1, Jogador2 = relacao.Jogador2, Tags = relacao.Tags, ForcaRelacao = relacao.ForcaRelacao, ForcaLigacao = relacao.ForcaLigacao});

            return redeAmigosDto;
        }

        private async Task<List<Relacao>> GetRedeJogador(JogadorId id, int nivel, List<Relacao> redeAmigos){
            
            if (nivel < 1) {
                return redeAmigos;
            }

            List<Relacao> amigos = await this._repo.GetRelacoesDoJogador(id);
            redeAmigos.AddRange(amigos);
            
            foreach (Relacao rel in amigos) {
                await this.GetRedeJogador(rel.Jogador2, nivel - 1);
            }

            return redeAmigos;
        }
    }
}