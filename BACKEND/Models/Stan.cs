namespace BACKEND.Models
{
    public class Stan : Entitet
    {
        public string Adresa { get; set; } = "";
        public DateTime DatumUplateStanarine { get; set; }
        public Najmodavac[]? Najmodavac { get; set; }




    }
}