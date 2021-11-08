using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SharedValueObjects;
using System.Collections.Generic;

namespace DDDSample1.Domain.Posts
{
    public class Post : Entity<PostId>, IAggregateRoot
    {

        public Texto Texto { get;  private set; }

        public List<Tag> Tags { get;  private set; }

        public List<Comentario> Comentario { get;  private set; }

        public LikeDislike LikeDislike { get;  private set; }

        public bool Active{ get;  private set; }

        private Post()
        {
            this.Active = true;
        }

        public Post(string code, string texto, List<string> tags, List<string> comentario, string likeDislike, int forca)
        {
            this.Id = new PostId(code);
            this.Texto = new Texto(texto);
            setTags(tags);
            setComentarios(comentario);
            this.LikeDislike = new LikeDislike(likeDislike);
            this.Active = true;
        }

        private void setTags(List<string> tag)
        {
            List<Tag> tagsList = new List<Tag>();
            foreach (string t in tag)
            {
                tagsList.Add(new Tag(t));
            }
            this.Tags = tagsList;
        }

        private void setComentarios(List<string> comentario)
        {
            List<Comentario> list = new List<Comentario>();
            foreach (string t in comentario)
            {
                list.Add(new Comentario(t));
            }
            this.Comentario = list;
        }

        public void ChangeTexto(List<string> texto)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the text to an inactive post.");
            setComentarios(texto);
        }

        public void ChangeTags(List<string> tags)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the tags to an inactive post.");
            setTags(tags);
        }
        
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}