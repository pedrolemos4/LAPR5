using System.Collections.Generic;

namespace DDDSample1.Domain.Posts
{
    public class CreatingPostDto 
    {

        public string Texto { get;  private set; }

        public List<string> Tags { get;  private set; }

        public List<string> Comentario { get;  private set; }

        public string LikeDislike { get;  private set; }

        public CreatingPostDto(string texto, List<string> tags, List<string> comentario, string likeDislike, int forca)
        {
            this.Texto = texto;
            this.Tags = tags;
            this.LikeDislike = likeDislike;
        }

    }
}