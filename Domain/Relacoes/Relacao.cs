using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SharedValueObjects;

namespace DDDSample1.Domain.Relacoes
{
    public class Relacao : Entity<RelacaoId>, IAggregateRoot
    {

        public Tag Tags { get;  private set; }

        public ForcaRelacao ForcaRelacao { get;  private set; }

        public ForcaLigacao ForcaLigacao { get;  private set; }

        public bool Active{ get;  private set; }

        private Relacao()
        {
            this.Active = true;
        }

        public Relacao(string code, string tags, int fr, int fl)
        {
            this.Id = new RelacaoId(code);
            this.Tags = new Tag(tags);
            this.ForcaRelacao = new ForcaRelacao(fr);
            this.ForcaLigacao = new ForcaLigacao(fl);
            this.Active = true;
        }

        public void ChangeTags(string tags)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the tags to an inactive relationship.");
            this.Tags = new Tag(tags);
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}