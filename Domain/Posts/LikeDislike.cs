using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Posts
{
    public class LikeDislike : IValueObject
    {

        public string LikeDislike { get;  private set; }

        public bool Active{ get;  private set; }

        private LikeDislike()
        {
            this.Active = true;
        }

        public LikeDislike(string likeDislike)
        {
            this.LikeDislike = likeDislike;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}