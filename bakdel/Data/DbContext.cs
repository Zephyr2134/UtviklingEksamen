using Microsoft.EntityFrameworkCore;
using bakdel.Controllers.Models;

namespace bakdel.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<HundeEier> hundeEiere { get; set; }
    public DbSet<HundePasser> hundePassere { get; set; }
    public DbSet<Hund> hunder { get; set; }
    public DbSet<Foresporsler> Foresporsler { get; set; }
}
