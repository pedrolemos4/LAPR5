using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Perfis;

namespace DDDSample1.Domain.Jogadores
{
    public class JogadorService : IJogadorService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IJogadorRepository _repo;

        private readonly IPerfilRepository _repoPer;

        public JogadorService(IUnitOfWork unitOfWork, IJogadorRepository repo, IPerfilRepository repoPer)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repoPer = repoPer;
        }

        public async Task<List<JogadorDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<JogadorDto> listDto = list.ConvertAll<JogadorDto>(jog => new JogadorDto { Id = jog.Id.AsGuid() });

            return listDto;
        }

        public async Task<JogadorDto> GetByIdAsync(JogadorId id)
        {
            var jog = await this._repo.GetByIdAsync(id);

            if (jog == null)
                return null;

            return new JogadorDto { Id = jog.Id.AsGuid(), Pontuacao = jog.Pontuacao, perfilId = jog.perfil.Id };
        }

        public async Task<List<JogadorDto>> GetAmigosEmComum(JogadorId idJog, JogadorId idObj)
        {
            var list = await this._repo.GetAmigosEmComum(idJog, idObj);
            List<JogadorDto> jogadors = new List<JogadorDto>();
            foreach (JogadorId id in list)
            {
                var jog = await this._repo.GetByIdAsync(id);
                jogadors.Add(new JogadorDto { Id = jog.Id.AsGuid(), Pontuacao = jog.Pontuacao, perfilId = jog.perfil.Id });
            }
            // List<JogadorDto> listJog = list.ConvertAll<JogadorDto>(jog => new JogadorDto
            // {
            //     Id = jog,
            //     /* Pontuacao = jog.Pontuacao,
            //      perfilId = jog.perfil.Id,
            //      Missao = jog.ListaMissoes*/
            // });
            return jogadors;
        }

        public async Task<List<JogadorDto>> GetAmigos(JogadorId idJog)
        {
            var listAux = await this._repo.GetAmigos(idJog);
            List<JogadorDto> jogadors = new List<JogadorDto>();
            foreach (JogadorId id in listAux)
            {
                var jog = await this._repo.GetByIdAsync(id);
                jogadors.Add(new JogadorDto { Id = jog.Id.AsGuid(), Pontuacao = jog.Pontuacao, perfilId = jog.perfil.Id });
            }
            // List<JogadorDto> listJog = listAux.ConvertAll<JogadorDto>(jog => new JogadorDto
            // {
            //     Id = jog,
            //     /*Pontuacao = jog.Pontuacao,
            //     perfilId = jog.perfil.Id,
            //     Missao = jog.ListaMissoes*/
            // });
            return jogadors;
        }

        public async Task<JogadorDto> AddAsync(CreatingJogadorDto jogadorDto)
        {
            var jogador = new Jogador(jogadorDto.perfil);

            await this._repo.AddAsync(jogador);

            await this._unitOfWork.CommitAsync();

            return new JogadorDto { Id = jogador.Id.AsGuid() };
        }

        public async Task<JogadorDto> GetJogadorByPerfil(PerfilId perfil)
        {
            var jogador = await this._repo.GetJogadorByPerfil(perfil);

            if (jogador == null)
                return null;

            return new JogadorDto { Id = jogador.Id.AsGuid(), Pontuacao = jogador.Pontuacao, perfilId = jogador.perfil.Id, Missao = jogador.ListaMissoes, Relacao = jogador.ListaRelacoes, Post = jogador.ListaPosts };
        }

         public async Task<JogadorDto> UpdateAsync(JogadorDto dto)
         {
             var jogador = await this._repo.GetByIdAsync(new JogadorId(dto.Id));
             var perfil = await this._repoPer.GetByIdAsync(dto.perfilId); 

             if (jogador == null)
                 return null;   

             // change all field
             jogador.ChangePontuacao(dto.Pontuacao.Pontos);
             jogador.ChangeMissoes(dto.Missao);
             jogador.ChangePerfil(perfil);
             jogador.ChangePosts(dto.Post);
             jogador.ChangeRelacoes(dto.Relacao);

             await this._unitOfWork.CommitAsync();

            return new JogadorDto { Id = jogador.Id.AsGuid(), Pontuacao = jogador.Pontuacao, perfilId = jogador.perfil.Id, Missao = jogador.ListaMissoes, Relacao = jogador.ListaRelacoes, Post = jogador.ListaPosts };
         }

        public async Task<JogadorDto> InactivateAsync(JogadorId id)
        {
            var jogador = await this._repo.GetByIdAsync(id);

            if (jogador == null)
                return null;

            // change all fields
            jogador.MarkAsInative();

            await this._unitOfWork.CommitAsync();

            return new JogadorDto { Id = jogador.Id.AsGuid() };
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

            return new JogadorDto { Id = jogador.Id.AsGuid() };
        }
    }
}