import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {ArrowUp} from 'lucide-react';
import {useI18n} from '../i18n/I18nContext';

export const ScrollToTop: React.FC = () => {
  const {t} = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 380);
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{opacity: 0, y: 12}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: 12}}
          transition={{duration: 0.18}}
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          aria-label={t.common.scrollToTop}
          className="no-print fixed bottom-5 left-5 z-40 flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-200/80 bg-white/90 text-emerald-800 shadow-md backdrop-blur-md transition hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:border-emerald-800/70 dark:bg-slate-900/90 dark:text-emerald-300 dark:hover:bg-slate-800"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
