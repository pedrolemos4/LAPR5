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

        public Post(string code, string texto, string tags, string comentario, string likeDislike, int forca)
        {
            this.Id = new PostId(code);
            this.Texto = new Texto(texto);
            this.Tags = new Tag(tags);
            this.Comentario = new Comentario(comentario);
            this.LikeDislike = new LikeDislike(likeDislike);
            this.ForcaLigacao = new ForcaLigacao(forca);
            this.Active = true;
        }

        public void ChangeTexto(string texto)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the text to an inactive post.");
            this.Texto = new Texto(texto);
        }

        public void ChangeTags(string tags)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the tags to an inactive post.");
            this.Tags = new Tag(tags);
        }
        
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}