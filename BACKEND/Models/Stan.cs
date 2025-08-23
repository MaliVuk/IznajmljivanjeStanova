using System.ComponentModel.DataAnnotations.Schema;

namespace BACKEND.Models
{
    [Table(name: "stan")]
    public class Stan : Entitet
    {
        public string Adresa { get; set; } = "";
        [Column(name: "datum_uplate_stanarine")]
        public DateTime? DatumUplateStanarine { get; set; }
        [ForeignKey("najmodavac")]
        public Najmodavac Najmodavac { get; set; } = new Najmodavac();
    }
}
