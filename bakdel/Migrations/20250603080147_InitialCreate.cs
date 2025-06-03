using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bakdel.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "hundeEiere",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    brukernavn = table.Column<string>(type: "TEXT", nullable: false),
                    passord = table.Column<string>(type: "TEXT", nullable: false),
                    telefon = table.Column<string>(type: "TEXT", nullable: false),
                    adresse = table.Column<string>(type: "TEXT", nullable: false),
                    hundID = table.Column<int>(type: "INTEGER", nullable: false),
                    hundBildePlassering = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_hundeEiere", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "hundePassere",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    brukernavn = table.Column<string>(type: "TEXT", nullable: false),
                    passord = table.Column<string>(type: "TEXT", nullable: false),
                    telefon = table.Column<string>(type: "TEXT", nullable: false),
                    omraade = table.Column<string>(type: "TEXT", nullable: false),
                    pris = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_hundePassere", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "hunder",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    navn = table.Column<string>(type: "TEXT", nullable: false),
                    rase = table.Column<string>(type: "TEXT", nullable: false),
                    alder = table.Column<int>(type: "INTEGER", nullable: false),
                    spesielleBehov = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_hunder", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "hundeEiere");

            migrationBuilder.DropTable(
                name: "hundePassere");

            migrationBuilder.DropTable(
                name: "hunder");
        }
    }
}
