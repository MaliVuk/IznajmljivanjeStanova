using System.ComponentModel.DataAnnotations.Schema;

namespace BACKEND.Models
{
    [Table(name:"najmodavac")]
    public class Najmodavac : Entitet
    {
        public string ime { get; set; } = "";
        public string prezime { get; set; } = "";
    }
}
