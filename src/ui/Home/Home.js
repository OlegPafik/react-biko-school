import './Home.css'
import React, { useEffect, useState } from 'react'
import { api } from '../../api'

export const Home = () => {
  // Get all comics
  const [comics, setComics] = useState([])

  const getComics = async () => {
    const comicsReceived = await api.allComics()
    setComics(comicsReceived)
  }

  useEffect(() => {
    getComics()
  }, [])

 
  // Get all characters
  const [characters, setCharacters] = useState([])

  const getCharacters = async () => {
    const charactersReceived = await api.characters()
    setCharacters(charactersReceived)
  }

  useEffect(() => {
    getCharacters()
  }, [])


  // Selected characters
  const [character1, setCharacter1] = useState("")  
  const [character2, setCharacter2] = useState("")

  // Get firstCharacterComics and secondCharacterComics
  const [firstCharacterComics, setCharacter1Comics] = useState("")  
  const [secondCharacterComics, setCharacter2Comics] = useState("")

  const getCharacterComics = async (character, setCharacterComics) => {
    const receivedCharacterComics = await api.comics(character)
    setCharacterComics(receivedCharacterComics)
  }

  //let comic1 = getCharacterComics(character1, setCharacter1Comics)
  //let comic2 = getCharacterComics(character2, setCharacter2Comics)

  return (
    <main className="container">
      <Header />
      <p>{character1}</p>
      <p>{character2}</p>
      <ComicList comics={comics} characters={characters} setCharacter1={setCharacter1} setCharacter2={setCharacter2} />
      <Footer itemsCount={comics.length} />
    </main>
  )
}

const Header = () => {
  return (
    <header>
      <h1 className="title">
        Buscador de cómics de Marvel
      </h1>
      <h2 className="subtitle">
        Este buscador encontrará los cómics en los que aparezcan los dos personajes que selecciones en el formulario
      </h2>
    </header>
  )
}

const ComicList = ({ comics, characters, setCharacter1, setCharacter2}) => {

  return (
    <section>
      <p className="inputLabel">
        Selecciona una pareja de personajes
      </p>
      <div className="inputContainer">
        <Select options={characters} setCharacter={setCharacter1} />
        <Select options={characters} setCharacter={setCharacter2} />
        <button className="clearButton">Limpiar búsqueda</button>
      </div>
      {comics.map(comic => (
        <div key={comic.id} className="comicCard">
          <p className="comicTitle">
            {comic.title}
          </p>
          <p>{comic.characters.join(', ')}</p>
        </div>
      ))}
    </section>
  )
}

const Footer = ({ itemsCount }) => {
  return (
    <footer>
      <p>Elementos en la lista: {itemsCount}</p>
    </footer>
  )
}

const Select = ({ options, setCharacter }) => {
  //const commonComics = firstCharacterComics.filter(
  //  comic1 => secondCharacterComics.some(comic2 => comic.id === comic2.id)
  //)

  return (
    <select className="characterSelector" onChange={(e) => setCharacter(e.target.value)}>
      <option value="" />
      {
        options.map(option => {
          return <option key={option.id} value={option.id}>{option.name}</option>
        })
      }
    </select>
  )
}








