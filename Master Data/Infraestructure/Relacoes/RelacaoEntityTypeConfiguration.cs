using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Relacoes;

namespace DDDSample1.Infrastructure.Relacoes
{
    internal class RelacaoEntityTypeConfiguration : IEntityTypeConfiguration<Relacao>
    {
        public void Configure(EntityTypeBuilder<Relacao> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
            
            //builder.ToTable("Relacoes", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}