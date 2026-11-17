import React from 'react';
import {motion} from 'framer-motion';
import {Sprout} from 'lucide-react';
import {useI18n} from '../i18n/I18nContext';

export const PageLoader: React.FC = () => {
  const {t} = useI18n();

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[55vh] flex-col items-center justify-center gap-4 px-6 py-16"
    >
      <motion.div
        animate={{scale: [1, 1.08, 1], rotate: [0, 4, -4, 0]}}
        transition={{duration: 1.8, repeat: Infinity, ease: 'easeInOut'}}
        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300"
      >
        <Sprout className="h-7 w-7" />
      </motion.div>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{t.common.loading}</p>
      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
        {[0, 1, 2].map((idx) => (
          <div
            key={idx}
            className="h-32 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-800/60"
          />
        ))}
      </div>
    </div>
  );
};
