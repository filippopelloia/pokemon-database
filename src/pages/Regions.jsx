import {useState, useEffect, useCallback} from 'react'
import Header from '../components/Header.jsx'
import axios from 'axios'


export default function Regions() {

  const[actualRegion, setActualRegion] = useState('Galar')
  const[region, setRegion] = useState([])
  const [filteredResult, setFilteredResult] = useState(region);
  const[shiny, setShiny] = useState(false)

  function showShiny(){
      setShiny(prevShiny => !prevShiny)
  }


  //PRIMA LETTERA MAIUSCOLA
  const CurrentRegion = actualRegion[0].toUpperCase() + actualRegion.slice(1)


  function getRegion(regione){
    setActualRegion(regione)
  }


  const getRegionPokemon = useCallback(() => {
    const fetchData = async () => {
        const requests = []
        for(let i = 810; i < 906; i++) {
            requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`))
        }
        try {
            const responses = await Promise.all(requests)
            const pokemonData = responses.map(res => res.data)
            setRegion(pokemonData)

        } catch (error) {
            console.error(error)
        }
    }
    fetchData()
  }, [])


  useEffect(() => {
    getRegionPokemon()
  }, [getRegionPokemon])


  useEffect(() => {
    setFilteredResult(region)
  }, [region])



  const handleInputChange = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredData = region.filter(p => p.name.toLowerCase().startsWith(searchText));
    setFilteredResult(filteredData);
  };




  function getRegion(event){

    const fetchData = async () => {
      const requests = []


    const region = event.target.innerText
    if(region === 'Kanto'){
      for(let i = 1; i < 152; i++) {
          requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`))
      }      
    }else if(region === 'Johto'){
      for(let i = 152; i < 252; i++) {
          requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`))
      }
    }else if(region === 'Hoenn'){
      for(let i = 252; i < 387; i++) {
          requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`))
      }
    }else if(region === 'Sinnoh'){
      for(let i = 387; i < 494; i++) {
          requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`))
      }
    }else if(region === 'Unima'){
      for(let i = 494; i < 650; i++) {
          requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`))
      }
    }else if(region === 'Kalos'){
      for(let i = 650; i < 722; i++) {
          requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`))
      }
    }else if(region === 'Alola'){
      for(let i = 722; i < 810; i++) {
          requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`))
      }
    }else if(region === 'Galar'){
      for(let i = 810; i < 906; i++) {
          requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`))
      }
    }

    setActualRegion(region)

    try {
                const responses = await Promise.all(requests)
                const pokemonData = responses.map(res => res.data)
      
                setRegion(pokemonData)
      
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
  }




  // let RegionBack = {}

  // if(actualRegion === 'Galar'){
  //   RegionBack = {opacity: 1}
  // }else if(actualRegion === region){
  //   RegionBack = {opacity: 1}
  // }else{
  //   RegionBack = {opacity: 0.75}
  // }





  return (
    <div className='region main'>
  
        <Header shiny={shiny} changeMode={showShiny} handleInputChange={(event) => handleInputChange(event)} />
        <div className="regions">
          <button className="region-btn" onClick={(event) => getRegion(event)}>Kanto</button>
          <button className="region-btn" onClick={(event) => getRegion(event)}>Johto</button>
          <button className="region-btn" onClick={(event) => getRegion(event)}>Hoenn</button>
          <button className="region-btn" onClick={(event) => getRegion(event)}>Sinnoh</button>
          <button className="region-btn" onClick={(event) => getRegion(event)}>Unima</button>
          <button className="region-btn" onClick={(event) => getRegion(event)}>Kalos</button>
          <button className="region-btn" onClick={(event) => getRegion(event)}>Alola</button>
          <button className="region-btn" onClick={(event) => getRegion(event)}>Galar</button>
        </div>


        <h2 className="region-current">Pokedex of {CurrentRegion}</h2>


        <div className="national-section">

          {filteredResult.map((item, index) => (
            <div key={index} className='pokemon-section'>

              <img className="sprite" 
                   src={shiny ? item?.sprites.front_shiny : item?.sprites.front_default} 
                   alt={item.name} 
              />

              <h3>{item.name[0].toUpperCase() + item.name.slice(1)}</h3>

              <div className="pokemon-types">
                  <h6 className={item.types[0].type.name}>{item.types[0].type.name}</h6>

                  {/* MOSTRA SECONDO TIPO SE ESISTE */}
                  {item?.types[1]?.type?.name && <h6 className={item.types[1].type.name}>{item.types[1].type.name}</h6>}
              </div>


            </div>
          ))}

        </div>


    </div>
  )
}