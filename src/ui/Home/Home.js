import './Home.css'
import React, { useEffect, useState, useContext } from 'react'
import { api } from '../../api'
import { ThemeProvider , ThemeContext } from '../_context/ThemeProvider'

export const Home = () => {
  const [firstCharacterSelect, setFirstCharacterSelect] = useState()
  const [secondCharacterSelect, setSecondCharacterSelect] = useState()
  const [characters, setCharacters] = useState([])
  const [comics, setComics] = useState([])

  useEffect(() => {
    const fetchCharacters = async () => {
      const characters = await api.characters()
      setCharacters(characters)
    }

    fetchCharacters()
  }, [])

  useEffect(() => {
    if (!firstCharacterSelect || !secondCharacterSelect) return

    const getCommonComics = async () => {
      const firstCharacterComics = await api.comics(firstCharacterSelect)
      const secondCharacterComics = await api.comics(secondCharacterSelect)

      const commonComics = firstCharacterComics.filter(comic1 => secondCharacterComics.some(comic2 => comic1.id === comic2.id))

      setComics(commonComics)
    }

    getCommonComics()
  }, [firstCharacterSelect, secondCharacterSelect])

  const clearSearch = () => {
    setFirstCharacterSelect(undefined)
    setSecondCharacterSelect(undefined)
    setComics([])
  }

  return (
    <ThemeProvider>
      <main className="container" >
        <Header />
        <ComicList characters={characters}
                  firstCharacterSelect={firstCharacterSelect}
                  secondCharacterSelect={secondCharacterSelect}
                  onFirstCharacterSelect={setFirstCharacterSelect}
                  onSecondCharacterSelect={setSecondCharacterSelect}
                  comics={comics}
                  onClear={clearSearch}
        />
        <Footer itemsCount={comics.length} />
      </main>
    </ThemeProvider>
  )
}

const Header = () => {
  const {theme, modifyTheme: setTheme, allThemes: themes} = useContext(ThemeContext)

  const onCheck = (e) =>{
    if (e.target.checked) {
      setTheme(themes.dark)
    } else {
      setTheme(themes.light)
    }
  }

  return (
    <header>
      <div className="checkboxContainer">
        <input className="checkbox" type="checkbox" onChange={onCheck}/>
        <span className="checkboxLabel">El tema actual es: {theme.name}</span>
      </div>
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
                     comics,
                     characters,
                     firstCharacterSelect,
                     secondCharacterSelect,
                     onFirstCharacterSelect,
                     onSecondCharacterSelect,
                     onClear
  }) => {
  const selectOptions = characters.map(character => ({ value: character.id, label: character.name }))

  return (
    <section>
      <p className="inputLabel">
        Selecciona una pareja de personajes
      </p>
      <div className="inputContainer">
        <Select options={selectOptions} value={firstCharacterSelect} onChange={onFirstCharacterSelect} />
        <Select options={selectOptions} value={secondCharacterSelect} onChange={onSecondCharacterSelect} />
        <button className="clearButton" onClick={() => onClear()}>Limpiar búsqueda</button>
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

const Select = ({ options, value = '', onChange }) => {
  return (
    <select className="characterSelector" value={value} onChange={e => onChange(e.target.value)}>
      <option value="" />
      {
        options.map(option => {
          return <option key={option.value} value={option.value}>{option.label}</option>
        })
      }
    </select>
  )
}








