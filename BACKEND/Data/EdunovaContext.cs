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

            // Konfiguracija veze Stan -> Najmodavac
            modelBuilder.Entity<Stan>()
                .HasOne(s => s.NajmodavacNavigation)  // navigacijsko svojstvo
                .WithMany(n => n.Stanovi)             // jedan Najmodavac ima više stanova
                .HasForeignKey(s => s.Najmodavac)    // FK u tabeli Stan
                .OnDelete(DeleteBehavior.Restrict);   // opcionalno, da se ne brišu stanovi

            // ⚠️ Maknuto jer Najmoprimac više nema kolekciju Stanovi
            // modelBuilder.Entity<Najmoprimac>()
            //     .HasMany(n => n.Stanovi)
            //     .WithOne()
            //     .OnDelete(DeleteBehavior.Restrict);
        }
    }
}