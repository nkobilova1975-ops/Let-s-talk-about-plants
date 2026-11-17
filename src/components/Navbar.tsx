import React, {useEffect, useRef, useState} from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';
import {AnimatePresence, motion} from 'framer-motion';
import {
  ChevronDown,
  Heart,
  Menu,
  Moon,
  Search,
  Sprout,
  Sun,
  X,
} from 'lucide-react';
import {LANGUAGE_OPTIONS, useI18n} from '../i18n/I18nContext';
import type {Theme} from '../hooks/useTheme';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({theme, toggleTheme, onOpenSearch}) => {
  const {lang, setLang, t} = useI18n();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<'play' | 'explore' | 'lang' | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const currentLangObj = LANGUAGE_OPTIONS.find((item) => item.code === lang) ?? LANGUAGE_OPTIONS[0];

  const linkClass = ({isActive}: {isActive: boolean}) =>
    `whitespace-nowrap shrink-0 text-sm font-medium transition-colors ${
      isActive
        ? 'text-emerald-700 dark:text-emerald-300'
        : 'text-slate-700 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-300'
    }`;

  return (
    <header
      ref={navRef}
      className="no-print sticky top-0 z-40 border-b border-emerald-900/10 bg-white/80 backdrop-blur-xl dark:border-emerald-200/10 dark:bg-[#0B120E]/85"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Brand wordmark */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 whitespace-nowrap text-lg font-bold tracking-tight text-slate-900 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
            <Sprout className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="font-display text-xl tracking-tight">{t.brand.name}</span>
        </Link>

        {/* Zone 2: Concise single-line navigation links */}
        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
          <NavLink to="/encyclopedia" className={linkClass}>
            {t.nav.encyclopedia}
          </NavLink>
          <NavLink to="/academy" className={linkClass}>
            {t.nav.academy}
          </NavLink>
          <NavLink to="/tools" className={linkClass}>
            {t.nav.tools}
          </NavLink>

          {/* Play & Quiz Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu((prev) => (prev === 'play' ? null : 'play'))}
              aria-expanded={openMenu === 'play'}
              className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-medium text-slate-700 transition-colors hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-300"
            >
              {t.nav.quizzes}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <AnimatePresence>
              {openMenu === 'play' && (
                <motion.div
                  initial={{opacity: 0, y: 6}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: 4}}
                  transition={{duration: 0.14}}
                  className="absolute left-0 top-full mt-3 w-52 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <Link
                    to="/finder"
                    className="block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 dark:text-slate-200 dark:hover:bg-emerald-950/60"
                  >
                    {t.nav.plantFinder}
                  </Link>
                  <Link
                    to="/quizzes"
                    className="block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 dark:text-slate-200 dark:hover:bg-emerald-950/60"
                  >
                    {t.nav.knowledgeQuiz}
                  </Link>
                  <Link
                    to="/games"
                    className="block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 dark:text-slate-200 dark:hover:bg-emerald-950/60"
                  >
                    {t.nav.miniGames}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Explore Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu((prev) => (prev === 'explore' ? null : 'explore'))}
              aria-expanded={openMenu === 'explore'}
              className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-medium text-slate-700 transition-colors hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-300"
            >
              {t.nav.explore}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <AnimatePresence>
              {openMenu === 'explore' && (
                <motion.div
                  initial={{opacity: 0, y: 6}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: 4}}
                  transition={{duration: 0.14}}
                  className="absolute left-0 top-full mt-3 grid w-64 grid-cols-1 gap-0.5 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <Link to="/doctor" className="rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">
                    {t.nav.plantDoctor}
                  </Link>
                  <Link to="/tips" className="rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">
                    {t.nav.tips}
                  </Link>
                  <Link to="/videos" className="rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">
                    {t.nav.videos}
                  </Link>
                  <Link to="/gallery" className="rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">
                    {t.nav.gallery}
                  </Link>
                  <Link to="/glossary" className="rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">
                    {t.nav.glossary}
                  </Link>
                  <Link to="/articles" className="rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">
                    {t.nav.articles}
                  </Link>
                  <Link to="/favorites" className="rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">
                    {t.nav.favorites}
                  </Link>
                  <Link to="/contact" className="rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">
                    {t.nav.faqContact}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Zone 3: Utility & Primary Action Controls */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label={t.nav.searchShortcut}
            className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-xl border border-slate-200/90 bg-slate-50/80 px-3 text-xs font-medium text-slate-600 transition hover:border-emerald-300 hover:text-emerald-800 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:border-emerald-700"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t.nav.searchShortcut}</span>
            <kbd className="hidden rounded bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-400 shadow-xs sm:inline dark:bg-slate-900">
              ⌘K
            </kbd>
          </button>

          <Link
            to="/favorites"
            aria-label={t.nav.favorites}
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200/90 text-slate-600 transition hover:border-emerald-300 hover:text-rose-500 sm:inline-flex dark:border-slate-700 dark:text-slate-300"
          >
            <Heart className="h-4 w-4" />
          </Link>

          {/* Language Switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu((prev) => (prev === 'lang' ? null : 'lang'))}
              aria-expanded={openMenu === 'lang'}
              aria-label="Language"
              className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-xl border border-slate-200/90 px-2.5 text-xs font-semibold text-slate-700 transition hover:border-emerald-300 dark:border-slate-700 dark:text-slate-200"
            >
              <span aria-hidden="true">{currentLangObj.flag}</span>
              <span>{currentLangObj.label}</span>
            </button>
            <AnimatePresence>
              {openMenu === 'lang' && (
                <motion.div
                  initial={{opacity: 0, y: 6}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: 4}}
                  transition={{duration: 0.14}}
                  className="absolute right-0 top-full mt-2 w-36 rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-xl dark:border-slate-800 dark:bg-slate-900"
                >
                  {LANGUAGE_OPTIONS.map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => {
                        setLang(opt.code);
                        setOpenMenu(null);
                      }}
                      className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-medium transition ${
                        lang === opt.code
                          ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200'
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{opt.flag}</span>
                      <span>{opt.nativeName}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.common.lightMode : t.common.darkMode}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/90 text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700 dark:border-slate-700 dark:text-slate-300 dark:hover:text-emerald-300"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/90 text-slate-700 lg:hidden dark:border-slate-700 dark:text-slate-200"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: 'auto'}}
            exit={{opacity: 0, height: 0}}
            transition={{duration: 0.2}}
            className="overflow-hidden border-t border-slate-200/80 bg-white/95 px-4 pb-5 pt-3 backdrop-blur-xl lg:hidden dark:border-slate-800 dark:bg-slate-950/95"
          >
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link to="/" className="rounded-xl px-3 py-2.5 font-medium text-slate-800 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">{t.nav.home}</Link>
              <Link to="/encyclopedia" className="rounded-xl px-3 py-2.5 font-medium text-slate-800 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">{t.nav.encyclopedia}</Link>
              <Link to="/finder" className="rounded-xl px-3 py-2.5 font-medium text-slate-800 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">{t.nav.plantFinder}</Link>
              <Link to="/quizzes" className="rounded-xl px-3 py-2.5 font-medium text-slate-800 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">{t.nav.knowledgeQuiz}</Link>
              <Link to="/games" className="rounded-xl px-3 py-2.5 font-medium text-slate-800 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">{t.nav.miniGames}</Link>
              <Link to="/doctor" className="rounded-xl px-3 py-2.5 font-medium text-slate-800 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">{t.nav.plantDoctor}</Link>
              <Link to="/tips" className="rounded-xl px-3 py-2.5 font-medium text-slate-800 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">{t.nav.tips}</Link>
              <Link to="/tools" className="rounded-xl px-3 py-2.5 font-medium text-slate-800 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">{t.nav.tools}</Link>
              <Link to="/academy" className="rounded-xl px-3 py-2.5 font-medium text-slate-800 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">{t.nav.academy}</Link>
              <Link to="/videos" className="rounded-xl px-3 py-2.5 font-medium text-slate-800 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">{t.nav.videos}</Link>
              <Link to="/gallery" className="rounded-xl px-3 py-2.5 font-medium text-slate-800 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">{t.nav.gallery}</Link>
              <Link to="/glossary" className="rounded-xl px-3 py-2.5 font-medium text-slate-800 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">{t.nav.glossary}</Link>
              <Link to="/articles" className="rounded-xl px-3 py-2.5 font-medium text-slate-800 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">{t.nav.articles}</Link>
              <Link to="/favorites" className="rounded-xl px-3 py-2.5 font-medium text-slate-800 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">{t.nav.favorites}</Link>
              <Link to="/contact" className="col-span-2 rounded-xl px-3 py-2.5 font-medium text-slate-800 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60">{t.nav.faqContact}</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
