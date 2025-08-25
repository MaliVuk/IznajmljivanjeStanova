using BACKEND.Models;
using Microsoft.EntityFrameworkCore;

namespace BACKEND.Data
{
    public class EdunovaContext : DbContext
    {
        public EdunovaContext(DbContextOptions<EdunovaContext> options)
            : base(options)
        {
        }

        // DbSet-ovi za sve entitete
        public DbSet<Stan> Stanovi { get; set; } = null!;
        public DbSet<Najmodavac> Najmodavci { get; set; } = null!;
        public DbSet<Najmoprimac> Najmoprimci { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        }
    }
}