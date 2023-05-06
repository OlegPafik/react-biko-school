import './Home.css'
import React, { useEffect, useState } from 'react'
import { api } from '../../api'

export const Home = () => {
  // const [comics, setComics] = useState([])
  const [characters, setCharacters] = useState([])
  const [character1, setCharacter1] = useState("")  
  const [character2, setCharacter2] = useState("")
  const [firstCharacterComics, setFirstCharacterComics] = useState([])  
  const [secondCharacterComics, setSecondCharacterComics] = useState([])

  // const getComics = async () => {
  //   const comicsReceived = await api.allComics()
  //   setComics(comicsReceived)
  // }

  const getCharacters = async () => {
    const charactersReceived = await api.characters()
    setCharacters(charactersReceived)
  }

  const getCharacterComics = async (character, setCharacterComics) => {
    let receivedCharacterComics = []
    try {
      receivedCharacterComics = await api.comics(character)
    }
    catch {}
    setCharacterComics(receivedCharacterComics)
  }

  useEffect(() => {
    // getComics()
    getCharacters()
  }, [])

  useEffect(() => {
    getCharacterComics(character1, setFirstCharacterComics)
  }, [character1])

  useEffect(() => {
    getCharacterComics(character2, setSecondCharacterComics)
  }, [character2])

  const commonComics = firstCharacterComics.filter(
     comic1 => secondCharacterComics.some(comic2 => comic1.id === comic2.id)
    )

  return (
    <main className="container">
      <Header />
      <ComicList comics={commonComics} characters={characters} 
      setCharacter1={setCharacter1} setCharacter2={setCharacter2}
      character1={character1} character2={character2} />
      <Footer itemsCount={commonComics.length} />
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

const ComicList = ({ 
  comics, characters,
  setCharacter1, setCharacter2,
  character1, character2 }) => {

  return (
    <section>
      <p className="inputLabel">
        Selecciona una pareja de personajes
      </p>
      <div className="inputContainer">
        <Select options={characters} setCharacter={setCharacter1} character={character1} />
        <Select options={characters} setCharacter={setCharacter2} character={character2} />
        <button className="clearButton" onClick={() => {
          setCharacter1("")
          setCharacter2("")
        }}>
          Limpiar búsqueda
        </button>
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

const Select = ({ options, setCharacter, character }) => {
  return (
    <select className="characterSelector" value={character}
      onChange={(e) => {setCharacter(e.target.value)}} >
      <option value="" />
      {
        options.map(option => {
          return <option key={option.id} value={option.id}>{option.name}</option>
        })
      }
    </select>
  )
}








