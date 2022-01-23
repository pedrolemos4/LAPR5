using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Perfis;
using System;
using DDDSample1.Domain.Relacoes;

namespace DDDSample1.Domain.Jogadores
{
    public class JogadorService : IJogadorService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IJogadorRepository _repo;

        private readonly IPerfilRepository _repoPer;

        private readonly IRelacaoRepository _repoRel;


        public JogadorService(IUnitOfWork unitOfWork, IJogadorRepository repo, IPerfilRepository repoPer,
         IRelacaoRepository repoRel)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repoPer = repoPer;
            this._repoRel = repoRel;
        }

        public async Task<List<JogadorDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<JogadorDto> listDto = list.ConvertAll<JogadorDto>(jog => new JogadorDto
            {
                Id = jog.Id.AsGuid(),
                Pontuacao = jog.Pontuacao.Pontos,
                PerfilId = jog.Perfil.AsGuid(),
            });

            return listDto;
        }

        public static HashSet<Guid> converteParaListaGuidRelacao(List<RelacaoId> lista)
        {
            HashSet<Guid> ls = new HashSet<Guid>();
            if (lista != null)
            {
                foreach (RelacaoId r in lista)
                {
                    ls.Add(r.AsGuid());
                }
            }
            return ls;
        }

        public async Task<JogadorDto> GetByIdAsync(JogadorId id)
        {
            var jog = await this._repo.GetByIdAsync(id);

            if (jog == null)
                return null;

            return new JogadorDto
            {
                Id = jog.Id.AsGuid(),
                Pontuacao = jog.Pontuacao.Pontos,
                PerfilId = jog.Perfil.AsGuid(),
            };
        }

        public async Task<List<JogadorDto>> GetAmigosEmComum(JogadorId idJog, JogadorId idObj)
        {
            var list = await this._repo.GetAmigosEmComum(idJog, idObj);
            List<JogadorDto> jogadors = new List<JogadorDto>();
            foreach (JogadorId id in list)
            {
                var jog = await this._repo.GetByIdAsync(id);
                jogadors.Add(new JogadorDto
                {
                    Id = jog.Id.AsGuid(),
                Pontuacao = jog.Pontuacao.Pontos,
                PerfilId = jog.Perfil.AsGuid(),
                });
            }
            return jogadors;
        }

        public async Task<List<JogadorDto>> GetAmigos(JogadorId idJog)
        {
            var listAux = await this._repo.GetAmigos(idJog);
            List<JogadorDto> jogadors = new List<JogadorDto>();
            foreach (JogadorId id in listAux)
            {
                var jog = await this._repo.GetByIdAsync(id);
                jogadors.Add(new JogadorDto
                {
                    Id = jog.Id.AsGuid(),
                Pontuacao = jog.Pontuacao.Pontos,
                PerfilId = jog.Perfil.AsGuid(),
                });
            }
            return jogadors;
        }

        public async Task<List<JogadorDto>> GetPossiveisAmigos(JogadorId idJog)
        {
            var listAux = await this._repo.GetPossiveisAmigos(idJog);
            List<JogadorDto> jogadors = new List<JogadorDto>();
            foreach (JogadorId id in listAux)
            {
                var jog = await this._repo.GetByIdAsync(id);
                jogadors.Add(new JogadorDto
                {
                    Id = jog.Id.AsGuid(),
                Pontuacao = jog.Pontuacao.Pontos,
                PerfilId = jog.Perfil.AsGuid(),
                });
            }
            return jogadors;   
        }
        
        public async Task<JogadorDto> AddAsync(CreatingJogadorDto jogadorDto)
        {
            var perfil = await _repoPer.GetByIdAsync(new PerfilId(jogadorDto.perfilId));
            var jog = new Jogador(perfil.Id);

            await this._repo.AddAsync(jog);

            await this._unitOfWork.CommitAsync();

            return new JogadorDto
            {
                Id = jog.Id.AsGuid(),
                Pontuacao = jog.Pontuacao.Pontos,
                PerfilId = jog.Perfil.AsGuid(),
            };
        }

        public async Task<JogadorDto> GetJogadorByPerfil(PerfilId perfil)
        {
            var jog = await this._repo.GetJogadorByPerfil(perfil);

            if (jog == null)
                return null;

            return new JogadorDto
            {
                Id = jog.Id.AsGuid(),
                Pontuacao = jog.Pontuacao.Pontos,
                PerfilId = jog.Perfil.AsGuid(),
            };
        }

        public async Task<JogadorDto> UpdateAsync(JogadorDto dto)
        {
            var jog = await this._repo.GetByIdAsync(new JogadorId(dto.Id));

            if (jog == null)
                return null;

            await this._unitOfWork.CommitAsync();

            return new JogadorDto
            {
                Id = jog.Id.AsGuid(),
                Pontuacao = jog.Pontuacao.Pontos,
                PerfilId = jog.Perfil.AsGuid(),
            };
        }

        public async Task<JogadorDto> DeleteAsync(JogadorId id)
        {
            var jog = await this._repo.GetByIdAsync(id);

            if (jog == null)
                return null;

            this._repo.Remove(jog);
            await this._unitOfWork.CommitAsync();

            return new JogadorDto
            {
                Id = jog.Id.AsGuid(),
                Pontuacao = jog.Pontuacao.Pontos,
                PerfilId = jog.Perfil.AsGuid(),
            };
        }
    }
}