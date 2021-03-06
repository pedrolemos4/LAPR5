using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DDDNetCore.Migrations
{
    public partial class mig1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Introducoes",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    JogadorInicial = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JogadorIntrodutor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JogadorObjetivo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EstadoIntroducao = table.Column<int>(type: "int", nullable: false),
                    TextoIntroducao_Texto = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TextoIntroducao_Active = table.Column<bool>(type: "bit", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Introducoes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Jogadores",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Pontuacao_Pontos = table.Column<int>(type: "int", nullable: true),
                    Pontuacao_Active = table.Column<bool>(type: "bit", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    Perfil = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jogadores", x => x.Id);
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
                    Jogador1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Jogador2 = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ligacoes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Perfis",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    avatar_avatar = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    avatar_Active = table.Column<bool>(type: "bit", nullable: true),
                    nome_Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    nome_Active = table.Column<bool>(type: "bit", nullable: true),
                    email_EnderecoEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email_Active = table.Column<bool>(type: "bit", nullable: true),
                    telefone_NumTelefone = table.Column<long>(type: "bigint", nullable: true),
                    telefone_Active = table.Column<bool>(type: "bit", nullable: true),
                    pais_Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    pais_Active = table.Column<bool>(type: "bit", nullable: true),
                    cidade_City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    cidade_Active = table.Column<bool>(type: "bit", nullable: true),
                    dataNascimento_DataNasc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    dataNascimento_Active = table.Column<bool>(type: "bit", nullable: true),
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
                name: "Relacoes",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Jogador1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Jogador2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ForcaRelacao_Valor = table.Column<int>(type: "int", nullable: true),
                    ForcaRelacao_Active = table.Column<bool>(type: "bit", nullable: true),
                    ForcaLigacao_Valor = table.Column<int>(type: "int", nullable: true),
                    ForcaLigacao_Active = table.Column<bool>(type: "bit", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    JogadorId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Relacoes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Relacoes_Jogadores_JogadorId",
                        column: x => x.JogadorId,
                        principalTable: "Jogadores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EstadoHumor",
                columns: table => new
                {
                    PerfilId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Estado = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Valor = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstadoHumor", x => new { x.PerfilId, x.Id });
                    table.ForeignKey(
                        name: "FK_EstadoHumor_Perfis_PerfilId",
                        column: x => x.PerfilId,
                        principalTable: "Perfis",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                name: "IX_Relacoes_JogadorId",
                table: "Relacoes",
                column: "JogadorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EstadoHumor");

            migrationBuilder.DropTable(
                name: "Introducoes");

            migrationBuilder.DropTable(
                name: "Ligacoes");

            migrationBuilder.DropTable(
                name: "Perfis_tags");

            migrationBuilder.DropTable(
                name: "Relacoes_Tags");

            migrationBuilder.DropTable(
                name: "Perfis");

            migrationBuilder.DropTable(
                name: "Relacoes");

            migrationBuilder.DropTable(
                name: "Jogadores");
        }
    }
}
