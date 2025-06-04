interface Foresporsel
{
  id:number;
  eierID:number;
  passerID:number;
  dato:Date;
  akseptert:boolean;
}

interface Hund
{
  id:number;
  navn:string;
  rase:string;
  alder:number;
  spesielleBehov:string;
}

interface HundePasser
{
  id:number;
  brukernavn:string;
  passord:string;
  telefon:string;
  omraade:string;
  pris:number;
}

interface HundeEier
{
  id:number;
  brukernavn:string;
  passord:string;
  telefon:string;
  adresse:string;
  hundID:number;
  hundBildePlassering:string;
}

interface egenskaper
{
    aktivBruker:HundeEier|HundePasser|null;
    foresporsler:Foresporsel[];
    eiere:HundeEier[];
    passere:HundePasser[];
    lagForesporsel:()=>void;
    redigererForesporsel:number;
    fullforForesporsel:()=>void;
    nyForesporsel:Foresporsel;
    setNyForesporsel:(verdi:Foresporsel)=>void;
    aksepterForesporsel:(id:number)=>void;
    hunder:Hund[];
    valgtOmraade:string;
    setValgtOmraade:(verdi:string)=>void;
}

const Foresporsler = ({aktivBruker, foresporsler, eiere, passere, lagForesporsel, redigererForesporsel, fullforForesporsel, nyForesporsel, setNyForesporsel, aksepterForesporsel, hunder, valgtOmraade, setValgtOmraade}:egenskaper) =>{
    return (
        <div>
  {aktivBruker && 'hundID' in aktivBruker ? (
    <>
      <button className="Hundeknapp foresporsel" onClick={() => lagForesporsel()}>🦴 Ny forespørsel</button>

      <div className="Foresporsler">
        {foresporsler.map(
          (f) =>
            f.eierID === aktivBruker.id && (
              <div key={f.id} className="Foresporsel">
                {redigererForesporsel !== f.id ? (
                  <h1>Status: {f.akseptert ? 'Akseptert' : 'Ikke akseptert'}</h1>
                ) : null}

                {redigererForesporsel !== f.id ? (
                  passere.map(
                    (p) =>
                      p.id === f.passerID && <h1 key={p.id}>Passer: {p.brukernavn}</h1>
                  )
                ) : (

                  <select required
                    onChange={(e) =>setValgtOmraade(e.target.value)}
                  >
                    <option value="">Velg sted</option>
                    {passere.map((p) => (
                      <option key={p.id} value={p.omraade}>
                        {p.omraade}
                      </option>
                    ))}
                  </select>
                )}


                {redigererForesporsel !== f.id ? (
                  passere.map(
                    (p) =>
                      p.id === f.passerID && <h1 key={p.id}>Passer: {p.brukernavn}</h1>
                  )
                ) : (

                  <select required
                    onChange={(e) =>
                      setNyForesporsel((f) => ({
                        ...f,
                        passerID: Number(e.target.value),
                      }))
                    }
                  >
                    <option value="0">Velg passer</option>
                    {passere.map((p) => p.omraade === valgtOmraade && (
                      <option key={p.id} value={p.id}>
                        {p.brukernavn}
                      </option>
                    ))}
                  </select>
                )}

                {redigererForesporsel !== f.id ? (
                  <h1>{new Date(f.dato).toLocaleString()}</h1>
                ) : (
                  <input
                    type="datetime-local"
                    onChange={(e) =>
                      setNyForesporsel((f) => ({
                        ...f,
                        dato: new Date(e.target.value),
                      }))
                    }
                  />
                )}

                {redigererForesporsel === f.id && (
                  <button onClick={() => fullforForesporsel()}>
                    Fullfør forespørsel
                  </button>
                )}
              </div>
            )
        )}
      </div>
    </>
  ) : (
    <>
      {foresporsler.map(
        (f) =>
          aktivBruker &&
          f.passerID === aktivBruker.id && (
            <div key={f.id} className="foresporsler">
              <h1>
                Eier:{' '}
                {eiere.find((e) => e.id === f.eierID)?.brukernavn || 'Ukjent'}
              </h1>

              {eiere
                .filter((e) => e.id === f.eierID && 'hundBildePlassering' in e)
                .map((e) => (
                  <img
                    key={e.id}
                    src={e.hundBildePlassering}
                    className="HundeBilde"
                    alt="Hund"
                  />
                ))}

              <h1>Dato: {new Date(f.dato).toDateString()}</h1>

              <h1>Status: {f.akseptert ? "Akseptert" : "Ikke akseptert"}</h1>

              <button onClick={() => aksepterForesporsel(f.id)}>Aksepter</button>
            </div>
          )
      )}
    </>
  )}
</div>
    )
}

export default Foresporsler;