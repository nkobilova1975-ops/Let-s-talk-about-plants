import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {en} from './en';
import {ru} from './ru';
import {uz} from './uz';
import type {Language, LocalizedText, TranslationDictionary} from './types';
import {getStorage, setStorage} from '../utils/storage';

const LANG_STORAGE_KEY = 'greennest_lang';

const DICTIONARIES: Record<Language, TranslationDictionary> = {
  en,
  ru,
  uz,
};

export const LANGUAGE_OPTIONS: Array<{code: Language; label: string; flag: string; nativeName: string}> = [
  {code: 'en', label: 'EN', flag: '🇬🇧', nativeName: 'English'},
  {code: 'ru', label: 'RU', flag: '🇷🇺', nativeName: 'Русский'},
  {code: 'uz', label: 'UZ', flag: '🇺🇿', nativeName: 'O‘zbekcha'},
];

function detectInitialLanguage(): Language {
  const saved = getStorage<Language | null>(LANG_STORAGE_KEY, null);
  if (saved === 'en' || saved === 'ru' || saved === 'uz') {
    return saved;
  }
  if (typeof navigator !== 'undefined' && navigator.language) {
    const code = navigator.language.slice(0, 2).toLowerCase();
    if (code === 'ru') return 'ru';
    if (code === 'uz') return 'uz';
  }
  return 'en';
}

interface I18nContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationDictionary;
  pick: (localized: LocalizedText) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [lang, setLangState] = useState<Language>(detectInitialLanguage);

  const setLang = useCallback((nextLang: Language) => {
    setLangState(nextLang);
    setStorage(LANG_STORAGE_KEY, nextLang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const pick = useCallback(
    (localized: LocalizedText) => localized[lang] ?? localized.en,
    [lang],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t: DICTIONARIES[lang],
      pick,
    }),
    [lang, setLang, pick],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used inside I18nProvider');
  }
  return ctx;
}
