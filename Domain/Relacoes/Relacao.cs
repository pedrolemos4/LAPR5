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

        public Relacao(string code, Tag tags, ForcaRelacao forcaRelacao, ForcaLigacao fl)
        {
            this.Id = new RelacaoId(code);
            this.Tags = tags;
            this.ForcaRelacao = fr;
            this.ForcaLigacao = fl;
            this.Active = true;
        }

        public void ChangeTags(Tag tags)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the tags to an inactive relationship.");
            this.Tags = tags;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}