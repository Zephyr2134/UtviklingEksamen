import { useState, useEffect } from 'react'
import Login from './komponents/Login';
import Foresporsler from './komponents/Foresporsler';
import './style.css'

interface Foresporsel
{
  id:number;
  eierID:number;
  passerID:number;
  dato:Date;
  akseptert:boolean;
  rapport:string;
  vurdering:number;
  kommentar:string;
  fullfort:boolean;
  betalt:boolean;
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

interface NyBruker
{
  rolle:string;
  brukernavn:string;
  passord:string;
  telefon:string;
  adresse:string;
  hund:Hund;
  hundBildePlassering:string;
  omraade:string;
  pris:number;
}

interface loginBruker
{
  brukernavn:string;
  passord:string;
}

function App() {

  const [loggetPaa, setLoggetPaa] = useState(false);
  const [brukernavn, setBrukernavn] = useState("");
  const [passord, setPassord] = useState("");

  const [lagerBruker, setLagerBruker] = useState(false);
  const [aktivBruker, setAktivBruker] = useState<HundeEier | HundePasser | null>(null);
  const [nyBruker, setNyBruker] = useState<NyBruker>({rolle:"",brukernavn:"", passord:"",telefon:"",adresse:"",hund:{id:0,navn:"",rase:"",alder:0,spesielleBehov:""},hundBildePlassering:"",omraade:"",pris:0});
  const [bilde, setBilde] = useState<File | null>(null);

  const [side, setSide] = useState(0);
  const [hundeEiere, setHundeEiere] = useState<HundeEier[]>([]);
  const [hundePassere, setHundePassere] = useState<HundePasser[]>([]);
  const [hunder, setHunder] = useState<Hund[]>([]);
  const [foresporsler, setForesporsler] = useState<Foresporsel[]>([]);

  const [nyForesporsel, setNyForesporsel] = useState<Foresporsel>({id:0,eierID:0,passerID:0,dato:new Date(Date.now()),akseptert:false, rapport:"", vurdering:0, kommentar:"",fullfort:false,betalt:false});
  const [redigererForesporsel, setRedigererForesporsel] = useState(-1);

  const [valgtOmraade, setValgtOmraade] = useState("");
  const [skriverRapport, setSkriverRapport] = useState(0);

  const sendBilde = async () => {
    if (bilde) {
      const data = new FormData();
      data.append("bilde", bilde);

      const svar = await fetch(`https://localhost:7130/bilde`, {
        method: "POST",
        body: data,
      });

      if (svar.ok) {
        const data = await svar.json();
        console.log("Bilde lastet opp", data);
        return data.filPlassering;
      } else {
        const errorTekst = await svar.text();
        console.log("Bilde lastet ikke opp: ", errorTekst);
      }
      setBilde(null);
    } else {
      console.log("Ingen bilde valgt");
    }
  };

  const haandterBildeEndring = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBilde(e.target.files[0]);
    }
  };

  const lagBruker = async() =>
    {
      if(lagerBruker){
      try{
        const plass = await sendBilde();
        if(plass){
        await setNyBruker(e=>({...e, hundBildePlassering:`https://localhost:7130${plass}`}));
        const svar = await fetch("https://localhost:7130/lagBruker", {
          method:"POST",
          headers:{"content-type":"application/json"},
          body: JSON.stringify({...nyBruker, hundBildePlassering:`https://localhost:7130${plass}`}),
        });
        if(svar.ok)
        {
          console.log("Bruker laget");
          setLagerBruker(false);
        }else{
          console.log("Noe skjedde");
        }
        }else{
        const svar = await fetch("https://localhost:7130/lagBruker", {
          method:"POST",
          headers:{"content-type":"application/json"},
          body: JSON.stringify(nyBruker),
        });
      if(svar.ok)
        {
          console.log("Bruker laget");
          setLagerBruker(false);
        }else{
          console.log("Noe skjedde");
        }}
      }catch(e)
      {
        console.log(e);
      }
      }
    }

  const lagForesporsel = async() =>
  {
    if(aktivBruker && 'hundID' in aktivBruker && redigererForesporsel===-1)
    {
    console.log("Lager foresporsel");
    setNyForesporsel(f=>({...f, id:0, eierID:aktivBruker.id}));
    const foresporsel = {...nyForesporsel, id:0, eierID:aktivBruker.id};
    setRedigererForesporsel(0);
    setForesporsler(gammel=>([foresporsel, ...gammel]));
  }
}

  const fullforForesporsel = async() =>{
    if(nyForesporsel.passerID !== 0){
      try{
      console.log(nyForesporsel);
      const svar = await fetch("https://localhost:7130/foresporsel",{
        method:'POST',
        headers:{
          'content-type':'application/json',
        },
        body: JSON.stringify(nyForesporsel),
      });
      if(svar.ok)
      {
        const data = await svar.json() as Foresporsel[];
        setForesporsler(data);
        setRedigererForesporsel(-1);
      }
    }catch(e)
    {
      console.log(e);
    }
    }
    }

  const aksepterForesporsel = async(id:number) =>{
    try{
      const svar = await fetch(`https://localhost:7130/aksepterForesporsel/${id}`, {
        method:"PUT",
        headers:{
          'content-type':'application/json',
        },
        body:JSON.stringify({}),
      });
      if(svar.ok)
      {
        setForesporsler(gammel=>gammel.map(f=>f.id===id ? {...f, akseptert:true}:f))
        console.log("Akseptert");
      }else{
        console.log("Noe skjedde");
      }
    }
    catch(e)
    {console.log(e);}
  }

  const bekreftForesporselFerdig = async(id:number) => {
    try{
      const svar = await fetch(`https://localhost:7130/fullforForesporsel/${id}`, {
        method:"PUT",
        headers:{
          'content-type':'application/json',
        },
        body:JSON.stringify({}),
      });
      if(svar.ok)
      {
        setForesporsler(gammel=>gammel.map(f=>f.id===id ? {...f, fullfort:true}:f))
        console.log("Fullfort");
      }else{
        console.log("Noe skjedde");
      }
    }
    catch(e)
    {console.log(e);}
  }

  const loggUt = async() =>
  {
    setLoggetPaa(false);
  }
  const login = async() =>
  {
      try{
        const svar = await fetch("https://localhost:7130/login", {
          method:"POST",
          headers:{"content-type":"application/json"},
          body: JSON.stringify({brukernavn:brukernavn, passord:passord}),
        });
        if(svar.ok)
        {
          const data = await svar.json();
          setAktivBruker(data);
          setLoggetPaa(true);
          console.log("Logget inn", data)
        }else{
          console.log("Noe skjedde");
        }
      }catch(e)
      {
        console.log(e);
      }
  }

  useEffect(()=>{
    const hentAlt = async() =>{
      try{
        const passere = await fetch("https://localhost:7130/hundePassere");
        const eiere = await fetch("https://localhost:7130/hundeEiere");
        const hunder = await fetch("https://localhost:7130/hunder");
        const foresporsler = await fetch("https://localhost:7130/foresporsler");

        if(passere.ok && eiere.ok && hunder.ok && foresporsler.ok)
        {
          const dataPassere = await passere.json() as HundePasser[];
          const dataEiere = await eiere.json() as HundeEier[];
          const dataHunder = await hunder.json() as Hund[];
          const dataForesporsler = await foresporsler.json() as Foresporsel[];

          setHundePassere(dataPassere);
          setHundeEiere(dataEiere);
          setHunder(dataHunder);
          setForesporsler(dataForesporsler);
        }else{
          console.log("Noe skjedde");
        }
      }catch(e)
      {
        console.log(e);
      }
    }
    hentAlt();
  },[side])

  return (
    <>
      {!loggetPaa ?
      <Login lagerBruker={lagerBruker} setLagerBruker={setLagerBruker} brukernavn={brukernavn} setBrukernavn={setBrukernavn} passord={passord} setPassord={setPassord} lagBruker={lagBruker} login={login} nyBruker={nyBruker} setNyBruker={setNyBruker} haandterBildeEndring={haandterBildeEndring} bilde={bilde}/>
      :
      <>
      {aktivBruker && 'hundID' in aktivBruker ? <div className="EierSide" style={{ backgroundImage: `url(${aktivBruker.hundBildePlassering})` }}> 
      <button className="Hundeknapp loggUt" onClick={() => loggUt()}>🐾 Logg ut</button>
      <Foresporsler aktivBruker={aktivBruker} foresporsler={foresporsler} eiere={hundeEiere} passere={hundePassere} lagForesporsel={lagForesporsel} redigererForesporsel={redigererForesporsel} fullforForesporsel={fullforForesporsel} nyForesporsel={nyForesporsel} setNyForesporsel={setNyForesporsel} aksepterForesporsel={aksepterForesporsel} valgtOmraade={valgtOmraade} setValgtOmraade={setValgtOmraade} hunder={hunder} bekreftForesporselFerdig={bekreftForesporselFerdig}/>
      </div> : 
      <div>
        <button className="Hundeknapp loggUt" onClick={() => loggUt()}>🐾 Logg ut</button>
      <Foresporsler aktivBruker={aktivBruker} foresporsler={foresporsler} eiere={hundeEiere} passere={hundePassere} lagForesporsel={lagForesporsel} redigererForesporsel={redigererForesporsel} fullforForesporsel={fullforForesporsel} nyForesporsel={nyForesporsel} setNyForesporsel={setNyForesporsel} aksepterForesporsel={aksepterForesporsel} hunder={hunder} valgtOmraade={valgtOmraade} setValgtOmraade={setValgtOmraade} bekreftForesporselFerdig={bekreftForesporselFerdig}/>
      </div>}
      </>
      }
    </>
  )
}

export default App
