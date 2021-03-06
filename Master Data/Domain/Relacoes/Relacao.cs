using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.SharedValueObjects;
using System.Collections.Generic;
using System;

namespace DDDSample1.Domain.Relacoes
{
    public class Relacao : Entity<RelacaoId>, IAggregateRoot
    {
        public JogadorId Jogador1 { get;  private set; }

        public JogadorId Jogador2 { get;  private set; }

        public List<Tag> Tags { get;  private set; }

        public ForcaRelacao ForcaRelacao { get;  private set; }

        public ForcaLigacao ForcaLigacao { get;  private set; }

        public bool Active{ get;  private set; }

        private Relacao()
        {
            this.Active = true;
        }

        public Relacao(JogadorId jog1, JogadorId jog2, List<string> tags, int fr, int fl)
        {
            this.Id = new RelacaoId(Guid.NewGuid());
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
            if(tag != null){ 
            foreach (string t in tag)
            {
                tagsList.Add(new Tag(t));
            }}
            this.Tags = tagsList;
        }

        public void ChangeTags(List<string> tags)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar as tags de uma relação inativa.");
            setTags(tags);
        }

        public void ChangeForcaLigacao(int forca)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar a força de ligação de uma relação inativa.");
            this.ForcaLigacao = new ForcaLigacao(forca);
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}