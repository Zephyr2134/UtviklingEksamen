using bakdel.Controllers.Models;
using Microsoft.AspNetCore.Mvc;
using bakdel.Data;
using Microsoft.EntityFrameworkCore;

namespace bakdel.Controllers;

[ApiController]
[Route("[controller]")]
public class HundePassController : ControllerBase
{

    private readonly AppDbContext _context;

    public HundePassController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("/login")]
    public async Task<ActionResult> login([FromBody] LoginBruker bruker)
    {
        var eier = await _context.hundeEiere.FirstOrDefaultAsync(e => e.brukernavn == bruker.brukernavn && e.passord == bruker.passord);
        if (eier != null)
        {
            return Ok(eier);
        }
        else
        {
            var passer = await _context.hundePassere.FirstOrDefaultAsync(p => p.brukernavn == bruker.brukernavn && p.passord == bruker.passord);
            if (passer != null)
            {
                return Ok(passer);
            }
            else
            {
                return BadRequest();
            }
        }
    }
    [HttpPost("/lagBruker")]
    public async Task<ActionResult> lagBruker([FromBody] nyBruker ny)
    {
        var eier = await _context.hundeEiere.FirstOrDefaultAsync(e => e.brukernavn == ny.brukernavn);
        var passer = await _context.hundePassere.FirstOrDefaultAsync(p => p.brukernavn == ny.brukernavn);
        if (eier == null && passer == null)
        {
            if (ny.rolle == "eier")
            {
                var nyHund = new Hund { navn = ny.hund.navn, alder = ny.hund.alder, rase = ny.hund.rase, spesielleBehov = ny.hund.spesielleBehov };
                _context.hunder.Add(nyHund);
                await _context.SaveChangesAsync();
                var hund = await _context.hunder.FirstOrDefaultAsync(h => h.navn == nyHund.navn && h.alder == nyHund.alder && h.rase == nyHund.rase && h.spesielleBehov == nyHund.spesielleBehov);
                var nyEier = new HundeEier { brukernavn = ny.brukernavn, passord = ny.passord, adresse = ny.adresse, telefon = ny.telefon, hundID = hund.Id, hundBildePlassering = ny.hundBildePlassering };
                _context.hundeEiere.Add(nyEier);
                await _context.SaveChangesAsync();

                return Ok();
            }
            else if (ny.rolle == "passer")
            {
                var nyPasser = new HundePasser { brukernavn = ny.brukernavn, passord = ny.passord, omraade = ny.omraade, pris = ny.pris, telefon = ny.telefon };
                _context.hundePassere.Add(nyPasser);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }
        return BadRequest();
    }
    [HttpPost("/bilde")]
    public async Task<IActionResult> LastOppBilde([FromForm] IFormFile bilde)
    {
        if (bilde == null || bilde.Length == 0)
        {
            return BadRequest("Ingen bilde gitt");
        }
        var mappe = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
        if (!Directory.Exists(mappe))
        {
            Directory.CreateDirectory(mappe);
        }
        var filNavn = Path.GetFileName(bilde.FileName);
        var filPlassering = Path.Combine(mappe, filNavn);

        using (var strøm = new FileStream(filPlassering, FileMode.Create))
        {
            await bilde.CopyToAsync(strøm);
        }
        return Ok(new { filPlassering = $"/uploads/{filNavn}" });
    }

    [HttpGet("/hunder")]
    public async Task<ActionResult<IEnumerable<Hund>>> HentHunder()
    {
        var hunder = await _context.hunder.ToListAsync();
        return Ok(hunder);
    }

    [HttpGet("/hundeEiere")]
    public async Task<ActionResult<IEnumerable<HundeEier>>> HentHundeEiere()
    {
        var eiere = await _context.hundeEiere.ToListAsync();
        return Ok(eiere);
    }
    [HttpGet("/hundePassere")]
    public async Task<ActionResult<IEnumerable<HundePasser>>> HentHundePassere()
    {
        var passere = await _context.hundePassere.ToListAsync();
        return Ok(passere);
    }
    [HttpGet("/foresporsler")]
    public async Task<ActionResult<IEnumerable<Foresporsler>>> HentForesporsler()
    {
        var foresporsler = await _context.Foresporsler.ToListAsync();
        return Ok(foresporsler);
    }

    [HttpPost("/foresporsel")]
    public async Task<ActionResult<IEnumerable<Foresporsler>>> lagForesporsel([FromBody] Foresporsler foresporsel)
    {
        var nyForesporsel = new Foresporsler { eierID = foresporsel.eierID, passerID = foresporsel.passerID, dato = foresporsel.dato, akseptert = foresporsel.akseptert, rapport = "", kommentar = "", vurdering = 0, betalt = false, fullfort = false };
        _context.Foresporsler.Add(nyForesporsel);
        await _context.SaveChangesAsync();
        var foresporsler = await _context.Foresporsler.ToListAsync();
        return Ok(foresporsler);
    }

    [HttpPut("/aksepterForesporsel/{id}")]
    public async Task<ActionResult> aksepter(int id)
    {
        var foresporsel = await _context.Foresporsler.FirstOrDefaultAsync(f => f.Id == id);
        if (foresporsel != null)
        {
            foresporsel.akseptert = true;
            await _context.SaveChangesAsync();

            return Ok();
        }
        return BadRequest();
    }

    [HttpPut("/fullforForesporsel/{id}")]
    public async Task<ActionResult> fullfor(int id)
    {
        var foresporsel = await _context.Foresporsler.FirstOrDefaultAsync(f => f.Id == id);
        if (foresporsel != null)
        {
            foresporsel.fullfort = true;
            await _context.SaveChangesAsync();

            return Ok();
        }
        return BadRequest();
    }
    [HttpPut("/rapportForesporsel/{id}")]
    public async Task<ActionResult> rapporter(int id, [FromBody] Rapport rapport)
    {
        var foresporsel = await _context.Foresporsler.FirstOrDefaultAsync(f => f.Id == id);
        if (foresporsel != null)
        {
            foresporsel.rapport = rapport.rapport;
            await _context.SaveChangesAsync();

            return Ok();
        }
        return BadRequest();
    }

    [HttpPut("/kommenterForesporsel/{id}")]
    public async Task<ActionResult> kommenter(int id, [FromBody] Tilebakemelding kommentar)
    {
        var foresporsel = await _context.Foresporsler.FirstOrDefaultAsync(f => f.Id == id);
        if (foresporsel != null)
        {
            foresporsel.kommentar = kommentar.kommentar;
            foresporsel.vurdering = kommentar.vurdering;
            await _context.SaveChangesAsync();

            return Ok();
        }
        return BadRequest();
    }
    [HttpPut("/foresporselBetalt/{id}")]
    public async Task<ActionResult> betalt(int id)
    {
        var foresporsel = await _context.Foresporsler.FirstOrDefaultAsync(f => f.Id == id);
        if (foresporsel != null)
        {
            foresporsel.betalt = true;
            await _context.SaveChangesAsync();

            return Ok();
        }
        return BadRequest();
    }
}