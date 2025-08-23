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
        public DbSet<Najmoprimac> Najmoprimci { get; set; }
    }
}