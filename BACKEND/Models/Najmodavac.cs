using System.ComponentModel.DataAnnotations.Schema;

namespace BACKEND.Models
{
    [Table(name:"najmodavac")]
    public class Najmodavac : Entitet
    {
        public string Ime { get; set; } = "";
        public string Prezime { get; set; } = "";
    }
}
