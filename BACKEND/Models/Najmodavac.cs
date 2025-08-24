using System.ComponentModel.DataAnnotations.Schema;

namespace BACKEND.Models
{
    [Table("najmodavac")]
    public class Najmodavac : Entitet
    {
        public string Ime { get; set; } = "";
        public string Prezime { get; set; } = "";

        // Navigacijsko svojstvo: jedan Najmodavac može imati više stanova
        public ICollection<Stan> Stanovi { get; set; } = new List<Stan>();
    }
}