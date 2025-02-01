'use client'

import React, { createContext, useState, useContext } from 'react'
import { IntlProvider } from 'react-intl'
import jaMessages from '@/locales/ja.json'
import enMessages from '@/locales/en.json'

const LanguageContext = createContext({
  locale: 'ja',
  setLocale: (locale: string) => {},
})

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState('ja')

  const messages = {
    ja: jaMessages,
    en: enMessages,
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      <IntlProvider messages={messages[locale as keyof typeof messages]} locale={locale}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  )
}

