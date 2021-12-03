using System.Collections.Generic;
using DDDSample1.Domain.Posts;
using DDDSample1.Domain.SharedValueObjects;
using Xunit;

namespace DDDNetCore.Tests.testesUnitarios.Domain.Posts
{
    public class PostTest
    {
        [Fact]
        public void TestCreatePost()
        {
            string texto = "Texto";
            List<string> tags =  new List<string>();
            List<string> comentarios =  new List<string>();
            string likeDislike = "100-10";
            tags.Add("tag1");
            tags.Add("tag2");
            comentarios.Add("comentario1");
            comentarios.Add("comentario2");

            Post post = new Post(texto, tags, comentarios, likeDislike);

            List<string> tags2 = new List<string>();
            foreach(Tag tag in post.Tags){
                tags2.Add(tag.Descricao);
            }

            Assert.Equal(texto, post.Texto.Descricao);
            Assert.Equal(tags.ToString(), tags2.ToString());
            Assert.Equal(comentarios.ToString(), comentarios.ToString());
            Assert.Equal(likeDislike, post.LikeDislike.Descricao);

        }
    }
}