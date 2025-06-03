namespace bakdel.Controllers.Models;

public class Hund
{
    public int Id { get; set; }
    public required string navn { get; set; }
    public required string rase { get; set; }
    public int alder { get; set; }
    public required string spesielleBehov { get; set; }
}