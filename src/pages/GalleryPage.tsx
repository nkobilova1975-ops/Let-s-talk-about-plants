import React, {useEffect, useMemo, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {ChevronLeft, ChevronRight, X} from 'lucide-react';
import {useI18n} from '../i18n/I18nContext';
import {useDocumentTitle} from '../hooks/useDocumentTitle';
import {GALLERY_ITEMS, type GalleryCategory} from '../data/content';
import {IMAGES} from '../data/images';
import {PlantImage} from '../components/PlantImage';

const CATS: Array<GalleryCategory | 'all'> = [
  'all',
  'tropical',
  'minimalist',
  'trailing',
  'flowering',
  'care',
];

export const GalleryPage: React.FC = () => {
  const {t, pick} = useI18n();
  useDocumentTitle(t.seo.galleryTitle);

  const [category, setCategory] = useState<GalleryCategory | 'all'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => GALLERY_ITEMS.filter((item) => (category === 'all' ? true : item.category === category)),
    [category],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
      if (e.key === 'ArrowLeft')
        setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, filtered.length]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          {t.gallery.title}
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          {t.gallery.subtitle}
        </p>
      </div>

      <div className="mt-7 flex flex-wrap gap-2">
        {CATS.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setCategory(cat);
              setLightboxIndex(null);
            }}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
              category === cat
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            {t.gallery.categories[cat]}
          </button>
        ))}
      </div>

      {/* Masonry Columns */}
      <div className="mt-8 columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
        {filtered.map((item, idx) => (
          <motion.button
            key={item.id}
            type="button"
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.25, delay: idx * 0.04}}
            onClick={() => setLightboxIndex(idx)}
            className="group block w-full break-inside-avoid overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 text-left backdrop-blur-md transition hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/80"
          >
            <PlantImage
              src={IMAGES[item.imageKey]}
              alt={pick(item.title)}
              aspectClass={idx % 2 === 0 ? 'aspect-[4/3]' : 'aspect-[16/10]'}
              zoomOnHover
            />
            <div className="p-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.gallery.categories[item.category]}
              </p>
              <h2 className="mt-1 font-display text-lg font-bold text-slate-900 dark:text-white">
                {pick(item.title)}
              </h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                {pick(item.caption)}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label={t.common.close}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                <X className="h-5 w-5" />
              </button>

              <PlantImage
                src={IMAGES[filtered[lightboxIndex].imageKey]}
                alt={pick(filtered[lightboxIndex].title)}
                aspectClass="aspect-[16/10]"
              />

              <div className="flex items-center justify-between gap-4 p-5 text-white">
                <div>
                  <h3 className="font-display text-xl font-bold">
                    {pick(filtered[lightboxIndex].title)}
                  </h3>
                  <p className="mt-1 text-sm text-slate-300">
                    {pick(filtered[lightboxIndex].caption)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={t.common.back}
                    onClick={() =>
                      setLightboxIndex((i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length))
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label={t.common.next}
                    onClick={() =>
                      setLightboxIndex((i) => (i === null ? 0 : (i + 1) % filtered.length))
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
