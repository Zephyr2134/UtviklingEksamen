namespace bakdel.Controllers.Models;

public class HundePasser
{
    public int Id { get; set; }
    public required string brukernavn { get; set; }
    public required string passord { get; set; }
    public bool aktiv { get; set; }
    public required string telefon { get; set; }
    public required string omraade { get; set; }
    public required int pris { get; set; }
}