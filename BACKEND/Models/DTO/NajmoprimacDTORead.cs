public class NajmoprimacDTORead
{
    public int Sifra { get; set; }
    public string Ime_ili_Naziv { get; set; } = "";
    public string Kontakt { get; set; } = "";
}

public class NajmoprimacDTOCreate
{
    public string Ime_ili_Naziv { get; set; } = "";
    public string Kontakt { get; set; } = "";
}