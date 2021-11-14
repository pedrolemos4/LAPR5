using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Posts
{
    public class PostDto
    {
        public Guid Id { get; set; }

        public string Texto { get; set; }

        public List<string> Tags { get; set; }

        public List<string> Comentario { get; set; }

        public string LikeDislike { get; set; }

    }
}