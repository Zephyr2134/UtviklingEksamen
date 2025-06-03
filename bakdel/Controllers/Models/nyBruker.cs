namespace bakdel.Controllers.Models;

public class nyBruker
{
    public required string rolle { get; set; }
    public required string brukernavn { get; set; }
    public required string passord { get; set; }
    public required string telefon { get; set; }
    public required string adresse { get; set; }
    public required Hund hund { get; set; }
    public required string hundBildePlassering { get; set; }
    public required string omraade { get; set; }
    public required int pris { get; set; }
}