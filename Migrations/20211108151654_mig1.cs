using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DDDNetCore.Migrations
{
    public partial class mig1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Families",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Families", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Perfis",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    nome_Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    nome_Active = table.Column<bool>(type: "bit", nullable: true),
                    email_EnderecoEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email_Active = table.Column<bool>(type: "bit", nullable: true),
                    telefone_NumTelefone = table.Column<long>(type: "bigint", nullable: true),
                    telefone_Active = table.Column<bool>(type: "bit", nullable: true),
                    dataNascimento_DataNasc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    dataNascimento_Active = table.Column<bool>(type: "bit", nullable: true),
                    estadoHumor = table.Column<int>(type: "int", nullable: false),
                    password_password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    password_Active = table.Column<bool>(type: "bit", nullable: true),
                    perfilFacebook_PerfilFace = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    perfilFacebook_Active = table.Column<bool>(type: "bit", nullable: true),
                    perfilLinkedin_Linkedin = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    perfilLinkedin_Active = table.Column<bool>(type: "bit", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Perfis", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Texto_Descricao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Texto_Active = table.Column<bool>(type: "bit", nullable: true),
                    Tags_Descricao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tags_Active = table.Column<bool>(type: "bit", nullable: true),
                    Comentario_Texto = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Comentario_Active = table.Column<bool>(type: "bit", nullable: true),
                    LikeDislike_Descricao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LikeDislike_Active = table.Column<bool>(type: "bit", nullable: true),
                    ForcaLigacao_Valor = table.Column<int>(type: "int", nullable: true),
                    ForcaLigacao_Active = table.Column<bool>(type: "bit", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Jogadores",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Pontuacao_Pontos = table.Column<int>(type: "int", nullable: true),
                    Pontuacao_Active = table.Column<bool>(type: "bit", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    perfilId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jogadores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Jogadores_Perfis_perfilId",
                        column: x => x.perfilId,
                        principalTable: "Perfis",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Perfis_tags",
                columns: table => new
                {
                    PerfilId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descricao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Perfis_tags", x => new { x.PerfilId, x.Id });
                    table.ForeignKey(
                        name: "FK_Perfis_tags_Perfis_PerfilId",
                        column: x => x.PerfilId,
                        principalTable: "Perfis",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Introducoes",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    JogadorInicialId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    JogadorIntrodutorId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    JogadorObjetivoId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    EstadoIntroducao = table.Column<int>(type: "int", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Introducoes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Introducoes_Jogadores_JogadorInicialId",
                        column: x => x.JogadorInicialId,
                        principalTable: "Jogadores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Introducoes_Jogadores_JogadorIntrodutorId",
                        column: x => x.JogadorIntrodutorId,
                        principalTable: "Jogadores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Introducoes_Jogadores_JogadorObjetivoId",
                        column: x => x.JogadorObjetivoId,
                        principalTable: "Jogadores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Ligacoes",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TextoLigacao_Texto = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TextoLigacao_Active = table.Column<bool>(type: "bit", nullable: true),
                    EstadoLigacao = table.Column<int>(type: "int", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    Jogador1Id = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Jogador2Id = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ligacoes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ligacoes_Jogadores_Jogador1Id",
                        column: x => x.Jogador1Id,
                        principalTable: "Jogadores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Ligacoes_Jogadores_Jogador2Id",
                        column: x => x.Jogador2Id,
                        principalTable: "Jogadores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Missoes",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Dificuldade_GrauDificuldade = table.Column<int>(type: "int", nullable: true),
                    Dificuldade_Active = table.Column<bool>(type: "bit", nullable: true),
                    Data_Date = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Data_Active = table.Column<bool>(type: "bit", nullable: true),
                    JogadorObjetivoId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Missoes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Missoes_Jogadores_JogadorObjetivoId",
                        column: x => x.JogadorObjetivoId,
                        principalTable: "Jogadores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Relacoes",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Jogador1Id = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Jogador2Id = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ForcaRelacao_Valor = table.Column<int>(type: "int", nullable: true),
                    ForcaRelacao_Active = table.Column<bool>(type: "bit", nullable: true),
                    ForcaLigacao_Valor = table.Column<int>(type: "int", nullable: true),
                    ForcaLigacao_Active = table.Column<bool>(type: "bit", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Relacoes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Relacoes_Jogadores_Jogador1Id",
                        column: x => x.Jogador1Id,
                        principalTable: "Jogadores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Relacoes_Jogadores_Jogador2Id",
                        column: x => x.Jogador2Id,
                        principalTable: "Jogadores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Relacoes_Tags",
                columns: table => new
                {
                    RelacaoId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descricao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Relacoes_Tags", x => new { x.RelacaoId, x.Id });
                    table.ForeignKey(
                        name: "FK_Relacoes_Tags_Relacoes_RelacaoId",
                        column: x => x.RelacaoId,
                        principalTable: "Relacoes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Introducoes_JogadorInicialId",
                table: "Introducoes",
                column: "JogadorInicialId");

            migrationBuilder.CreateIndex(
                name: "IX_Introducoes_JogadorIntrodutorId",
                table: "Introducoes",
                column: "JogadorIntrodutorId");

            migrationBuilder.CreateIndex(
                name: "IX_Introducoes_JogadorObjetivoId",
                table: "Introducoes",
                column: "JogadorObjetivoId");

            migrationBuilder.CreateIndex(
                name: "IX_Jogadores_perfilId",
                table: "Jogadores",
                column: "perfilId");

            migrationBuilder.CreateIndex(
                name: "IX_Ligacoes_Jogador1Id",
                table: "Ligacoes",
                column: "Jogador1Id");

            migrationBuilder.CreateIndex(
                name: "IX_Ligacoes_Jogador2Id",
                table: "Ligacoes",
                column: "Jogador2Id");

            migrationBuilder.CreateIndex(
                name: "IX_Missoes_JogadorObjetivoId",
                table: "Missoes",
                column: "JogadorObjetivoId");

            migrationBuilder.CreateIndex(
                name: "IX_Relacoes_Jogador1Id",
                table: "Relacoes",
                column: "Jogador1Id");

            migrationBuilder.CreateIndex(
                name: "IX_Relacoes_Jogador2Id",
                table: "Relacoes",
                column: "Jogador2Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Families");

            migrationBuilder.DropTable(
                name: "Introducoes");

            migrationBuilder.DropTable(
                name: "Ligacoes");

            migrationBuilder.DropTable(
                name: "Missoes");

            migrationBuilder.DropTable(
                name: "Perfis_tags");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "Relacoes_Tags");

            migrationBuilder.DropTable(
                name: "Relacoes");

            migrationBuilder.DropTable(
                name: "Jogadores");

            migrationBuilder.DropTable(
                name: "Perfis");
        }
    }
}
