using System;


namespace DDDSample1.Domain.Posts
{
    public class PostDto
    {
        public String Id { get; set; }

        public Texto Texto { get; set; }

        public Tag Tags { get; set; }

        public Comentario Comentario { get; set; }

        public LikeDislike LikeDislike { get; set; }

        public ForcaLigacao ForcaLigacao { get; set; }
    }
}