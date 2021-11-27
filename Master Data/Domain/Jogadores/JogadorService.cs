using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Missoes;
using System;
using System.Linq;
using DDDSample1.Domain.Relacoes;
using DDDSample1.Domain.Posts;

namespace DDDSample1.Domain.Jogadores
{
    public class JogadorService : IJogadorService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IJogadorRepository _repo;

        private readonly IPerfilRepository _repoPer;

        private readonly IMissaoRepository _repoMissao;

        private readonly IRelacaoRepository _repoRel;

        private readonly IPostRepository _repoPost;

        public JogadorService(IUnitOfWork unitOfWork, IJogadorRepository repo, IPerfilRepository repoPer,
        IMissaoRepository repoMissao, IRelacaoRepository repoRel, IPostRepository repoPost)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repoPer = repoPer;
            this._repoMissao = repoMissao;
            this._repoRel = repoRel;
            this._repoPost = repoPost;
        }

        public async Task<List<JogadorDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            Console.WriteLine("\n\nLista do Repo : " + list.Count + "\n\n");
            /*List<JogadorDto> listDto = new List<JogadorDto>();
            foreach (Jogador jog in list)
            {
                jog.ToString();
                //Console.WriteLine("\nPerfilId:" + jog.Perfil.Id.AsGuid() + "\n");
                JogadorDto dto = new JogadorDto
                {
                    Id = jog.Id.AsGuid(),
                };
                Console.WriteLine("\nId Jog: " + dto.Id.ToString());
                listDto.Add(dto);
            }
            Console.WriteLine("\n\n Lista Dto: " + listDto + "\n\n");
            return listDto;*/

            List<JogadorDto> listDto = list.ConvertAll<JogadorDto>(jog => new JogadorDto
            {
                Id = jog.Id.AsGuid(),
                Pontuacao = jog.Pontuacao.Pontos,
                PerfilId = jog.Perfil.AsGuid(),
                /*  Missao = converteParaListaGuidMissao(jog.ListaMissoes),
                  Relacao = converteParaListaGuidRelacao(jog.ListaRelacoes),
                  Post = converteParaListaGuidPost(jog.ListaPosts)*/
            });

            return listDto;
        }

        public static List<Guid> converteParaListaGuidMissao(List<Missao> lista)
        {
            List<Guid> ls = new List<Guid>();
            foreach (Missao missao in lista)
            {
                ls.Add(missao.Id.AsGuid());
            }
            return ls;
        }

        public static HashSet<Guid> converteParaListaGuidRelacao(HashSet<Relacao> lista)
        {
            HashSet<Guid> ls = new HashSet<Guid>();
            foreach (Relacao r in lista)
            {
                ls.Add(r.Id.AsGuid());
            }
            return ls;
        }

        public static List<Guid> converteParaListaGuidPost(List<Post> lista)
        {
            List<Guid> ls = new List<Guid>();
            foreach (Post p in lista)
            {
                ls.Add(p.Id.AsGuid());
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
                //  Pontuacao = jog.Pontuacao.Pontos,
                //   PerfilId = jog.perfil.Id.AsGuid()
                /*                Missao = converteParaListaGuidMissao(jog.ListaMissoes),
                                Relacao = converteParaListaGuidRelacao(jog.ListaRelacoes),
                                Post = converteParaListaGuidPost(jog.ListaPosts)*/
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
                    /* Pontuacao = jog.Pontuacao.Pontos,*/
                    //PerfilId = jog.perfil.Id.AsGuid()
                });
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
                jogadors.Add(new JogadorDto
                {
                    Id = jog.Id.AsGuid(),
                    //    Pontuacao = jog.Pontuacao.Pontos,
                    //       PerfilId = jog.perfil.Id.AsGuid(),
                    /*  Missao = converteParaListaGuidMissao(jog.ListaMissoes),
                      Relacao = converteParaListaGuidRelacao(jog.ListaRelacoes),
                      Post = converteParaListaGuidPost(jog.ListaPosts)*/
                });
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

        public async Task<List<JogadorDto>> GetPossiveisAmigos(JogadorId idJog)
        {
            var list = await this._repo.GetAllAsync();
            List<JogadorDto> listJog = list.ConvertAll<JogadorDto>(jog => new JogadorDto
            {
                Id = jog.Id.AsGuid(),
                Pontuacao = jog.Pontuacao.Pontos,
                PerfilId = jog.Perfil.AsGuid(),
                /*  Missao = converteParaListaGuidMissao(jog.ListaMissoes),
                  Relacao = converteParaListaGuidRelacao(jog.ListaRelacoes),
                  Post = converteParaListaGuidPost(jog.ListaPosts)*/
            });
            var listAmigos = await this._repo.GetAmigos(idJog);
            List<JogadorDto> amigos = new List<JogadorDto>();
            foreach (JogadorId id in listAmigos)
            {
                var jog = await this._repo.GetByIdAsync(id);
                amigos.Add(new JogadorDto
                {
                    Id = jog.Id.AsGuid(),
                    //    Pontuacao = jog.Pontuacao.Pontos,
                    //       PerfilId = jog.perfil.Id.AsGuid(),
                    /*  Missao = converteParaListaGuidMissao(jog.ListaMissoes),
                      Relacao = converteParaListaGuidRelacao(jog.ListaRelacoes),
                      Post = converteParaListaGuidPost(jog.ListaPosts)*/
                });
            }
            return listJog.Except(amigos).ToList();
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
                Missao = converteParaListaGuidMissao(jog.ListaMissoes),
                Relacao = converteParaListaGuidRelacao(jog.ListaRelacoes),
                Post = converteParaListaGuidPost(jog.ListaPosts)
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
                //Pontuacao = jog.Pontuacao.Pontos,
                //PerfilId = jog.perfil.Id.AsGuid()
                /*Missao = converteParaListaGuidMissao(jog.ListaMissoes),
                Relacao = converteParaListaGuidRelacao(jog.ListaRelacoes),
                Post = converteParaListaGuidPost(jog.ListaPosts)*/
            };
        }

        public async Task<JogadorDto> UpdateAsync(JogadorDto dto)
        {
            var jog = await this._repo.GetByIdAsync(new JogadorId(dto.Id));
            //var perfil = await this._repoPer.GetByIdAsync(new PerfilId(dto.PerfilId));

            if (jog == null)
                return null;

            List<Missao> ls = new List<Missao>();
            HashSet<Relacao> lrel = new HashSet<Relacao>();
            List<Post> lpost = new List<Post>();
            /*  foreach (Guid missao in dto.Missao) {
                  var m = await _repoMissao.GetByIdAsync(new MissaoId(missao));
                  ls.Add(m);
              }

              foreach (Guid rel in dto.Relacao) {
                  var r = await _repoRel.GetByIdAsync(new RelacaoId(rel));
                  lrel.Add(r);
              }

              foreach (Guid post in dto.Post) {
                  var p = await _repoPost.GetByIdAsync(new PostId(post));
                  lpost.Add(p);
              }

              // change all field
              jog.ChangePontuacao(dto.Pontuacao);*/
            jog.ChangeMissoes(ls);
            //   jog.ChangePerfil(perfil);
            jog.ChangePosts(lpost);
            jog.ChangeRelacoes(lrel);

            await this._unitOfWork.CommitAsync();

            return new JogadorDto
            {
                Id = jog.Id.AsGuid(),
                //  Pontuacao = jog.Pontuacao.Pontos,
                //PerfilId = jog.perfil.Id.AsGuid()
                /*Missao = converteParaListaGuidMissao(jog.ListaMissoes),
                Relacao = converteParaListaGuidRelacao(jog.ListaRelacoes),
                Post = converteParaListaGuidPost(jog.ListaPosts)*/
            };
        }

        public static HashSet<Guid> converteParaListaRelacao(HashSet<Relacao> lista)
        {
            HashSet<Guid> ls = new HashSet<Guid>();
            foreach (Relacao r in lista)
            {
                ls.Add(r.Id.AsGuid());
            }
            return ls;
        }

        public static List<Guid> converteParaListaPost(List<Post> lista)
        {
            List<Guid> ls = new List<Guid>();
            foreach (Post p in lista)
            {
                ls.Add(p.Id.AsGuid());
            }
            return ls;
        }

        // public async Task<JogadorDto> InactivateAsync(JogadorId id)
        // {
        //     var jog = await this._repo.GetByIdAsync(id);

        //     if (jog == null)
        //         return null;

        //     // change all fields
        //     jog.MarkAsInative();

        //     await this._unitOfWork.CommitAsync();

        //     return new JogadorDto
        //     {
        //         Id = jog.Id.AsGuid(),
        //         Pontuacao = jog.Pontuacao.Pontos,
        //         PerfilId = jog.perfil.Id.AsGuid(),
        //         Missao = converteParaListaGuidMissao(jog.ListaMissoes),
        //         Relacao = converteParaListaGuidRelacao(jog.ListaRelacoes),
        //         Post = converteParaListaGuidPost(jog.ListaPosts)
        //     };
        // }

        public async Task<JogadorDto> DeleteAsync(JogadorId id)
        {
            var jog = await this._repo.GetByIdAsync(id);

            if (jog == null)
                return null;

            if (jog.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active jogador.");

            this._repo.Remove(jog);
            await this._unitOfWork.CommitAsync();

            return new JogadorDto
            {
                Id = jog.Id.AsGuid(),
                //               Pontuacao = jog.Pontuacao.Pontos,
                //   PerfilId = jog.perfil.Id.AsGuid()
                /*                Missao = converteParaListaGuidMissao(jog.ListaMissoes),
                                Relacao = converteParaListaGuidRelacao(jog.ListaRelacoes),
                                Post = converteParaListaGuidPost(jog.ListaPosts)*/
            };
        }
    }
}