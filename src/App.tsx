import React, {lazy, Suspense, useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import {AnimatePresence, motion, MotionConfig} from 'framer-motion';
import {I18nProvider, useI18n} from './i18n/I18nContext';
import {useTheme} from './hooks/useTheme';
import {ToastProvider} from './components/ToastProvider';
import {ErrorBoundary} from './components/ErrorBoundary';
import {Navbar} from './components/Navbar';
import {Footer} from './components/Footer';
import {PageLoader} from './components/PageLoader';
import {ScrollToTop} from './components/ScrollToTop';
import {CommandSearchModal} from './components/CommandSearchModal';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({default: m.HomePage})));
const EncyclopediaPage = lazy(() =>
  import('./pages/EncyclopediaPage').then((m) => ({default: m.EncyclopediaPage})),
);
const PlantFinderPage = lazy(() =>
  import('./pages/PlantFinderPage').then((m) => ({default: m.PlantFinderPage})),
);
const KnowledgeQuizzesPage = lazy(() =>
  import('./pages/KnowledgeQuizzesPage').then((m) => ({default: m.KnowledgeQuizzesPage})),
);
const MiniGamesPage = lazy(() =>
  import('./pages/MiniGamesPage').then((m) => ({default: m.MiniGamesPage})),
);
const PlantDoctorPage = lazy(() =>
  import('./pages/PlantDoctorPage').then((m) => ({default: m.PlantDoctorPage})),
);
const TipsGuidesPage = lazy(() =>
  import('./pages/TipsGuidesPage').then((m) => ({default: m.TipsGuidesPage})),
);
const CareToolsPage = lazy(() =>
  import('./pages/CareToolsPage').then((m) => ({default: m.CareToolsPage})),
);
const AcademyPage = lazy(() =>
  import('./pages/AcademyPage').then((m) => ({default: m.AcademyPage})),
);
const VideosPage = lazy(() =>
  import('./pages/VideosPage').then((m) => ({default: m.VideosPage})),
);
const GalleryPage = lazy(() =>
  import('./pages/GalleryPage').then((m) => ({default: m.GalleryPage})),
);
const GlossaryPage = lazy(() =>
  import('./pages/GlossaryPage').then((m) => ({default: m.GlossaryPage})),
);
const ArticlesPage = lazy(() =>
  import('./pages/ArticlesPage').then((m) => ({default: m.ArticlesPage})),
);
const FavoritesPage = lazy(() =>
  import('./pages/FavoritesPage').then((m) => ({default: m.FavoritesPage})),
);
const FaqContactPage = lazy(() =>
  import('./pages/FaqContactPage').then((m) => ({default: m.FaqContactPage})),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({default: m.NotFoundPage})),
);

function AppShell() {
  const {t} = useI18n();
  const {theme, toggleTheme} = useTheme();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  // Scroll to top on path changes
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'auto'});
  }, [location.pathname]);

  // Global Ctrl+K / Cmd+K command search shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <ErrorBoundary
      title={t.common.errorTitle}
      description={t.common.errorDesc}
      reloadLabel={t.common.reloadPage}
    >
      <div className="bg-grain flex min-h-screen flex-col transition-colors duration-300">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          onOpenSearch={() => setSearchOpen(true)}
        />

        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{opacity: 0, y: 8}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -6}}
                transition={{duration: 0.18}}
              >
                <Routes location={location}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/encyclopedia" element={<EncyclopediaPage />} />
                  <Route path="/finder" element={<PlantFinderPage />} />
                  <Route path="/quizzes" element={<KnowledgeQuizzesPage />} />
                  <Route path="/games" element={<MiniGamesPage />} />
                  <Route path="/doctor" element={<PlantDoctorPage />} />
                  <Route path="/tips" element={<TipsGuidesPage />} />
                  <Route path="/tools" element={<CareToolsPage />} />
                  <Route path="/academy" element={<AcademyPage />} />
                  <Route path="/videos" element={<VideosPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/glossary" element={<GlossaryPage />} />
                  <Route path="/articles" element={<ArticlesPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/contact" element={<FaqContactPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </main>

        <Footer />
        <ScrollToTop />
        <CommandSearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <I18nProvider>
        <ToastProvider>
          <BrowserRouter>
            <AppShell />
          </BrowserRouter>
        </ToastProvider>
      </I18nProvider>
    </MotionConfig>
  );
}
