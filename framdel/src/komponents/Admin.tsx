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
  aktiv: boolean;
  telefon: string;
  omraade: string;
  pris: number;
}

interface HundeEier {
  id: number;
  brukernavn: string;
  passord: string;
  aktiv: boolean;
  telefon: string;
  adresse: string;
  hundID: number;
  hundBildePlassering: string;
}

interface egenskaper {
  eiere: HundeEier[];
  passere: HundePasser[];
  hunder: Hund[];
  foresporsler: Foresporsel[];
  deaktiverEier: (id: number) => void;
  deaktiverPasser: (id: number) => void;
  aktiverEier: (id: number) => void;
  aktiverPasser: (id: number) => void;
}

const Admin = ({
  eiere,
  passere,
  hunder,
  foresporsler,
  deaktiverEier,
  deaktiverPasser,
  aktiverEier,
  aktiverPasser,
}: egenskaper) => {
  return (
    <>
      <h1>Admin side</h1>
      <div className="AdminSide">
        <div className="Hunder">
          <h1>Hunder</h1>
          {hunder.map((h) => (
            <div className="Hund">
              <h1>ID. {h.id}</h1>
              <h1>Navn: {h.navn}</h1>
              <h1>Rase: {h.rase}</h1>
              <h1>Alder: {h.alder}</h1>
              <h1>Spesielle behov: {h.spesielleBehov}</h1>
            </div>
          ))}
        </div>
        <div className="HundeEiere">
          <h1>Eiere</h1>
          {eiere.map((e) => (
            <div className="HundeEier">
              <h1>ID. {e.id}</h1>
              <h1>Eier er: {e.aktiv ? "Aktiv" : "Deaktivert"}</h1>
              <button
                onClick={() =>
                  e.aktiv ? deaktiverEier(e.id) : aktiverEier(e.id)
                }
              >
                {e.aktiv ? "Deaktiver eier" : "Aktiver eier"}
              </button>
              <h1>Brukernavn: {e.brukernavn}</h1>
              <h1>Hunde id: {e.hundID}</h1>
              <h1>Adresse: {e.adresse}</h1>
              <h1>Tlf: {e.telefon}</h1>
              <h1>Passord: {e.passord}</h1>
              <img className="HundeBilde" src={e.hundBildePlassering} />
            </div>
          ))}
        </div>
        <div className="HundePassere">
          <h1>Passere</h1>
          {passere.map((p) => (
            <div className="HundePasser">
              <h1>ID. {p.id}</h1>
              <h1>Passer er: {p.aktiv ? "Aktiv" : "Deaktivert"}</h1>
              <button
                onClick={() =>
                  p.aktiv ? deaktiverPasser(p.id) : aktiverPasser(p.id)
                }
              >
                {p.aktiv ? "Deaktiver passer" : "Aktiver passer"}
              </button>
              <h1>Brukernavn: {p.brukernavn}</h1>
              <h1>Passord: {p.passord}</h1>
              <h1>Omraade: {p.omraade}</h1>
              <h1>Tlf: {p.telefon}</h1>
              <h1>Pris: {p.pris}</h1>
            </div>
          ))}
        </div>
        <div className="Foresporsler">
          <h1>Forespørsler</h1>
          {foresporsler.map((f) => (
            <div className="admin-Foresporsel">
              <h1>ID. {f.id}</h1>
              <h1>EierID: {f.eierID}</h1>
              <h1>PasserID: {f.passerID}</h1>
              <h1>Dato og tid: {f.dato.toLocaleString()}</h1>
              <h1>{f.akseptert ? "Akseptert" : "Ikke akseptert"}</h1>
              <h1>{f.fullfort ? "Fullført" : "Ikke fullført"}</h1>
              <h1>Rapport: {f.rapport}</h1>
              <h1>Kommentar: {f.kommentar}</h1>
              <h1>
                Vurdering:{" "}
                {Array.from({ length: f.vurdering }, (_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </h1>
              <h1>{f.betalt ? "Betalt" : "Ikke betalt"}</h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Admin;
