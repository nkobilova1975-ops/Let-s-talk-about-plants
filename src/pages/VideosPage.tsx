import React, {useMemo, useState} from 'react';
import {motion} from 'framer-motion';
import {ExternalLink, Play} from 'lucide-react';
import {useI18n} from '../i18n/I18nContext';
import {useDocumentTitle} from '../hooks/useDocumentTitle';
import {VIDEOS, type VideoCategory} from '../data/content';
import {IMAGES} from '../data/images';
import {PlantImage} from '../components/PlantImage';

const VIDEO_CATS: Array<VideoCategory | 'all'> = [
  'all',
  'watering',
  'repotting',
  'propagation',
  'pests',
  'decor',
];

export const VideosPage: React.FC = () => {
  const {t, pick} = useI18n();
  useDocumentTitle(t.seo.videosTitle);

  const [category, setCategory] = useState<VideoCategory | 'all'>('all');
  const [activeVideoIds, setActiveVideoIds] = useState<Record<string, boolean>>({});
  const [failedEmbeds, setFailedEmbeds] = useState<Record<string, boolean>>({});

  const filtered = useMemo(
    () => VIDEOS.filter((v) => (category === 'all' ? true : v.category === category)),
    [category],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          {t.videos.title}
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          {t.videos.subtitle}
        </p>
      </div>

      {/* Category filters */}
      <div className="mt-7 flex flex-wrap gap-2">
        {VIDEO_CATS.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
              category === cat
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            {t.videos.categories[cat]}
          </button>
        ))}
      </div>

      {/* Video Grid with privacy-enhanced youtube-nocookie lazy embeds */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((vid) => {
          const isLoaded = Boolean(activeVideoIds[vid.id]);
          const hasFailed = Boolean(failedEmbeds[vid.id]);
          const watchUrl = `https://www.youtube.com/watch?v=${vid.youtubeId}`;

          return (
            <div
              key={vid.id}
              className="flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                {!isLoaded ? (
                  <button
                    type="button"
                    onClick={() => setActiveVideoIds((prev) => ({...prev, [vid.id]: true}))}
                    aria-label={`${t.videos.watchNow}: ${pick(vid.title)}`}
                    className="group relative h-full w-full text-left"
                  >
                    <PlantImage
                      src={IMAGES[vid.thumbnailKey]}
                      alt={pick(vid.title)}
                      aspectClass="h-full w-full"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 transition group-hover:bg-black/45">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition group-hover:scale-105">
                        <Play className="ml-0.5 h-6 w-6 fill-current" />
                      </span>
                      <span className="mt-2.5 text-xs font-semibold text-white">
                        {t.videos.watchNow} · {vid.duration}
                      </span>
                    </div>
                  </button>
                ) : hasFailed ? (
                  <div className="flex h-full flex-col items-center justify-center p-5 text-center text-white">
                    <p className="text-xs text-slate-300">{t.videos.videoUnavailable}</p>
                    <a
                      href={watchUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white"
                    >
                      {t.videos.openYoutube}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                ) : (
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${vid.youtubeId}?autoplay=1&rel=0`}
                    title={pick(vid.title)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onError={() => setFailedEmbeds((prev) => ({...prev, [vid.id]: true}))}
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t.videos.categories[vid.category]} · {vid.duration}
                  </p>
                  <h2 className="mt-1 font-display text-lg font-bold text-slate-900 dark:text-white">
                    {pick(vid.title)}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {pick(vid.description)}
                  </p>
                </div>
                <a
                  href={watchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
                >
                  {t.videos.openYoutube}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Decorative looping botanical ambient motion banner */}
      <div className="relative mt-14 overflow-hidden rounded-3xl border border-emerald-200/70 bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 p-8 text-white sm:p-12">
        <motion.div
          aria-hidden="true"
          animate={{scale: [1, 1.12, 1], x: [0, 18, 0]}}
          transition={{duration: 10, repeat: Infinity, ease: 'easeInOut'}}
          className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl"
        />
        <motion.div
          aria-hidden="true"
          animate={{scale: [1, 1.16, 1], y: [0, -16, 0]}}
          transition={{duration: 12, repeat: Infinity, ease: 'easeInOut'}}
          className="pointer-events-none absolute -bottom-16 left-1/3 h-64 w-64 rounded-full bg-lime-400/15 blur-3xl"
        />
        <div className="relative z-10 max-w-xl">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">{t.videos.ambientTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-emerald-100/90">
            {t.videos.ambientDesc}
          </p>
        </div>
      </div>
    </div>
  );
};
