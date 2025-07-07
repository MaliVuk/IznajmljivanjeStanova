using BACKEND.Models;
using Microsoft.EntityFrameworkCore;

namespace BACKEND.Data
{
    public class EdunovaContext : DbContext
    {
        public EdunovaContext(DbContextOptions<EdunovaContext> options) : base(options)
        {
        }

        // This DbSet property is correctly named (pluralized in C# convention)
        public DbSet<Najmodavac> Najmodavci { get; set; }

        // --- This is the crucial part that resolves your error ---
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // We're explicitly telling Entity Framework Core that the 'Najmodavac' C# entity
            // should map to a database table named 'najmodavac' (all lowercase, singular).
            // This overrides EF Core's default pluralization convention, which would
            // otherwise look for 'Najmodavci'.
            modelBuilder.Entity<Najmodavac>().ToTable("najmodavac");

            // Add any other entity configurations here if needed.
            // For example, if you have another entity 'Mjesto' that maps to a table 'mjesto':
            // modelBuilder.Entity<Mjesto>().ToTable("mjesto");
        }
    }
}