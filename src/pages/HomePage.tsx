import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {motion, useScroll, useTransform} from 'framer-motion';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  GraduationCap,
  RefreshCw,
  Stethoscope,
} from 'lucide-react';
import {useI18n} from '../i18n/I18nContext';
import {useDocumentTitle} from '../hooks/useDocumentTitle';
import {PLANTS} from '../data/plants';
import {FUN_FACTS, TESTIMONIALS} from '../data/content';
import {getPlantImage, IMAGES} from '../data/images';
import {PlantImage} from '../components/PlantImage';
import {getStorage, setStorage} from '../utils/storage';
import {useToast} from '../components/ToastProvider';

function AnimatedCounter({target, suffix = ''}: {target: number; suffix?: string}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVal(target);
      return;
    }
    let start = 0;
    const duration = 900;
    const startTime = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(target * eased);
      setVal(start);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return (
    <span className="tabular-nums">
      {val}
      {suffix}
    </span>
  );
}

export const HomePage: React.FC = () => {
  const {t, pick} = useI18n();
  const {showToast} = useToast();
  useDocumentTitle(t.seo.homeTitle, t.seo.homeDesc);

  const heroRef = useRef<HTMLElement>(null);
  const {scrollYProgress} = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imageParallax = useTransform(scrollYProgress, [0, 1], [0, 36]);

  // Deterministic "Plant of the Day" by day-of-year
  const plantOfTheDay = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return PLANTS[dayOfYear % PLANTS.length];
  }, []);

  const featuredPlants = useMemo(() => PLANTS.slice(0, 4), []);

  const [factIndex, setFactIndex] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [email, setEmail] = useState(() => getStorage<string>('greennest_newsletter_email', ''));
  const [subscribed, setSubscribed] = useState(() => Boolean(getStorage<string>('greennest_newsletter_email', '')));
  const [emailError, setEmailError] = useState('');

  const words = useMemo(() => t.home.heroHeadline.split(' '), [t.home.heroHeadline]);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError(t.home.newsletterInvalid);
      return;
    }
    setEmailError('');
    setStorage('greennest_newsletter_email', trimmed);
    setSubscribed(true);
    showToast(t.home.newsletterSuccess);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Ambient glowing botanical blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-emerald-400/15 blur-3xl dark:bg-emerald-600/15" />
      <div aria-hidden="true" className="pointer-events-none absolute top-40 right-0 h-80 w-80 rounded-full bg-lime-300/20 blur-3xl dark:bg-teal-700/15" />

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pb-24">
        {/* Subtle floating SVG botanical silhouettes */}
        <motion.svg
          aria-hidden="true"
          animate={{y: [0, -14, 0], rotate: [0, 4, 0]}}
          transition={{duration: 7, repeat: Infinity, ease: 'easeInOut'}}
          viewBox="0 0 64 64"
          className="pointer-events-none absolute right-10 top-6 hidden h-12 w-12 text-emerald-600/20 lg:block dark:text-emerald-400/20"
        >
          <path fill="currentColor" d="M52 12C28 12 12 28 12 52c24 0 40-16 40-40z" />
        </motion.svg>
        <motion.svg
          aria-hidden="true"
          animate={{y: [0, 12, 0], rotate: [0, -5, 0]}}
          transition={{duration: 8.5, repeat: Infinity, ease: 'easeInOut'}}
          viewBox="0 0 64 64"
          className="pointer-events-none absolute left-4 bottom-12 hidden h-10 w-10 text-lime-600/20 lg:block dark:text-lime-400/20"
        >
          <path fill="currentColor" d="M12 12c0 24 16 40 40 40 0-24-16-40-40-40z" />
        </motion.svg>

        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center lg:col-span-6">
            <h1 className="font-display text-balance text-4xl font-bold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem] dark:text-white">
              {words.map((word, idx) => (
                <motion.span
                  key={`${word}-${idx}`}
                  initial={{opacity: 0, y: 12}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.35, delay: idx * 0.045}}
                  className="mr-2.5 inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
              {t.home.heroSubheadline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/encyclopedia"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-emerald-600"
              >
                {t.home.heroPrimaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/finder"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-2xl border border-slate-300/80 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-800 backdrop-blur-md transition hover:border-emerald-400 hover:bg-emerald-50/70 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-emerald-700"
              >
                {t.home.heroSecondaryCta}
              </Link>
            </div>
          </div>

          <motion.div style={{y: imageParallax}} className="lg:col-span-6">
            <div className="h-full overflow-hidden rounded-3xl border border-emerald-950/10 bg-white/60 p-2 shadow-xl backdrop-blur-sm dark:border-emerald-200/10 dark:bg-slate-900/60">
              <PlantImage
                src={IMAGES.heroJungle}
                alt={t.brand.name}
                aspectClass="aspect-[16/10] lg:h-full"
                className="rounded-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Full-width 4-column Stats Strip below split */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            {value: 24, suffix: '+', label: t.home.statSpecies},
            {value: 30, suffix: '', label: t.home.statLessons},
            {value: 3, suffix: '', label: t.home.statLanguages},
            {value: 100, suffix: '%', label: t.home.statOffline},
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200/80 bg-white/75 px-5 py-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65"
            >
              <p className="font-display text-2xl font-bold text-emerald-700 sm:text-3xl dark:text-emerald-400">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-xs font-medium text-slate-600 sm:text-sm dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. PLANT OF THE DAY */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.15}}
          transition={{duration: 0.4}}
          className="grid grid-cols-1 items-stretch gap-8 overflow-hidden rounded-3xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50/80 via-white to-lime-50/70 p-6 backdrop-blur-md lg:grid-cols-12 lg:p-8 dark:border-emerald-900/50 dark:from-emerald-950/50 dark:via-slate-900/90 dark:to-teal-950/40"
        >
          <div className="lg:col-span-5">
            <PlantImage
              src={getPlantImage(plantOfTheDay.slug, plantOfTheDay.imageKey)}
              alt={pick(plantOfTheDay.name)}
              aspectClass="aspect-[4/3] lg:h-full"
              className="rounded-2xl"
            />
          </div>
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-xs font-semibold tracking-wide text-emerald-700 dark:text-emerald-400">
              {t.home.plantOfTheDay} · {plantOfTheDay.latinName}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white">
              {pick(plantOfTheDay.name)}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {pick(plantOfTheDay.description)}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <span>{t.encyclopedia.difficulty}: {t.common[plantOfTheDay.difficulty]}</span>
              <span aria-hidden="true">·</span>
              <span>{t.encyclopedia.light}: {t.common[plantOfTheDay.light]}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">
                {t.encyclopedia.waterEvery} {plantOfTheDay.waterFrequencyDays} {t.common.days}
              </span>
              <span aria-hidden="true">·</span>
              <span>{plantOfTheDay.petSafe ? t.common.petSafe : t.common.petToxic}</span>
            </div>
            <div className="mt-7">
              <Link
                to={`/encyclopedia?plant=${plantOfTheDay.slug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                {t.home.exploreSpecies}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. FEATURED BENTO GRID */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
              {t.home.featuredTitle}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              {t.home.featuredSubtitle}
            </p>
          </div>
          <Link
            to="/encyclopedia"
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400"
          >
            {t.home.viewAllPlants}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredPlants.map((plant, idx) => (
            <motion.div
              key={plant.id}
              initial={{opacity: 0, y: 16}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.1}}
              transition={{duration: 0.3, delay: idx * 0.06}}
              whileHover={{y: -4}}
              className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-md transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/75"
            >
              <Link to={`/encyclopedia?plant=${plant.slug}`} className="block">
                <PlantImage
                  src={getPlantImage(plant.slug, plant.imageKey)}
                  alt={pick(plant.name)}
                  zoomOnHover
                />
                <div className="p-5">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {plant.latinName} · {t.common[plant.difficulty]}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-slate-900 dark:text-white">
                    {pick(plant.name)}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
                    {pick(plant.description)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. QUICK PATHS */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
          {t.home.quickPathsTitle}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {to: '/finder', icon: Compass, title: t.home.quickFinderTitle, desc: t.home.quickFinderDesc},
            {to: '/academy', icon: GraduationCap, title: t.home.quickAcademyTitle, desc: t.home.quickAcademyDesc},
            {to: '/doctor', icon: Stethoscope, title: t.home.quickDoctorTitle, desc: t.home.quickDoctorDesc},
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-md transition hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/75 dark:hover:border-emerald-800"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.desc}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 group-hover:translate-x-1 transition-transform dark:text-emerald-400">
                  {t.common.viewDetails}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. DID YOU KNOW + TESTIMONIALS + NEWSLETTER */}
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Did you know rotating card */}
          <div className="flex flex-col justify-between rounded-3xl border border-emerald-200/80 bg-emerald-50/70 p-6 backdrop-blur-md lg:col-span-5 dark:border-emerald-900/50 dark:bg-emerald-950/35">
            <div>
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                {t.home.didYouKnow}
              </p>
              <p className="mt-4 font-display text-xl leading-relaxed text-slate-900 dark:text-slate-100">
                “{pick(FUN_FACTS[factIndex])}”
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFactIndex((prev) => (prev + 1) % FUN_FACTS.length)}
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl border border-emerald-300 bg-white px-4 py-2 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-800 dark:bg-slate-900 dark:text-emerald-300"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              {t.home.nextFact}
            </button>
          </div>

          {/* Testimonials carousel */}
          <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-md lg:col-span-7 dark:border-slate-800 dark:bg-slate-900/75">
            <div>
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {t.home.testimonialsTitle}
                </h2>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label={t.common.back}
                    onClick={() =>
                      setTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={t.common.next}
                    onClick={() => setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="mt-4 text-base leading-relaxed text-slate-800 dark:text-slate-200">
                “{pick(TESTIMONIALS[testimonialIdx].quote)}”
              </p>
            </div>
            <div className="mt-6 border-t border-slate-200/70 pt-4 text-sm dark:border-slate-800">
              <p className="font-semibold text-slate-900 dark:text-white">
                {TESTIMONIALS[testimonialIdx].name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {pick(TESTIMONIALS[testimonialIdx].role)}
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Box */}
        <div className="mt-6 rounded-3xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-md sm:p-8 dark:border-slate-800 dark:bg-slate-900/75">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-lg">
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                {t.home.newsletterTitle}
              </h2>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
                {t.home.newsletterDesc}
              </p>
            </div>
            <form onSubmit={handleNewsletter} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.home.newsletterPlaceholder}
                aria-label={t.home.newsletterPlaceholder}
                className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                {subscribed ? <Check className="h-4 w-4" /> : null}
                {t.home.newsletterButton}
              </button>
            </form>
          </div>
          {emailError && <p className="mt-2 text-xs text-rose-600 dark:text-rose-400">{emailError}</p>}
        </div>
      </section>
    </div>
  );
};
