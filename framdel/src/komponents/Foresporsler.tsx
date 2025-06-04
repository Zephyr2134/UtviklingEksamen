interface Foresporsel {
  id: number;
  eierID: number;
  passerID: number;
  dato: Date;
  akseptert: boolean;
  rapport: string;
  vurdering: number;
  kommentar: string;
  fullfort: boolean;
  betalt: boolean;
}

interface Hund {
  id: number;
  navn: string;
  rase: string;
  alder: number;
  spesielleBehov: string;
}

interface HundePasser {
  id: number;
  brukernavn: string;
  passord: string;
  telefon: string;
  omraade: string;
  pris: number;
}
interface Admin {
  brukernavn: string;
  passord: string;
  rolle: string;
}
interface HundeEier {
  id: number;
  brukernavn: string;
  passord: string;
  telefon: string;
  adresse: string;
  hundID: number;
  hundBildePlassering: string;
}

interface egenskaper {
  aktivBruker: HundeEier | HundePasser | Admin | null;
  foresporsler: Foresporsel[];
  eiere: HundeEier[];
  passere: HundePasser[];
  lagForesporsel: () => void;
  redigererForesporsel: number;
  fullforForesporsel: () => void;
  nyForesporsel: Foresporsel;
  setNyForesporsel: (verdi: Foresporsel) => void;
  aksepterForesporsel: (id: number) => void;
  hunder: Hund[];
  valgtOmraade: string;
  setValgtOmraade: (verdi: string) => void;
  bekreftForesporselFerdig: (verdi: number) => void;
  rapport: string;
  setRapport: (verdi: string) => void;
  fullforRapport: (id: number) => void;
  rapporterer: number;
  setRapporterer: (id: number) => void;
  kommenterer: number;
  setKommenterer: (verdi: number) => void;
  fullforKommentar: (id: number) => void;
  setVurdering: (verdi: number) => void;
  setKommentar: (verdi: string) => void;
  foresporselBetalt: (id: number) => void;
  valgtPris: number;
  setValgtPris: (verdi: number) => void;
}

