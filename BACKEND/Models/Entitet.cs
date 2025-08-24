using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BACKEND.Models
{
    public class Entitet
    {
        [Key] // ovo kaže EF-u da je primarni ključ
        public int Sifra { get; set; }
    }
}