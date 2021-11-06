using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Ligacoes;

namespace DDDSample1.Infrastructure.Ligacoes
{
    internal class LigacaoEntityTypeConfiguration : IEntityTypeConfiguration<Ligacao>
    {
        public void Configure(EntityTypeBuilder<Ligacao> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
            
            //builder.ToTable("Categories", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}