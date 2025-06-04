interface Hund {
  id: number;
  navn: string;
  rase: string;
  alder: number;
  spesielleBehov: string;
}
interface NyBruker {
  rolle: string;
  brukernavn: string;
  passord: string;
  telefon: string;
  adresse: string;
  hund: Hund;
  hundBildePlassering: string;
  omraade: string;
  pris: number;
}

interface egenskaper {
  lagerBruker: boolean;
  setLagerBruker: (verdi: boolean) => void;
  brukernavn: string;
  setBrukernavn: (verdi: string) => void;
  passord: string;
  setPassord: (verdi: string) => void;
  lagBruker: () => void;
  login: () => void;
  nyBruker: NyBruker;
  setNyBruker: (verdi: NyBruker) => void;
  haandterBildeEndring: (e: React.ChangeEvent<HTMLInputElement>) => void;
  bilde: File | null;
}

const Login = ({
  lagerBruker,
  setLagerBruker,
  brukernavn,
  setBrukernavn,
  passord,
  setPassord,
  lagBruker,
  login,
  nyBruker,
  setNyBruker,
  haandterBildeEndring,
  bilde,
}: egenskaper) => {
  return (
    <>
      {!lagerBruker ? (
        <form
          className="Login"
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <input
            placeholder="Brukernavn"
            value={brukernavn}
            onChange={(e) => setBrukernavn(e.target.value)}
          />
          <input
            type="password"
            placeholder="Passord"
            value={passord}
            onChange={(e) => setPassord(e.target.value)}
          />
          <button type="submit">Logg på</button>
          <button onClick={() => setLagerBruker(!lagerBruker)}>
            Har ikke bruker?
          </button>
        </form>
      ) : (
        <form
          className="LagBruker"
          onSubmit={(e) => {
            e.preventDefault();
            lagBruker();
          }}
        >
          <select
            required
            onChange={(b) =>
              setNyBruker((gammel) => ({ ...gammel, rolle: b.target.value }))
            }
          >
            <option value="">Velg rolle</option>
            <option value="eier">Hunde eier</option>
            <option value="passer">Hunde passer</option>
          </select>
          <input
            required
            placeholder="Brukernavn"
            value={nyBruker.brukernavn}
            onChange={(b) =>
              setNyBruker((gammel) => ({
                ...gammel,
                brukernavn: b.target.value,
              }))
            }
          />
          <input
            required
            type="password"
            placeholder="Passord"
            value={nyBruker.passord}
            onChange={(b) =>
              setNyBruker((gammel) => ({ ...gammel, passord: b.target.value }))
            }
          />
          <input
            required
            placeholder="Telefon nummer"
            value={nyBruker.telefon}
            onChange={(b) =>
              setNyBruker((gammel) => ({ ...gammel, telefon: b.target.value }))
            }
          />
          {nyBruker.rolle === "eier" && (
            <>
              <input
                required
                placeholder="Adresse"
                value={nyBruker.adresse}
                onChange={(b) =>
                  setNyBruker((gammel) => ({
                    ...gammel,
                    adresse: b.target.value,
                  }))
                }
              />

              <div className="HundeFelt">
                <h2>Hunden</h2>
                <input
                  required
                  placeholder="Hunde navn"
                  value={nyBruker.hund.navn}
                  onChange={(b) =>
                    setNyBruker((gammel) => ({
                      ...gammel,
                      hund: { ...gammel.hund, navn: b.target.value },
                    }))
                  }
                />
                <input
                  required
                  placeholder="Hunde rase"
                  value={nyBruker.hund.rase}
                  onChange={(b) =>
                    setNyBruker((gammel) => ({
                      ...gammel,
                      hund: { ...gammel.hund, rase: b.target.value },
                    }))
                  }
                />
                <h3>Alder</h3>
                <input
                  required
                  type="number"
                  value={nyBruker.hund.alder}
                  onChange={(b) =>
                    setNyBruker((gammel) => ({
                      ...gammel,
                      hund: { ...gammel.hund, alder: Number(b.target.value) },
                    }))
                  }
                />
                <input
                  required
                  value={nyBruker.hund.spesielleBehov}
                  placeholder="Har hunden noen behov?"
                  onChange={(b) =>
                    setNyBruker((gammel) => ({
                      ...gammel,
                      hund: { ...gammel.hund, spesielleBehov: b.target.value },
                    }))
                  }
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={haandterBildeEndring}
                ></input>
                {nyBruker.hundBildePlassering ? (
                  !bilde ? (
                    <img
                      className="HundeBilde"
                      src={nyBruker.hundBildePlassering}
                    />
                  ) : (
                    <img
                      className="HundeBilde"
                      src={URL.createObjectURL(bilde)}
                    />
                  )
                ) : (
                  <h1>Last opp bilde</h1>
                )}
              </div>
            </>
          )}
          {nyBruker.rolle === "passer" && (
            <>
              <input
                required
                value={nyBruker.omraade}
                placeholder="Hvor kan du passe?"
                onChange={(b) =>
                  setNyBruker((gammel) => ({
                    ...gammel,
                    omraade: b.target.value,
                  }))
                }
              />
              <h2>Hvor mye tar du for å passe en hund?</h2>
              <input
                required
                value={nyBruker.pris}
                type="number"
                onChange={(b) =>
                  setNyBruker((gammel) => ({
                    ...gammel,
                    pris: Number(b.target.value),
                  }))
                }
              />
            </>
          )}
          <button type="submit">Lag bruker</button>
          <button onClick={() => setLagerBruker(!lagerBruker)}>
            Har bruker?
          </button>
        </form>
      )}
    </>
  );
};

export default Login;
