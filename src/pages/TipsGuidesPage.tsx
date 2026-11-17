import React, {useEffect, useMemo, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {AnimatePresence, motion} from 'framer-motion';
import {ChevronDown, Clock, Search} from 'lucide-react';
import {useI18n} from '../i18n/I18nContext';
import {useDocumentTitle} from '../hooks/useDocumentTitle';
import {TIPS_GUIDES, type TipCategory} from '../data/content';

const CATEGORIES: Array<TipCategory | 'all'> = [
  'all',
  'watering',
  'light',
  'soil',
  'fertilizing',
  'pests',
  'propagation',
  'seasonal',
  'decor',
];

export const TipsGuidesPage: React.FC = () => {
  const {lang, t, pick} = useI18n();
  const [searchParams] = useSearchParams();
  useDocumentTitle(t.seo.tipsTitle);

  const [category, setCategory] = useState<TipCategory | 'all'>('all');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(TIPS_GUIDES[0].id);

  useEffect(() => {
    const tipParam = searchParams.get('tip');
    if (tipParam) setOpenId(tipParam);
  }, [searchParams]);

  const tipOfTheDay = useMemo(() => {
    const now = new Date();
    const dayNum = Math.floor(now.getTime() / (1000 * 60 * 60 * 24));
    return TIPS_GUIDES[dayNum % TIPS_GUIDES.length];
  }, []);

  const filteredTips = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TIPS_GUIDES.filter((tip) => {
      if (category !== 'all' && tip.category !== category) return false;
      if (q) {
        return (
          pick(tip.title).toLowerCase().includes(q) ||
          pick(tip.summary).toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [category, query, pick]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          {t.tips.title}
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          {t.tips.subtitle}
        </p>
      </div>

      {/* Tip of the day */}
      <div className="mt-8 rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/80 via-white to-lime-50/70 p-6 dark:border-emerald-900/50 dark:from-emerald-950/45 dark:via-slate-900 dark:to-teal-950/35">
        <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          {t.tips.tipOfTheDay} · {t.tips.categories[tipOfTheDay.category]} · {tipOfTheDay.readMinutes} {t.common.minRead}
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold text-slate-900 dark:text-white">
          {pick(tipOfTheDay.title)}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {pick(tipOfTheDay.summary)}
        </p>
      </div>

      {/* Search & Category buttons */}
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

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                category === cat
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {t.tips.categories[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Expandable Accordion Cards */}
      <div className="mt-8 space-y-3">
        {filteredTips.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-500">{t.common.noResults}</p>
        ) : (
          filteredTips.map((tip) => {
            const isOpen = openId === tip.id;
            return (
              <div
                key={tip.id}
                className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : tip.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <div>
                    <p className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span>{t.tips.categories[tip.category]}</span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1 tabular-nums">
                        <Clock className="h-3 w-3" />
                        {tip.readMinutes} {t.common.minRead}
                      </span>
                    </p>
                    <h3 className="mt-1 font-display text-xl font-bold text-slate-900 dark:text-white">
                      {pick(tip.title)}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{height: 0, opacity: 0}}
                      animate={{height: 'auto', opacity: 1}}
                      exit={{height: 0, opacity: 0}}
                      transition={{duration: 0.2}}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-200/70 px-5 pb-6 pt-4 dark:border-slate-800">
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {pick(tip.summary)}
                        </p>
                        <ol className="mt-4 space-y-2 text-sm text-slate-800 dark:text-slate-200">
                          {tip.steps[lang].map((step, i) => (
                            <li key={i} className="flex gap-2.5">
                              <span className="tabular-nums font-bold text-emerald-600 dark:text-emerald-400">
                                {i + 1}.
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
