using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Families;

namespace DDDSample1.Infrastructure.Families
{
    internal class FamilyEntityTypeConfiguration : IEntityTypeConfiguration<Family>
    {
        public void Configure(EntityTypeBuilder<Family> builder)
        {
            //builder.ToTable("Families", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            //builder.Property(b => b.Id).HasConversion(i => i.AsString(), i => new FamilyId(i));
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}