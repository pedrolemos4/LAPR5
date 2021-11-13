using DDDSample1.Domain.SharedValueObjects;
using DDDSample1.Domain.Jogadores;
using System.Collections.Generic;

namespace DDDSample1.Domain.Relacoes
{
    public class CreatingRelacaoDto
    {

        public RelacaoId RelacaoId { get; private set; } 
        public Jogador Jogador1 { get;  private set; }
        public Jogador Jogador2 { get;  private set; }
        public List<Tag> Tags { get;  private set; }
        public ForcaRelacao ForcaRelacao { get;  private set; }
        public ForcaLigacao ForcaLigacao { get;  private set; }
        public bool Active{ get;  private set; }

        public CreatingRelacaoDto(string code, Jogador jog1, Jogador jog2, List<string> tags, int fr, int fl)
        {
            this.RelacaoId = new RelacaoId(code);
            this.Jogador1 = jog1;
            this.Jogador2 = jog2;
            setTags(tags);
            this.ForcaRelacao = new ForcaRelacao(fr);
            this.ForcaLigacao = new ForcaLigacao(fl);
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

    }
}