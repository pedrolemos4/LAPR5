using DDDSample1.Domain.Posts;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Posts
{
    public class PostRepository : BaseRepository<Post, PostId>, IPostRepository
    {
    
        public PostRepository(DDDSample1DbContext context):base(context.Posts)
        {
           
        }


    }
}