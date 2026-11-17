import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {motion, useScroll, useSpring} from 'framer-motion';
import {ArrowLeft, ArrowRight, Clock} from 'lucide-react';
import {useI18n} from '../i18n/I18nContext';
import {useDocumentTitle} from '../hooks/useDocumentTitle';
import {ARTICLES} from '../data/content';
import {IMAGES} from '../data/images';
import {PlantImage} from '../components/PlantImage';

export const ArticlesPage: React.FC = () => {
  const {lang, t, pick} = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  useDocumentTitle(t.seo.articlesTitle);

  const [activeId, setActiveId] = useState<string | null>(() => searchParams.get('id'));

  useEffect(() => {
    const param = searchParams.get('id');
    setActiveId(param);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [searchParams]);

  const activeArticle = ARTICLES.find((a) => a.id === activeId) || null;

  const {scrollYProgress} = useScroll();
  const scaleX = useSpring(scrollYProgress, {stiffness: 160, damping: 28, restDelta: 0.001});

  if (activeArticle) {
    return (
      <div className="relative">
        {/* Reading Progress Bar */}
        <motion.div
          style={{scaleX}}
          className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-emerald-600"
        />

        <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSearchParams({})}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.articles.backToArticles}
          </button>

          <p className="mt-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="tabular-nums">{activeArticle.date}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 tabular-nums">
              <Clock className="h-3.5 w-3.5" />
              {activeArticle.readMinutes} {t.common.minRead}
            </span>
          </p>

          <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl dark:text-white">
            {pick(activeArticle.title)}
          </h1>

          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
            <PlantImage
              src={IMAGES[activeArticle.imageKey]}
              alt={pick(activeArticle.title)}
              aspectClass="aspect-[16/9]"
            />
          </div>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-700 dark:text-slate-300">
            {activeArticle.paragraphs[lang].map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          {t.articles.title}
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          {t.articles.subtitle}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((art) => (
          <article
            key={art.id}
            className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 backdrop-blur-md transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80"
          >
            <button
              type="button"
              onClick={() => setSearchParams({id: art.id})}
              className="text-left"
            >
              <PlantImage
                src={IMAGES[art.imageKey]}
                alt={pick(art.title)}
                zoomOnHover
              />
            </button>
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <p className="tabular-nums text-xs text-slate-500 dark:text-slate-400">
                  {art.date} · {art.readMinutes} {t.common.minRead}
                </p>
                <button
                  type="button"
                  onClick={() => setSearchParams({id: art.id})}
                  className="mt-1 text-left"
                >
                  <h2 className="font-display text-xl font-bold text-slate-900 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                    {pick(art.title)}
                  </h2>
                </button>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {pick(art.excerpt)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSearchParams({id: art.id})}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
              >
                {t.articles.readArticle}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
