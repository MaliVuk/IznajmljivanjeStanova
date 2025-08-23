using System.ComponentModel.DataAnnotations.Schema;

namespace BACKEND.Models
{
    [Table(name:"najmoprimac")]
    public class Najmoprimac : Entitet
    {
        [Column(name: "ime_ili_naziv")]
        public string ImeNaziv { get; set; } = "";
        public string Kontakt { get; set; } = "";
    }
}
