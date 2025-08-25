using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BACKEND.Models
{

    [Table("najmoprimac")]
    public class Najmoprimac
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Sifra { get; set; }   // Primarni ključ

        [Required]
        [MaxLength(100)]
        public string ime_ili_naziv { get; set; } = "";  // Ime osobe ili naziv firme

        [MaxLength(50)]
        public string Kontakt { get; set; } = "";        // Kontakt podaci (telefon, email...)
    }
}