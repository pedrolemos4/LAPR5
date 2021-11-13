using System;
using DDDSample1.Domain.SharedValueObjects;
using System.Collections.Generic;

namespace DDDSample1.Domain.Posts
{
    public class PostDto
    {
        public Guid Id { get; set; }

        public Texto Texto { get; set; }

        public List<Tag> Tags { get; set; }

        public List<Comentario> Comentario { get; set; }

        public LikeDislike LikeDislike { get; set; }

    }
}