const Foresporsler = ({
  aktivBruker,
  foresporsler,
  eiere,
  passere,
  lagForesporsel,
  redigererForesporsel,
  fullforForesporsel,
  setNyForesporsel,
  aksepterForesporsel,
  valgtOmraade,
  setValgtOmraade,
  bekreftForesporselFerdig,
  rapport,
  setRapport,
  fullforRapport,
  rapporterer,
  setRapporterer,
  kommenterer,
  setKommenterer,
  fullforKommentar,
  setVurdering,
  setKommentar,
  foresporselBetalt,
  valgtPris,
  setValgtPris,
}: egenskaper) => {
  return (
    <>
      <div>
        {aktivBruker && "hundID" in aktivBruker ? (
          <>
            <button
              className="Hundeknapp foresporsel"
              onClick={() => lagForesporsel()}
            >
              🦴 Ny forespørsel
            </button>

            <div className="Foresporsler">
              {foresporsler.map(
                (f) =>
                  f.eierID === aktivBruker.id && (
                    <div key={f.id} className="Foresporsel">
                      {f.betalt ? (
                        <h2>Betaling mottat</h2>
                      ) : (
                        <h2>Ikke betalt</h2>
                      )}
                      {redigererForesporsel !== f.id ? (
                        <h1>
                          Status:{" "}
                          {f.akseptert
                            ? f.fullfort
                              ? "Fullført"
                              : "Akseptert"
                            : "Ikke akseptert"}
                        </h1>
                      ) : null}

                      {redigererForesporsel !== f.id ? (
                        passere.map(
                          (p) =>
                            p.id === f.passerID && (
                              <h1 key={p.id}>Passer: {p.brukernavn}</h1>
                            )
                        )
                      ) : (
                        <select
                          required
                          onChange={(e) => setValgtOmraade(e.target.value)}
                        >
                          <option value="">Velg sted</option>
                          {passere.map((p) => (
                            <option key={p.id} value={p.omraade}>
                              {p.omraade}
                            </option>
                          ))}
                        </select>
                      )}

                      {redigererForesporsel === f.id && (
                        <input
                          type="number"
                          onChange={(e) => setValgtPris(Number(e.target.value))}
                          placeholder="Ønsket pris"
                        />
                      )}

                      {redigererForesporsel !== f.id ? (
                        passere.map(
                          (p) =>
                            p.id === f.passerID && (
                              <h1 key={p.id}>Område: {p.omraade}</h1>
                            )
                        )
                      ) : (
                        <select
                          required
                          onChange={(e) =>
                            setNyForesporsel((f) => ({
                              ...f,
                              passerID: Number(e.target.value),
                            }))
                          }
                        >
                          <option value="0">Velg passer</option>
                          {passere.map(
                            (p) =>
                              p.omraade === valgtOmraade &&
                              p.pris <= valgtPris &&
                              valgtPris && (
                                <option key={p.id} value={p.id}>
                                  {p.brukernavn}
                                </option>
                              )
                          )}
                        </select>
                      )}

                      {f.fullfort && <p>{f.rapport}</p>}

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

                      {f.fullfort &&
                        (kommenterer === f.id ? (
                          <div>
                            <input
                              placeholder="Skriv en kommentar"
                              onChange={(e) => setKommentar(e.target.value)}
                            />{" "}
                            <select
                              onChange={(e) =>
                                setVurdering(Number(e.target.value))
                              }
                            >
                              <option value="">Gi en vurdering</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                            <button
                              onClick={() => {
                                fullforKommentar(f.id);
                              }}
                            >
                              Fullfør tilbakemelding
                            </button>
                          </div>
                        ) : (
                          <div>
                            <button onClick={() => setKommenterer(f.id)}>
                              Skriv kommentar
                            </button>{" "}
                            <p>{f.kommentar}</p>{" "}
                            <div>
                              {Array.from({ length: f.vurdering }, (_, i) => (
                                <span key={i}>⭐</span>
                              ))}
                            </div>
                          </div>
                        ))}
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
                      Eier:{" "}
                      {eiere.find((e) => e.id === f.eierID)?.brukernavn ||
                        "Ukjent"}
                    </h1>

                    {eiere
                      .filter(
                        (e) => e.id === f.eierID && "hundBildePlassering" in e
                      )
                      .map((e) => (
                        <img
                          key={e.id}
                          src={e.hundBildePlassering}
                          className="HundeBilde"
                          alt="Hund"
                        />
                      ))}

                    <h1>Dato: {new Date(f.dato).toDateString()}</h1>

                    <h1>
                      Status:{" "}
                      {f.akseptert
                        ? f.fullfort
                          ? "Fullført"
                          : "Akseptert"
                        : "Ikke akseptert"}
                    </h1>

                    {f.fullfort && <p>{f.rapport}</p>}
                    {f.fullfort && <h3>Tilbakemelding</h3>}
                    {f.fullfort && <p>{f.kommentar}</p>}
                    <div>
                      {Array.from({ length: f.vurdering }, (_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>

                    {!f.akseptert && (
                      <button onClick={() => aksepterForesporsel(f.id)}>
                        Aksepter
                      </button>
                    )}
                    {f.akseptert && !f.fullfort ? (
                      <button
                        onClick={() => {
                          rapporterer === 0 && bekreftForesporselFerdig(f.id);
                          setRapporterer(f.id);
                        }}
                      >
                        Fullført
                      </button>
                    ) : (
                      rapporterer === f.id && (
                        <div>
                          <input
                            placeholder="Skriv rapport"
                            value={rapport}
                            onChange={(e) => setRapport(e.target.value)}
                          />{" "}
                          <button onClick={() => fullforRapport(f.id)}>
                            Fullfør rapport
                          </button>
                        </div>
                      )
                    )}
                    {f.kommentar !== "" && !f.betalt && (
                      <button onClick={() => foresporselBetalt(f.id)}>
                        Betaling mottat
                      </button>
                    )}
                  </div>
                )
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Foresporsler;
