using System.ComponentModel.DataAnnotations.Schema;

namespace BACKEND.Models
{
    [Table("stan")]
    public class Stan : Entitet
    {
        public string Adresa { get; set; } = "";

        [Column("datum_uplate_stanarine")]
        public DateTime? DatumUplateStanarine { get; set; }

        [Column("najmodavac")]
        public int Najmodavac { get; set; }  // FK

        [ForeignKey("Najmodavac")]
        public Najmodavac NajmodavacNavigation { get; set; } = new Najmodavac();
    }
}
