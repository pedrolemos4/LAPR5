﻿// <auto-generated />
using System;
using DDDSample1.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DDDNetCore.Migrations
{
    [DbContext(typeof(DDDSample1DbContext))]
    [Migration("20220112195134_mig1")]
    partial class mig1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.11")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DDDSample1.Domain.Introducoes.Introducao", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<int>("EstadoIntroducao")
                        .HasColumnType("int");

                    b.Property<string>("JogadorInicial")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("JogadorIntrodutor")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("JogadorObjetivo")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Introducoes");
                });

            modelBuilder.Entity("DDDSample1.Domain.Jogadores.Jogador", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<string>("Perfil")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Jogadores");
                });

            modelBuilder.Entity("DDDSample1.Domain.Ligacoes.Ligacao", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<int>("EstadoLigacao")
                        .HasColumnType("int");

                    b.Property<string>("Jogador1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Jogador2")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Ligacoes");
                });

            modelBuilder.Entity("DDDSample1.Domain.Missoes.Missao", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<string>("JogadorObjetivoId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("JogadorObjetivoId");

                    b.ToTable("Missoes");
                });

            modelBuilder.Entity("DDDSample1.Domain.Perfis.Perfil", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Perfis");
                });

            modelBuilder.Entity("DDDSample1.Domain.Posts.Post", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<string>("JogadorId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("JogadorId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("DDDSample1.Domain.Relacoes.Relacao", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<string>("Jogador1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Jogador2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("JogadorId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("JogadorId");

                    b.ToTable("Relacoes");
                });

            modelBuilder.Entity("DDDSample1.Domain.Introducoes.Introducao", b =>
                {
                    b.OwnsOne("DDDSample1.Domain.Introducoes.TextoIntroducao", "TextoIntroducao", b1 =>
                        {
                            b1.Property<string>("IntroducaoId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<string>("Texto")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("IntroducaoId");

                            b1.ToTable("Introducoes");

                            b1.WithOwner()
                                .HasForeignKey("IntroducaoId");
                        });

                    b.Navigation("TextoIntroducao");
                });

            modelBuilder.Entity("DDDSample1.Domain.Jogadores.Jogador", b =>
                {
                    b.OwnsOne("DDDSample1.Domain.Jogadores.Pontuacao", "Pontuacao", b1 =>
                        {
                            b1.Property<string>("JogadorId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<int>("Pontos")
                                .HasColumnType("int");

                            b1.HasKey("JogadorId");

                            b1.ToTable("Jogadores");

                            b1.WithOwner()
                                .HasForeignKey("JogadorId");
                        });

                    b.Navigation("Pontuacao");
                });

            modelBuilder.Entity("DDDSample1.Domain.Ligacoes.Ligacao", b =>
                {
                    b.OwnsOne("DDDSample1.Domain.Ligacoes.TextoLigacao", "TextoLigacao", b1 =>
                        {
                            b1.Property<string>("LigacaoId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<string>("Texto")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("LigacaoId");

                            b1.ToTable("Ligacoes");

                            b1.WithOwner()
                                .HasForeignKey("LigacaoId");
                        });

                    b.Navigation("TextoLigacao");
                });

            modelBuilder.Entity("DDDSample1.Domain.Missoes.Missao", b =>
                {
                    b.HasOne("DDDSample1.Domain.Jogadores.Jogador", "JogadorObjetivo")
                        .WithMany("ListaMissoes")
                        .HasForeignKey("JogadorObjetivoId");

                    b.OwnsOne("DDDSample1.Domain.Missoes.Data", "Data", b1 =>
                        {
                            b1.Property<string>("MissaoId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<string>("Date")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("MissaoId");

                            b1.ToTable("Missoes");

                            b1.WithOwner()
                                .HasForeignKey("MissaoId");
                        });

                    b.OwnsOne("DDDSample1.Domain.Missoes.Dificuldade", "Dificuldade", b1 =>
                        {
                            b1.Property<string>("MissaoId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<int>("GrauDificuldade")
                                .HasColumnType("int");

                            b1.HasKey("MissaoId");

                            b1.ToTable("Missoes");

                            b1.WithOwner()
                                .HasForeignKey("MissaoId");
                        });

                    b.Navigation("Data");

                    b.Navigation("Dificuldade");

                    b.Navigation("JogadorObjetivo");
                });

            modelBuilder.Entity("DDDSample1.Domain.Perfis.Perfil", b =>
                {
                    b.OwnsOne("DDDSample1.Domain.Perfis.Avatar", "avatar", b1 =>
                        {
                            b1.Property<string>("PerfilId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<string>("avatar")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("PerfilId");

                            b1.ToTable("Perfis");

                            b1.WithOwner()
                                .HasForeignKey("PerfilId");
                        });

                    b.OwnsOne("DDDSample1.Domain.Perfis.Cidade", "cidade", b1 =>
                        {
                            b1.Property<string>("PerfilId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<string>("City")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("PerfilId");

                            b1.ToTable("Perfis");

                            b1.WithOwner()
                                .HasForeignKey("PerfilId");
                        });

                    b.OwnsOne("DDDSample1.Domain.Perfis.DataNascimento", "dataNascimento", b1 =>
                        {
                            b1.Property<string>("PerfilId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<DateTime>("DataNasc")
                                .HasColumnType("datetime2");

                            b1.HasKey("PerfilId");

                            b1.ToTable("Perfis");

                            b1.WithOwner()
                                .HasForeignKey("PerfilId");
                        });

                    b.OwnsOne("DDDSample1.Domain.Perfis.Email", "email", b1 =>
                        {
                            b1.Property<string>("PerfilId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<string>("EnderecoEmail")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("PerfilId");

                            b1.ToTable("Perfis");

                            b1.WithOwner()
                                .HasForeignKey("PerfilId");
                        });

                    b.OwnsMany("DDDSample1.Domain.Perfis.EstadoHumor", "estadoHumor", b1 =>
                        {
                            b1.Property<string>("PerfilId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int")
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<string>("Estado")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<decimal>("Valor")
                                .HasColumnType("decimal(18,2)");

                            b1.HasKey("PerfilId", "Id");

                            b1.ToTable("EstadoHumor");

                            b1.WithOwner()
                                .HasForeignKey("PerfilId");
                        });

                    b.OwnsOne("DDDSample1.Domain.Perfis.Nome", "nome", b1 =>
                        {
                            b1.Property<string>("PerfilId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<string>("Name")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("PerfilId");

                            b1.ToTable("Perfis");

                            b1.WithOwner()
                                .HasForeignKey("PerfilId");
                        });

                    b.OwnsOne("DDDSample1.Domain.Perfis.Pais", "pais", b1 =>
                        {
                            b1.Property<string>("PerfilId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<string>("Country")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("PerfilId");

                            b1.ToTable("Perfis");

                            b1.WithOwner()
                                .HasForeignKey("PerfilId");
                        });

                    b.OwnsOne("DDDSample1.Domain.Perfis.Password", "password", b1 =>
                        {
                            b1.Property<string>("PerfilId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<string>("password")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("PerfilId");

                            b1.ToTable("Perfis");

                            b1.WithOwner()
                                .HasForeignKey("PerfilId");
                        });

                    b.OwnsOne("DDDSample1.Domain.Perfis.PerfilFacebook", "perfilFacebook", b1 =>
                        {
                            b1.Property<string>("PerfilId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<string>("PerfilFace")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("PerfilId");

                            b1.ToTable("Perfis");

                            b1.WithOwner()
                                .HasForeignKey("PerfilId");
                        });

                    b.OwnsOne("DDDSample1.Domain.Perfis.PerfilLinkedin", "perfilLinkedin", b1 =>
                        {
                            b1.Property<string>("PerfilId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<string>("Linkedin")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("PerfilId");

                            b1.ToTable("Perfis");

                            b1.WithOwner()
                                .HasForeignKey("PerfilId");
                        });

                    b.OwnsOne("DDDSample1.Domain.Perfis.Telefone", "telefone", b1 =>
                        {
                            b1.Property<string>("PerfilId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<long>("NumTelefone")
                                .HasColumnType("bigint");

                            b1.HasKey("PerfilId");

                            b1.ToTable("Perfis");

                            b1.WithOwner()
                                .HasForeignKey("PerfilId");
                        });

                    b.OwnsMany("DDDSample1.Domain.SharedValueObjects.Tag", "tags", b1 =>
                        {
                            b1.Property<string>("PerfilId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int")
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<string>("Descricao")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("PerfilId", "Id");

                            b1.ToTable("Perfis_tags");

                            b1.WithOwner()
                                .HasForeignKey("PerfilId");
                        });

                    b.Navigation("avatar");

                    b.Navigation("cidade");

                    b.Navigation("dataNascimento");

                    b.Navigation("email");

                    b.Navigation("estadoHumor");

                    b.Navigation("nome");

                    b.Navigation("pais");

                    b.Navigation("password");

                    b.Navigation("perfilFacebook");

                    b.Navigation("perfilLinkedin");

                    b.Navigation("tags");

                    b.Navigation("telefone");
                });

            modelBuilder.Entity("DDDSample1.Domain.Posts.Post", b =>
                {
                    b.HasOne("DDDSample1.Domain.Jogadores.Jogador", null)
                        .WithMany("ListaPosts")
                        .HasForeignKey("JogadorId");

                    b.OwnsMany("DDDSample1.Domain.Posts.Comentario", "Comentario", b1 =>
                        {
                            b1.Property<string>("PostId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int")
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<string>("Texto")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("PostId", "Id");

                            b1.ToTable("Comentario");

                            b1.WithOwner()
                                .HasForeignKey("PostId");
                        });

                    b.OwnsOne("DDDSample1.Domain.Posts.LikeDislike", "LikeDislike", b1 =>
                        {
                            b1.Property<string>("PostId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<string>("Descricao")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("PostId");

                            b1.ToTable("Posts");

                            b1.WithOwner()
                                .HasForeignKey("PostId");
                        });

                    b.OwnsOne("DDDSample1.Domain.Posts.Texto", "Texto", b1 =>
                        {
                            b1.Property<string>("PostId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<string>("Descricao")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("PostId");

                            b1.ToTable("Posts");

                            b1.WithOwner()
                                .HasForeignKey("PostId");
                        });

                    b.OwnsMany("DDDSample1.Domain.SharedValueObjects.Tag", "Tags", b1 =>
                        {
                            b1.Property<string>("PostId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int")
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<string>("Descricao")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("PostId", "Id");

                            b1.ToTable("Posts_Tags");

                            b1.WithOwner()
                                .HasForeignKey("PostId");
                        });

                    b.Navigation("Comentario");

                    b.Navigation("LikeDislike");

                    b.Navigation("Tags");

                    b.Navigation("Texto");
                });

            modelBuilder.Entity("DDDSample1.Domain.Relacoes.Relacao", b =>
                {
                    b.HasOne("DDDSample1.Domain.Jogadores.Jogador", null)
                        .WithMany("ListaRelacoes")
                        .HasForeignKey("JogadorId");

                    b.OwnsOne("DDDSample1.Domain.Relacoes.ForcaRelacao", "ForcaRelacao", b1 =>
                        {
                            b1.Property<string>("RelacaoId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<int>("Valor")
                                .HasColumnType("int");

                            b1.HasKey("RelacaoId");

                            b1.ToTable("Relacoes");

                            b1.WithOwner()
                                .HasForeignKey("RelacaoId");
                        });

                    b.OwnsOne("DDDSample1.Domain.SharedValueObjects.ForcaLigacao", "ForcaLigacao", b1 =>
                        {
                            b1.Property<string>("RelacaoId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<int>("Valor")
                                .HasColumnType("int");

                            b1.HasKey("RelacaoId");

                            b1.ToTable("Relacoes");

                            b1.WithOwner()
                                .HasForeignKey("RelacaoId");
                        });

                    b.OwnsMany("DDDSample1.Domain.SharedValueObjects.Tag", "Tags", b1 =>
                        {
                            b1.Property<string>("RelacaoId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int")
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<bool>("Active")
                                .HasColumnType("bit");

                            b1.Property<string>("Descricao")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("RelacaoId", "Id");

                            b1.ToTable("Relacoes_Tags");

                            b1.WithOwner()
                                .HasForeignKey("RelacaoId");
                        });

                    b.Navigation("ForcaLigacao");

                    b.Navigation("ForcaRelacao");

                    b.Navigation("Tags");
                });

            modelBuilder.Entity("DDDSample1.Domain.Jogadores.Jogador", b =>
                {
                    b.Navigation("ListaMissoes");

                    b.Navigation("ListaPosts");

                    b.Navigation("ListaRelacoes");
                });
#pragma warning restore 612, 618
        }
    }
}
