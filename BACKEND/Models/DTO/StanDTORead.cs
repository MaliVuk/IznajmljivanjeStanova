namespace BACKEND.Models.DTO
{
    public class StanDTORead
    {
        public int Sifra { get; set; }
        public string Adresa { get; set; } = "";
        public DateTime? DatumUplateStanarine { get; set; }

        public int Najmodavac { get; set; } // FK
        public string NajmodavacIme { get; set; } = ""; // Ime i prezime zajedno
        public object NajmodavacPrezime { get; internal set; }
    }

    public class StanDTOCreate
    {
        public string Adresa { get; set; } = "";
        public DateTime? DatumUplateStanarine { get; set; }
        public int Najmodavac { get; set; } // FK
    }
}