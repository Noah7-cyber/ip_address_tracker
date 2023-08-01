import { useState, useEffect} from 'react'
import axios from 'axios';
import REACT_API_KEY from './id';
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css"
import locateimg from "./assets/icon-location.svg"
import arrow from './assets/icon-arrow.svg'
import background from './assets/pattern-bg-desktop.png'
import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet';

function App() {
  const [address, setAddress] = useState(null)
  const [ipAddress, setIpAddress]= useState('192.212.174.101')
  const fetchData = async()=>{
    try{
      await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${REACT_API_KEY}&ipAddress=${ipAddress}`)
      .then(res =>{
        setAddress(res.data);
      
      })
      
    }catch(err){
      console.log(err.message)
    }
  }
    useEffect(()=>{
      fetchData();
      console.log(address);
    },[])
    const customIcon = new Icon({
      iconUrl:locateimg,
      iconSize:[38,38]
    })
     

  return (
    
    <>
    <div className="absolute -z-10 w-full">
      <img src={background} alt="" className="w-full object-cover h-64"/>
      </div>
      <article className="p-8">
        <h1 className="text-2xl lg:text-3xl text-center text-white font-bold mb-8">IP Address Tracker</h1>
        <form className="flex justify-center max-w-xl mx-auto">
        <input onChange={(e)=>{setIpAddress(e.target.value)}} type='text' name='ipaddress' placeholder='search an ip' className="py-2 px-4 rounded-l-lg w-full" required/>
        <button type='submit'className="py-4 px-4 bg-black hover:opacity-60 rounded-r-lg">
        <img src={arrow} alt=''/>
        </button>
      </form>
      </article>
    {address &&
    <>
    <article className="bg-white rounded-lg shadow p-8 mx-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-4xl lg:mx-auto text-center md:text-left lg:-mb-16 relative "style={{zIndex:"10000"}} >
          <div className="lg:border-r lg:border-slate-400">
            <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">Ip Address</h2>
            <p className="font-semibold text-slate-700 text-lg md:text-xl xl:text:2xl">{address.ip}</p>
          </div>
          <div className="lg:border-r lg:border-slate-400">
            <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">Location</h2>
            <p className="font-semibold text-slate-700 text-lg md:text-xl xl:text:2xl">{address.location.city},{address.location.region}</p>
          </div>
          <div className="lg:border-r lg:border-slate-400">
            <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">Time-zone</h2>
            <p className="font-semibold text-slate-700 text-lg md:text-xl xl:text:2xl">UTC{address.location.timezone}</p>
          </div>
          <div>
            
            <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">ISP</h2>
            <p className="font-semibold text-slate-700 text-lg md:text-xl xl:text:2xl">{address.isp}</p>
          </div>
        </article>
    <MapContainer className=' w-100' center={[address.location.lat, address.location.lng]} zoom={13} style={{height:'100vh'}}>
      <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
      <Marker position={[address.location.lat, address.location.lng]} icon={customIcon}>
      <Popup>
        Your location <br /> Easily customizable.
      </Popup>
    </Marker>
      </MapContainer></>
    }
      
    </>
  )
}

export default App
