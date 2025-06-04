namespace bakdel.Controllers.Models;

public class HundeEier
{
    public int Id { get; set; }
    public required string brukernavn { get; set; }
    public required string passord { get; set; }
    public bool aktiv { get; set; }
    public required string telefon { get; set; }
    public required string adresse { get; set; }
    public required int hundID { get; set; }
    public required string hundBildePlassering { get; set; }
}