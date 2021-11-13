using DDDSample1.Domain.Shared;


namespace DDDSample1.Domain.Posts
{
    public interface IPostRepository:IRepository<Post,PostId>
    {

    }
}