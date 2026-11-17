import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {Droplets, Home} from 'lucide-react';
import {useI18n} from '../i18n/I18nContext';
import {useDocumentTitle} from '../hooks/useDocumentTitle';

export const NotFoundPage: React.FC = () => {
  const {t} = useI18n();
  useDocumentTitle(t.seo.notFoundTitle);

  const [watered, setWatered] = useState(false);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      {/* Animated wilted vs perked plant SVG */}
      <div className="h-44 w-44">
        <svg viewBox="0 0 180 180" className="h-full w-full" aria-hidden="true">
          {/* Pot */}
          <path d="M58 130 L122 130 L114 166 L66 166 Z" fill="#D97757" />
          <rect x="52" y="122" width="76" height="10" rx="5" fill="#E08666" />
          {/* Soil */}
          <ellipse cx="90" cy="130" rx="30" ry="5" fill="#4A3525" />

          {/* Stem */}
          <motion.path
            animate={{
              d: watered
                ? 'M90 128 Q90 86 90 50'
                : 'M90 128 Q95 92 124 102',
            }}
            transition={{type: 'spring', stiffness: 120, damping: 14}}
            fill="none"
            stroke="#10B981"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Left Leaf */}
          <motion.path
            animate={{
              rotate: watered ? 0 : 42,
              y: watered ? 0 : 28,
            }}
            transition={{type: 'spring', stiffness: 120, damping: 14}}
            style={{transformOrigin: '90px 80px'}}
            d="M90 80 C68 62, 48 70, 48 84 C64 94, 78 90, 90 80 Z"
            fill="#34D399"
          />

          {/* Right Leaf */}
          <motion.path
            animate={{
              rotate: watered ? 0 : 52,
              y: watered ? 0 : 32,
            }}
            transition={{type: 'spring', stiffness: 120, damping: 14}}
            style={{transformOrigin: '90px 66px'}}
            d="M90 66 C112 46, 134 56, 134 70 C118 80, 102 76, 90 66 Z"
            fill="#84CC16"
          />
        </svg>
      </div>

      <h1 className="mt-4 font-display text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
        {t.notFound.title}
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {watered ? t.notFound.revivedText : t.notFound.subtitle}
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        {!watered && (
          <button
            type="button"
            onClick={() => setWatered(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            <Droplets className="h-4 w-4" />
            {t.notFound.waterMeBtn}
          </button>
        )}
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          <Home className="h-4 w-4" />
          {t.notFound.goHomeBtn}
        </Link>
      </div>
    </div>
  );
};
