namespace bakdel.Controllers.Models;

public class Foresporsler
{
    public int Id { get; set; }
    public int eierID { get; set; }
    public int passerID { get; set; }
    public required DateTime dato { get; set; }
    public bool akseptert { get; set; }

    public required string rapport { get; set; }
    public int vurdering { get; set; }
    public required string kommentar { get; set; }
    public bool fullfort { get; set; }
    public bool betalt { get; set; } 
    
}