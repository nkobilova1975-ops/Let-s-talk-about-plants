import React, {useEffect, useMemo, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Search} from 'lucide-react';
import {useI18n} from '../i18n/I18nContext';
import {useDocumentTitle} from '../hooks/useDocumentTitle';
import {GLOSSARY_TERMS} from '../data/content';

export const GlossaryPage: React.FC = () => {
  const {t, pick} = useI18n();
  const [searchParams] = useSearchParams();
  useDocumentTitle(t.seo.glossaryTitle);

  const [query, setQuery] = useState('');
  const [letter, setLetter] = useState<string>('ALL');

  useEffect(() => {
    const qParam = searchParams.get('q');
    if (qParam) setQuery(qParam);
  }, [searchParams]);

  const letters = useMemo(() => {
    const set = Array.from(new Set(GLOSSARY_TERMS.map((item) => item.letter))).sort();
    return ['ALL', ...set];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY_TERMS.filter((term) => {
      if (letter !== 'ALL' && term.letter !== letter) return false;
      if (q) {
        return (
          pick(term.term).toLowerCase().includes(q) ||
          pick(term.definition).toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [query, letter, pick]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          {t.glossary.title}
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          {t.glossary.subtitle}
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.common.searchPlaceholder}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {letters.map((ltr) => (
            <button
              key={ltr}
              type="button"
              onClick={() => setLetter(ltr)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                letter === ltr
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {ltr === 'ALL' ? t.glossary.allLetters : ltr}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-slate-500">{t.common.noResults}</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80"
            >
              <p className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                {item.letter}
              </p>
              <h2 className="mt-1 font-display text-xl font-bold text-slate-900 dark:text-white">
                {pick(item.term)}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {pick(item.definition)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
