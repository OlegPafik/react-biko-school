import React, { createContext, useState, useContext } from 'react'
import { themes } from '../themes'


export const ThemeContext = createContext({theme: themes.light, modifyTheme: () => {}, allThemes: themes})

export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState(useContext(ThemeContext).theme)
  const themesP = useContext(ThemeContext).allThemes

  return (
    <ThemeContext.Provider value={{theme, modifyTheme: setTheme, allThemes: themesP}}>
      { children }
    </ThemeContext.Provider>
  )
}