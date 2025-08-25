public class NajmoprimacDTORead
{
    public int Sifra { get; set; }
    public string ime_ili_naziv { get; set; } = "";
    public string Kontakt { get; set; } = "";
}

public class NajmoprimacDTOCreate
{
    public string ime_ili_naziv { get; set; } = "";
    public string Kontakt { get; set; } = "";
}