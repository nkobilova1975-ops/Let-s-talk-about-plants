import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AnimatePresence, motion} from 'framer-motion';
import {BookOpen, FileText, Leaf, Lightbulb, Search, X} from 'lucide-react';
import {useI18n} from '../i18n/I18nContext';
import {PLANTS} from '../data/plants';
import {ARTICLES, GLOSSARY_TERMS, TIPS_GUIDES} from '../data/content';

interface CommandSearchModalProps {
  open: boolean;
  onClose: () => void;
}

interface SearchHit {
  id: string;
  group: 'plant' | 'tip' | 'article' | 'glossary';
  title: string;
  subtitle: string;
  to: string;
}

export const CommandSearchModal: React.FC<CommandSearchModalProps> = ({open, onClose}) => {
  const {t, pick} = useI18n();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setActiveIdx(0);
    }
  }, [open]);

  const results = useMemo<SearchHit[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const hits: SearchHit[] = [];

    for (const p of PLANTS) {
      const name = pick(p.name);
      if (name.toLowerCase().includes(q) || p.latinName.toLowerCase().includes(q)) {
        hits.push({
          id: `plant-${p.id}`,
          group: 'plant',
          title: name,
          subtitle: p.latinName,
          to: `/encyclopedia?plant=${p.slug}`,
        });
      }
    }

    for (const tip of TIPS_GUIDES) {
      const title = pick(tip.title);
      if (title.toLowerCase().includes(q) || pick(tip.summary).toLowerCase().includes(q)) {
        hits.push({
          id: `tip-${tip.id}`,
          group: 'tip',
          title,
          subtitle: pick(tip.summary),
          to: `/tips?tip=${tip.id}`,
        });
      }
    }

    for (const art of ARTICLES) {
      const title = pick(art.title);
      if (title.toLowerCase().includes(q) || pick(art.excerpt).toLowerCase().includes(q)) {
        hits.push({
          id: `art-${art.id}`,
          group: 'article',
          title,
          subtitle: pick(art.excerpt),
          to: `/articles?id=${art.id}`,
        });
      }
    }

    for (const term of GLOSSARY_TERMS) {
      const title = pick(term.term);
      if (title.toLowerCase().includes(q) || pick(term.definition).toLowerCase().includes(q)) {
        hits.push({
          id: `gl-${term.id}`,
          group: 'glossary',
          title,
          subtitle: pick(term.definition),
          to: `/glossary?q=${encodeURIComponent(title)}`,
        });
      }
    }

    return hits.slice(0, 12);
  }, [query, pick]);

  useEffect(() => {
    setActiveIdx(0);
  }, [results.length]);

  const handleSelect = (hit: SearchHit) => {
    navigate(hit.to);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((prev) => (results.length ? (prev + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((prev) => (results.length ? (prev - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter' && results[activeIdx]) {
      e.preventDefault();
      handleSelect(results[activeIdx]);
    }
  };

  const groupIcon = (group: SearchHit['group']) => {
    switch (group) {
      case 'plant':
        return <Leaf className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      case 'tip':
        return <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
      case 'article':
        return <FileText className="h-4 w-4 text-teal-600 dark:text-teal-400" />;
      case 'glossary':
        return <BookOpen className="h-4 w-4 text-lime-600 dark:text-lime-400" />;
    }
  };

  const groupLabel = (group: SearchHit['group']) => {
    switch (group) {
      case 'plant':
        return t.searchModal.plantsGroup;
      case 'tip':
        return t.searchModal.tipsGroup;
      case 'article':
        return t.searchModal.articlesGroup;
      case 'glossary':
        return t.searchModal.glossaryGroup;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/50 px-4 pt-20 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.searchShortcut}
        >
          <motion.div
            initial={{opacity: 0, y: -12, scale: 0.98}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: -8, scale: 0.98}}
            transition={{duration: 0.16}}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
            className="w-full max-w-xl overflow-hidden rounded-3xl border border-emerald-200/70 bg-white shadow-2xl dark:border-emerald-900/60 dark:bg-slate-900"
          >
            <div className="flex items-center gap-3 border-b border-slate-200/80 px-5 py-4 dark:border-slate-800">
              <Search className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchModal.placeholder}
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label={t.common.close}
                className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-3">
              {!query.trim() ? (
                <p className="px-3 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                  {t.searchModal.emptyPrompt}
                </p>
              ) : results.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                  {t.common.noResults}
                </p>
              ) : (
                <ul className="space-y-1">
                  {results.map((hit, index) => (
                    <li key={hit.id}>
                      <button
                        type="button"
                        onClick={() => handleSelect(hit)}
                        onMouseEnter={() => setActiveIdx(index)}
                        className={`flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-left transition ${
                          index === activeIdx
                            ? 'bg-emerald-50 text-emerald-950 dark:bg-emerald-950/60 dark:text-emerald-100'
                            : 'text-slate-800 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                          {groupIcon(hit.group)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{hit.title}</p>
                          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                            {groupLabel(hit.group)} · {hit.subtitle}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-200/80 px-5 py-2.5 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span>{t.searchModal.navigateHint}</span>
              <span className="font-mono">Ctrl + K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
