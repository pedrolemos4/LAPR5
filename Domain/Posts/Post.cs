using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SharedValueObjects;

namespace DDDSample1.Domain.Posts
{
    public class Post : Entity<PostId>, IAggregateRoot
    {

        public Texto Texto { get;  private set; }

        public Tag Tags { get;  private set; }

        public Comentario Comentario { get;  private set; }

        public LikeDislike LikeDislike { get;  private set; }

        public ForcaLigacao ForcaLigacao { get;  private set; }

        public bool Active{ get;  private set; }

        private Post()
        {
            this.Active = true;
        }

        public Post(string code, Texto texto, Tag tags, Comentario comentario, LikeDislike likeDislike, ForcaLigacao forca)
        {
            this.Id = new PostId(code);
            this.Texto = texto;
            this.Tags = tags;
            this.Comentario = comentario;
            this.LikeDislike = likeDislike;
            this.ForcaLigacao = forca;
            this.Active = true;
        }

        public void ChangeTexto(Texto texto)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the text to an inactive post.");
            this.Texto = texto;
        }

        public void ChangeTags(Tag tags)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the tags to an inactive post.");
            this.Tags = tags;
        }
        
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}