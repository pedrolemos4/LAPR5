using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Posts
{
    public class PostService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPostRepository _repo;

        public PostService(IUnitOfWork unitOfWork, IPostRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        // public async Task<List<PostDto>> GetAllAsync()
        // {
        //     var list = await this._repo.GetAllAsync();
            
        //     List<PostDto> listDto = list.ConvertAll<PostDto>(async post => new PostDto{Id = post.Id.AsString(), Texto = post.Texto, Tags = post.Tags, Comentario = post.Comentario, LikeDislike = post.LikeDislike, ForcaLigacao = post.ForcaLigacao});

        //     return listDto;
        // }

        public async Task<PostDto> GetByIdAsync(PostId id)
        {
            var post = await this._repo.GetByIdAsync(id);
            
            if(post == null)
                return null;

            return new PostDto{Id = post.Id.AsString(), Texto = post.Texto, Tags = post.Tags, Comentario = post.Comentario, LikeDislike = post.LikeDislike, ForcaLigacao = post.ForcaLigacao};
        }

        // public async Task<PostDto> AddAsync(PostDto dto)
        // {
        //     var post = new Post(dto.Id, dto.Texto);

        //     await this._repo.AddAsync(post);

        //     await this._unitOfWork.CommitAsync();

        //     return new PostDto { Id = post.Id.AsString(), Texto = post.Texto, Tags = post.Tags, Comentario = post.Comentario, LikeDislike = post.LikeDislike, ForcaLigacao = post.ForcaLigacao };
        // }

        // public async Task<PostDto> UpdateAsync(PostDto dto)
        // {
        //     var post = await this._repo.GetByIdAsync(new PostId(dto.Id)); 

        //     if (post == null)
        //         return null;   

        //     // change all field
        //     post.AddPontuacao(dto.Texto);
            
        //     await this._unitOfWork.CommitAsync();

        //     return new PostDto { Id = post.Id.AsString(), Texto = post.Texto, Tags = post.Tags, Comentario = post.Comentario, LikeDislike = post.LikeDislike, ForcaLigacao = post.ForcaLigacao };
        // }

        public async Task<PostDto> InactivateAsync(PostId id)
        {
            var post = await this._repo.GetByIdAsync(id); 

            if (post == null)
                return null;   

            // change all fields
            post.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new PostDto { Id = post.Id.AsString(), Texto = post.Texto, Tags = post.Tags, Comentario = post.Comentario, LikeDislike = post.LikeDislike, ForcaLigacao = post.ForcaLigacao };
        }

         public async Task<PostDto> DeleteAsync(PostId id)
        {
            var post = await this._repo.GetByIdAsync(id); 

            if (post == null)
                return null;   

            if (post.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active post.");
            
            this._repo.Remove(post);
            await this._unitOfWork.CommitAsync();

            return new PostDto { Id = post.Id.AsString(), Texto = post.Texto, Tags = post.Tags, Comentario = post.Comentario, LikeDislike = post.LikeDislike, ForcaLigacao = post.ForcaLigacao };
        }
    }
}