import { useState, useEffect } from 'react'
import Login from './komponents/Login';
import Foresporsler from './komponents/Foresporsler';
import Admin from './komponents/Admin';
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
  aktiv:boolean;
  telefon:string;
  omraade:string;
  pris:number;
}

interface HundeEier
{
  id:number;
  brukernavn:string;
  passord:string;
  aktiv:boolean;
  telefon:string;
  adresse:string;
  hundID:number;
  hundBildePlassering:string;
}

interface Admin
{
  brukernavn:string;
  passord:string;
  rolle:string;
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

function App() {

  const [loggetPaa, setLoggetPaa] = useState(false);
  const [brukernavn, setBrukernavn] = useState("");
  const [passord, setPassord] = useState("");

  const [lagerBruker, setLagerBruker] = useState(false);
  const [aktivBruker, setAktivBruker] = useState<HundeEier | HundePasser | Admin | null>(null);
  const [nyBruker, setNyBruker] = useState<NyBruker>({rolle:"",brukernavn:"", passord:"",telefon:"",adresse:"",hund:{id:0,navn:"",rase:"",alder:0,spesielleBehov:""},hundBildePlassering:"",omraade:"",pris:0});
  const [bilde, setBilde] = useState<File | null>(null);

  const side = 0;
  const [hundeEiere, setHundeEiere] = useState<HundeEier[]>([]);
  const [hundePassere, setHundePassere] = useState<HundePasser[]>([]);
  const [hunder, setHunder] = useState<Hund[]>([]);
  const [foresporsler, setForesporsler] = useState<Foresporsel[]>([]);

  const [nyForesporsel, setNyForesporsel] = useState<Foresporsel>({id:0,eierID:0,passerID:0,dato:new Date(Date.now()),akseptert:false, rapport:"", vurdering:0, kommentar:"",fullfort:false,betalt:false});
  const [redigererForesporsel, setRedigererForesporsel] = useState(-1);

  const [valgtPris, setValgtPris] = useState(0);
  const [valgtOmraade, setValgtOmraade] = useState("");
  const [rapport, setRapport] = useState("");
  const [rapporterer, setRapporterer] = useState(0);

  const [kommentar, setKommentar] = useState("");
  const [vurdering, setVurdering] = useState(0);
  const [kommenterer, setKommenterer] = useState(0);

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

  const foresporselBetalt = async(id:number) => {
    try{
      const svar = await fetch(`https://localhost:7130/foresporselBetalt/${id}`, {
        method:"PUT",
        headers:{
          'content-type':'application/json',
        },
        body:JSON.stringify({}),
      });
      if(svar.ok)
      {
        setForesporsler(gammel=>gammel.map(f=>f.id===id ? {...f, betalt:true}:f))
        console.log("Betalt");
      }else{
        console.log("Noe skjedde");
      }
    }
    catch(e)
    {console.log(e);}
  }

  const fullforRapport = async(id:number) =>{
    try{
      const svar = await fetch(`https://localhost:7130/rapportForesporsel/${id}`, {
        method:"PUT",
        headers:{
          'content-type':'application/json',
        },
        body:JSON.stringify({rapport:rapport}),
      });
      if(svar.ok)
      {
        setForesporsler(gammel=>gammel.map(f=>f.id===id ? {...f, rapport:rapport}:f))
        setRapporterer(0);
        console.log("Fullfort");
      }else{
        console.log("Noe skjedde");
      }
    }
    catch(e)
    {console.log(e);}
  }

  const fullforKommentar = async(id:number) =>{
    try{
      const svar = await fetch(`https://localhost:7130/kommenterForesporsel/${id}`, {
        method:"PUT",
        headers:{
          'content-type':'application/json',
        },
        body:JSON.stringify({kommentar:kommentar, vurdering:vurdering}),
      });
      if(svar.ok)
      {
        setForesporsler(gammel=>gammel.map(f=>f.id===id ? {...f, kommentar:kommentar, vurdering:vurdering}:f))
        setKommentar("");
        setKommenterer(0);
        setVurdering(0);
        console.log("Kommentert");
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

  const deaktiverEier = async(id:number) => {
    try{
      const svar = await fetch(`https://localhost:7130/deaktiverEier/${id}`, {
        method:"PUT",
        headers:{
          'content-type':'application/json',
        },
        body:JSON.stringify({}),
      });
      if(svar.ok)
      {
        setHundeEiere(gammel=>gammel.map(e=>e.id===id ? {...e, aktiv:false}:e))
        console.log("Deaktivert eier");
      }else{
        console.log("Noe skjedde");
      }
    }
    catch(e)
    {console.log(e);}
  }

  const deaktiverPasser = async(id:number) => {
    try{
      const svar = await fetch(`https://localhost:7130/deaktiverPasser/${id}`, {
        method:"PUT",
        headers:{
          'content-type':'application/json',
        },
        body:JSON.stringify({}),
      });
      if(svar.ok)
      {
        setHundePassere(gammel=>gammel.map(p=>p.id===id ? {...p, aktiv:false}:p));
        console.log("Deaktivert eier");
      }else{
        console.log("Noe skjedde");
      }
    }
    catch(e)
    {console.log(e);}
  }
  const aktiverEier = async(id:number) => {
    try{
      const svar = await fetch(`https://localhost:7130/aktiverEier/${id}`, {
        method:"PUT",
        headers:{
          'content-type':'application/json',
        },
        body:JSON.stringify({}),
      });
      if(svar.ok)
      {
        setHundeEiere(gammel=>gammel.map(e=>e.id===id ? {...e, aktiv:true}:e))
        console.log("Aktivert eier");
      }else{
        console.log("Noe skjedde");
      }
    }
    catch(e)
    {console.log(e);}
  }
  const aktiverPasser = async(id:number) => {
    try{
      const svar = await fetch(`https://localhost:7130/aktiverPasser/${id}`, {
        method:"PUT",
        headers:{
          'content-type':'application/json',
        },
        body:JSON.stringify({}),
      });
      if(svar.ok)
      {
        setHundePassere(gammel=>gammel.map(e=>e.id===id ? {...e, aktiv:true}:e))
        console.log("Aktivert passer");
      }else{
        console.log("Noe skjedde");
      }
    }
    catch(e)
    {console.log(e);}
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
      
      {aktivBruker && aktivBruker.brukernavn === "admin" ? 
      <div>
        <button className="Hundeknapp loggUt" onClick={() => loggUt()}>🐾 Logg ut</button>
        <Admin eiere={hundeEiere} passere={hundePassere} hunder={hunder} foresporsler={foresporsler} aktiverEier={aktiverEier} aktiverPasser={aktiverPasser} deaktiverEier={deaktiverEier} deaktiverPasser={deaktiverPasser}/>
        </div>
        :

      ( aktivBruker && 'hundID' in aktivBruker ? <div className="EierSide" style={{ backgroundImage: `url(${aktivBruker.hundBildePlassering})` }}> 
      <button className="Hundeknapp loggUt" onClick={() => loggUt()}>🐾 Logg ut</button>
      <Foresporsler aktivBruker={aktivBruker} foresporsler={foresporsler} eiere={hundeEiere} passere={hundePassere} lagForesporsel={lagForesporsel} redigererForesporsel={redigererForesporsel} fullforForesporsel={fullforForesporsel} nyForesporsel={nyForesporsel} setNyForesporsel={setNyForesporsel} aksepterForesporsel={aksepterForesporsel} valgtOmraade={valgtOmraade} setValgtOmraade={setValgtOmraade} hunder={hunder} bekreftForesporselFerdig={bekreftForesporselFerdig} rapport={rapport} setRapport={setRapport} fullforRapport={fullforRapport} rapporterer={rapporterer} setRapporterer={setRapporterer} kommenterer={kommenterer} setKommenterer={setKommenterer} fullforKommentar={fullforKommentar} setVurdering={setVurdering} setKommentar={setKommentar} foresporselBetalt={foresporselBetalt} valgtPris={valgtPris} setValgtPris={setValgtPris}/>
      </div> : 
      <div>
        <button className="Hundeknapp loggUt" onClick={() => loggUt()}>🐾 Logg ut</button>
      <Foresporsler aktivBruker={aktivBruker} foresporsler={foresporsler} eiere={hundeEiere} passere={hundePassere} lagForesporsel={lagForesporsel} redigererForesporsel={redigererForesporsel} fullforForesporsel={fullforForesporsel} nyForesporsel={nyForesporsel} setNyForesporsel={setNyForesporsel} aksepterForesporsel={aksepterForesporsel} hunder={hunder} valgtOmraade={valgtOmraade} setValgtOmraade={setValgtOmraade} bekreftForesporselFerdig={bekreftForesporselFerdig} rapport={rapport} setRapport={setRapport} fullforRapport={fullforRapport} rapporterer={rapporterer} setRapporterer={setRapporterer} kommenterer={kommenterer} setKommenterer={setKommenterer} fullforKommentar={fullforKommentar} setVurdering={setVurdering} setKommentar={setKommentar} foresporselBetalt={foresporselBetalt} valgtPris={valgtPris} setValgtPris={setValgtPris}/>
      </div>)}
      </>
      }
    </>
  )
}

export default App
