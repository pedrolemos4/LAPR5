using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Categories;
using DDDSample1.Domain.Products;
using DDDSample1.Domain.Families;
using DDDSample1.Domain.Missoes;
using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Ligacoes;
using DDDSample1.Domain.Posts;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Relacoes;
using DDDSample1.Domain.Introducoes;
using DDDSample1.Infrastructure.Categories;
using DDDSample1.Infrastructure.Products;
using DDDSample1.Infrastructure.Introducoes;
using DDDSample1.Infrastructure.Jogadores;
using DDDSample1.Infrastructure.Ligacoes;
using DDDSample1.Infrastructure.Missoes;
using DDDSample1.Infrastructure.Perfis;
using DDDSample1.Infrastructure.Posts;
using DDDSample1.Infrastructure.Relacoes;



namespace DDDSample1.Infrastructure
{
    public class DDDSample1DbContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Family> Families { get; set; }

        public DbSet<Jogador> Jogadores { get; set; }

        public DbSet<Missao> Missoes { get; set; }

        public DbSet<Perfil> Perfis { get; set; }

        public DbSet<Ligacao> Ligacoes { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<Relacao> Relacoes { get; set; }

        public DbSet<Introducao> Introducoes { get; set; }

        public DDDSample1DbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CategoryEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ProductEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new FamilyEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new JogadorEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new MissaoEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new PerfilEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new LigacaoEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new PostEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RelacaoEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new IntroducaoEntityTypeConfiguration());
        }
    }
}