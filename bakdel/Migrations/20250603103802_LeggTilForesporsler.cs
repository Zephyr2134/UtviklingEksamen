using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bakdel.Migrations
{
    /// <inheritdoc />
    public partial class LeggTilForesporsler : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Foresporsler",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    eierID = table.Column<int>(type: "INTEGER", nullable: false),
                    passerID = table.Column<int>(type: "INTEGER", nullable: false),
                    dato = table.Column<DateTime>(type: "TEXT", nullable: false),
                    akseptert = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Foresporsler", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Foresporsler");
        }
    }
}
