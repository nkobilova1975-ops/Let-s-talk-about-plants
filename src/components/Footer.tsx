import React from 'react';
import {Link} from 'react-router-dom';
import {Github, Instagram, Sprout, Youtube} from 'lucide-react';
import {LANGUAGE_OPTIONS, useI18n} from '../i18n/I18nContext';
import {PWAInstallButton} from './PWAInstallButton';

export const Footer: React.FC = () => {
  const {lang, setLang, t} = useI18n();

  return (
    <footer className="no-print border-t border-emerald-950/10 bg-white/70 backdrop-blur-md dark:border-emerald-200/10 dark:bg-[#0B120E]/80">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 text-slate-900 dark:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <Sprout className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="font-display text-xl font-bold">{t.brand.name}</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {t.brand.tagline}. {t.brand.privacyNote}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <PWAInstallButton />
            </div>
          </div>

          {/* Core Explore links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {t.nav.encyclopedia}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/encyclopedia" className="hover:text-emerald-700 dark:hover:text-emerald-300">{t.nav.encyclopedia}</Link></li>
              <li><Link to="/finder" className="hover:text-emerald-700 dark:hover:text-emerald-300">{t.nav.plantFinder}</Link></li>
              <li><Link to="/doctor" className="hover:text-emerald-700 dark:hover:text-emerald-300">{t.nav.plantDoctor}</Link></li>
              <li><Link to="/tools" className="hover:text-emerald-700 dark:hover:text-emerald-300">{t.nav.tools}</Link></li>
              <li><Link to="/favorites" className="hover:text-emerald-700 dark:hover:text-emerald-300">{t.nav.favorites}</Link></li>
            </ul>
          </div>

          {/* Learning & Play */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {t.nav.academy}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/academy" className="hover:text-emerald-700 dark:hover:text-emerald-300">{t.nav.academy}</Link></li>
              <li><Link to="/quizzes" className="hover:text-emerald-700 dark:hover:text-emerald-300">{t.nav.knowledgeQuiz}</Link></li>
              <li><Link to="/games" className="hover:text-emerald-700 dark:hover:text-emerald-300">{t.nav.miniGames}</Link></li>
              <li><Link to="/tips" className="hover:text-emerald-700 dark:hover:text-emerald-300">{t.nav.tips}</Link></li>
              <li><Link to="/glossary" className="hover:text-emerald-700 dark:hover:text-emerald-300">{t.nav.glossary}</Link></li>
            </ul>
          </div>

          {/* Media & Language */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {t.nav.explore}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/videos" className="hover:text-emerald-700 dark:hover:text-emerald-300">{t.nav.videos}</Link></li>
              <li><Link to="/gallery" className="hover:text-emerald-700 dark:hover:text-emerald-300">{t.nav.gallery}</Link></li>
              <li><Link to="/articles" className="hover:text-emerald-700 dark:hover:text-emerald-300">{t.nav.articles}</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-700 dark:hover:text-emerald-300">{t.nav.faqContact}</Link></li>
            </ul>

            <div className="flex items-center gap-1.5 pt-2">
              {LANGUAGE_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => setLang(opt.code)}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                    lang === opt.code
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{opt.flag}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-200/80 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center dark:border-slate-800 dark:text-slate-400">
          <p>{t.brand.copyright}</p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-emerald-700 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-emerald-700 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-emerald-700 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
