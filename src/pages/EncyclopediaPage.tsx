import React, {useEffect, useMemo, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {AnimatePresence, motion} from 'framer-motion';
import {
  ArrowLeftRight,
  Droplets,
  Heart,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Thermometer,
  Wind,
  X,
} from 'lucide-react';
import {useI18n} from '../i18n/I18nContext';
import {useDocumentTitle} from '../hooks/useDocumentTitle';
import {PLANTS, type Difficulty, type LightLevel, type Plant} from '../data/plants';
import {getPlantImage} from '../data/images';
import {PlantImage} from '../components/PlantImage';
import {getStorage, setStorage} from '../utils/storage';
import {useToast} from '../components/ToastProvider';

const FAV_KEY = 'greennest_favorites';
const RECENT_KEY = 'greennest_recent_plants';

export const EncyclopediaPage: React.FC = () => {
  const {lang, t, pick} = useI18n();
  const {showToast} = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  useDocumentTitle(t.seo.encyclopediaTitle);

  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');
  const [light, setLight] = useState<LightLevel | 'all'>('all');
  const [petSafeOnly, setPetSafeOnly] = useState(false);
  const [lowMaintOnly, setLowMaintOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'difficulty' | 'water' | 'air'>('name');

  const [favorites, setFavorites] = useState<string[]>(() => getStorage<string[]>(FAV_KEY, []));
  const [recentIds, setRecentIds] = useState<string[]>(() => getStorage<string[]>(RECENT_KEY, []));
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // Sync URL ?plant=slug
  useEffect(() => {
    const slug = searchParams.get('plant');
    if (slug) {
      const found = PLANTS.find((p) => p.slug === slug);
      if (found) {
        setSelectedPlant(found);
        setRecentIds((prev) => {
          const next = [found.id, ...prev.filter((id) => id !== found.id)].slice(0, 6);
          setStorage(RECENT_KEY, next);
          return next;
        });
      }
    }
  }, [searchParams]);

  const openPlant = (plant: Plant) => {
    setSelectedPlant(plant);
    setSearchParams({plant: plant.slug});
    setRecentIds((prev) => {
      const next = [plant.id, ...prev.filter((id) => id !== plant.id)].slice(0, 6);
      setStorage(RECENT_KEY, next);
      return next;
    });
  };

  const closePlant = () => {
    setSelectedPlant(null);
    setSearchParams({});
  };

  const toggleFavorite = (plantId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(plantId);
      const next = exists ? prev.filter((id) => id !== plantId) : [...prev, plantId];
      setStorage(FAV_KEY, next);
      showToast(exists ? t.common.removeFromFavorites : t.common.addToFavorites, 'info');
      return next;
    });
  };

  const toggleCompare = (plantId: string) => {
    setCompareIds((prev) => {
      if (prev.includes(plantId)) return prev.filter((id) => id !== plantId);
      if (prev.length >= 2) return [prev[1], plantId];
      return [...prev, plantId];
    });
  };

  const filteredPlants = useMemo(() => {
    const q = query.trim().toLowerCase();
    const diffOrder: Record<Difficulty, number> = {easy: 1, moderate: 2, expert: 3};

    return PLANTS.filter((p) => {
      if (difficulty !== 'all' && p.difficulty !== difficulty) return false;
      if (light !== 'all' && p.light !== light) return false;
      if (petSafeOnly && !p.petSafe) return false;
      if (lowMaintOnly && !p.lowMaintenance) return false;
      if (q) {
        const matches =
          pick(p.name).toLowerCase().includes(q) ||
          p.latinName.toLowerCase().includes(q) ||
          pick(p.description).toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'name') return pick(a.name).localeCompare(pick(b.name));
      if (sortBy === 'difficulty') return diffOrder[a.difficulty] - diffOrder[b.difficulty];
      if (sortBy === 'water') return a.waterFrequencyDays - b.waterFrequencyDays;
      return b.airPurifying - a.airPurifying;
    });
  }, [query, difficulty, light, petSafeOnly, lowMaintOnly, sortBy, pick]);

  const recentPlants = useMemo(
    () => recentIds.map((id) => PLANTS.find((p) => p.id === id)).filter((p): p is Plant => Boolean(p)),
    [recentIds],
  );

  const comparePair = useMemo(
    () => compareIds.map((id) => PLANTS.find((p) => p.id === id)).filter((p): p is Plant => Boolean(p)),
    [compareIds],
  );

  const resetAllFilters = () => {
    setQuery('');
    setDifficulty('all');
    setLight('all');
    setPetSafeOnly(false);
    setLowMaintOnly(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          {t.encyclopedia.title}
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          {t.encyclopedia.subtitle}
        </p>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="mt-8 space-y-4 rounded-3xl border border-slate-200/80 bg-white/80 p-5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/75">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="relative md:col-span-5">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.common.searchPlaceholder}
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div className="md:col-span-2">
            <select
              aria-label={t.encyclopedia.filterDifficulty}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty | 'all')}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="all">{t.encyclopedia.filterDifficulty}: {t.common.all}</option>
              <option value="easy">{t.common.easy}</option>
              <option value="moderate">{t.common.moderate}</option>
              <option value="expert">{t.common.expert}</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              aria-label={t.encyclopedia.filterLight}
              value={light}
              onChange={(e) => setLight(e.target.value as LightLevel | 'all')}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="all">{t.encyclopedia.filterLight}: {t.common.all}</option>
              <option value="low">{t.common.low}</option>
              <option value="medium">{t.common.medium}</option>
              <option value="bright">{t.common.bright}</option>
              <option value="direct">{t.common.direct}</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              aria-label={t.encyclopedia.sortBy}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'difficulty' | 'water' | 'air')}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="name">{t.encyclopedia.sortName}</option>
              <option value="difficulty">{t.encyclopedia.sortDifficulty}</option>
              <option value="water">{t.encyclopedia.sortWater}</option>
              <option value="air">{t.encyclopedia.sortAir}</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setPetSafeOnly((prev) => !prev)}
              className={`rounded-xl border px-3.5 py-1.5 text-xs font-semibold transition ${
                petSafeOnly
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {t.encyclopedia.filterPetSafe}
            </button>
            <button
              type="button"
              onClick={() => setLowMaintOnly((prev) => !prev)}
              className={`rounded-xl border px-3.5 py-1.5 text-xs font-semibold transition ${
                lowMaintOnly
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {t.encyclopedia.filterLowMaint}
            </button>
          </div>

          <p className="tabular-nums text-xs font-medium text-slate-500 dark:text-slate-400">
            {filteredPlants.length} {t.encyclopedia.plantsCount}
          </p>
        </div>
      </div>

      {/* Compare sticky bar when >= 1 selected */}
      {comparePair.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-300 bg-emerald-50/90 px-5 py-3 dark:border-emerald-800 dark:bg-emerald-950/60">
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-emerald-950 dark:text-emerald-100">
            <ArrowLeftRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t.encyclopedia.compareSelected}:</span>
            {comparePair.map((p) => (
              <span key={p.id} className="font-semibold underline decoration-emerald-400">
                {pick(p.name)}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={comparePair.length < 2}
              onClick={() => setCompareModalOpen(true)}
              className="rounded-xl bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-45"
            >
              {t.encyclopedia.compareTitle} ({comparePair.length}/2)
            </button>
            <button
              type="button"
              onClick={() => setCompareIds([])}
              className="rounded-xl border border-emerald-300 px-3 py-1.5 text-xs font-medium text-emerald-900 hover:bg-white dark:border-emerald-700 dark:text-emerald-200 dark:hover:bg-slate-900"
            >
              {t.encyclopedia.clearCompare}
            </button>
          </div>
        </div>
      )}

      {/* Recently Viewed Strip */}
      {recentPlants.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {t.encyclopedia.recentlyViewed}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {recentPlants.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => openPlant(p)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-emerald-400 hover:text-emerald-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              >
                {pick(p.name)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      {filteredPlants.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white/70 p-12 text-center dark:border-slate-800 dark:bg-slate-900/60">
          <p className="text-base font-medium text-slate-700 dark:text-slate-300">{t.common.noResults}</p>
          <button
            type="button"
            onClick={resetAllFilters}
            className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            {t.common.resetFilters}
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlants.map((plant) => {
            const isFav = favorites.includes(plant.id);
            const isCompared = compareIds.includes(plant.id);
            return (
              <motion.article
                key={plant.id}
                layout
                initial={{opacity: 0, y: 12}}
                animate={{opacity: 1, y: 0}}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 backdrop-blur-md transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80"
              >
                <button type="button" onClick={() => openPlant(plant)} className="text-left">
                  <PlantImage
                    src={getPlantImage(plant.slug, plant.imageKey)}
                    alt={pick(plant.name)}
                    zoomOnHover
                  />
                </button>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {plant.latinName} · {t.common[plant.difficulty]} · {t.common[plant.light]}
                    </p>
                    <button type="button" onClick={() => openPlant(plant)} className="mt-1 text-left">
                      <h2 className="font-display text-xl font-bold text-slate-900 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                        {pick(plant.name)}
                      </h2>
                    </button>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
                      {pick(plant.description)}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-200/70 pt-3.5 dark:border-slate-800">
                    <span className="tabular-nums text-xs font-medium text-slate-500 dark:text-slate-400">
                      {t.encyclopedia.waterEvery} {plant.waterFrequencyDays} {t.common.days}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => toggleCompare(plant.id)}
                        className={`rounded-xl px-2.5 py-1.5 text-xs font-medium transition ${
                          isCompared
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {t.encyclopedia.selectToCompare}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(plant.id)}
                        aria-label={isFav ? t.common.removeFromFavorites : t.common.addToFavorites}
                        className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
                          isFav
                            ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                            : 'bg-slate-100 text-slate-500 hover:text-rose-500 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPlant && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={closePlant}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={pick(selectedPlant.name)}
          >
            <motion.div
              initial={{opacity: 0, scale: 0.96, y: 12}}
              animate={{opacity: 1, scale: 1, y: 0}}
              exit={{opacity: 0, scale: 0.96, y: 12}}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    {selectedPlant.latinName}
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                    {pick(selectedPlant.name)}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closePlant}
                  aria-label={t.common.close}
                  className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-12">
                <div className="md:col-span-5">
                  <PlantImage
                    src={getPlantImage(selectedPlant.slug, selectedPlant.imageKey)}
                    alt={pick(selectedPlant.name)}
                    className="rounded-2xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 md:col-span-7">
                  <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/70">
                    <Sun className="h-4 w-4 text-amber-500" />
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t.encyclopedia.light}</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.common[selectedPlant.light]}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/70">
                    <Droplets className="h-4 w-4 text-sky-500" />
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t.encyclopedia.waterEvery}</p>
                    <p className="tabular-nums text-sm font-semibold text-slate-900 dark:text-white">
                      {selectedPlant.waterFrequencyDays} {t.common.days}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/70">
                    <Wind className="h-4 w-4 text-teal-500" />
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t.encyclopedia.humidity}</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.common[selectedPlant.humidity]}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/70">
                    <Thermometer className="h-4 w-4 text-rose-500" />
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t.encyclopedia.temperature}</p>
                    <p className="tabular-nums text-sm font-semibold text-slate-900 dark:text-white">{selectedPlant.temperature}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/70">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t.encyclopedia.petSafety}</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {selectedPlant.petSafe ? t.common.petSafe : t.common.petToxic}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/70">
                    <Sparkles className="h-4 w-4 text-lime-600" />
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t.encyclopedia.airPurifying}</p>
                    <p className="tabular-nums text-sm font-semibold text-slate-900 dark:text-white">
                      {selectedPlant.airPurifying} / 5
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {pick(selectedPlant.description)}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                    {t.encyclopedia.careGuide}
                  </h3>
                  <ol className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    {selectedPlant.careGuide[lang].map((step, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span className="tabular-nums font-semibold text-emerald-600 dark:text-emerald-400">
                          {i + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                    {t.encyclopedia.commonProblems}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    {selectedPlant.commonProblems[lang].map((prob, i) => (
                      <li key={i} className="flex gap-2">
                        <span aria-hidden="true" className="text-amber-600">•</span>
                        <span>{prob}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/35">
                <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  {t.encyclopedia.funFact}
                </p>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                  {pick(selectedPlant.funFact)}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare 2 Plants Modal */}
      <AnimatePresence>
        {compareModalOpen && comparePair.length === 2 && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={() => setCompareModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{opacity: 0, scale: 0.96}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.96}}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                  {t.encyclopedia.comparing}
                </h2>
                <button
                  type="button"
                  onClick={() => setCompareModalOpen(false)}
                  aria-label={t.common.close}
                  className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="py-3 pr-4 font-medium text-slate-500" />
                      {comparePair.map((p) => (
                        <th key={p.id} className="px-4 py-3 font-display text-lg font-bold text-slate-900 dark:text-white">
                          {pick(p.name)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
                    <tr>
                      <td className="py-3 pr-4 font-medium text-slate-500">{t.encyclopedia.latinName}</td>
                      {comparePair.map((p) => <td key={p.id} className="px-4 py-3 italic text-slate-700 dark:text-slate-300">{p.latinName}</td>)}
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-slate-500">{t.encyclopedia.difficulty}</td>
                      {comparePair.map((p) => <td key={p.id} className="px-4 py-3 text-slate-900 dark:text-slate-100">{t.common[p.difficulty]}</td>)}
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-slate-500">{t.encyclopedia.light}</td>
                      {comparePair.map((p) => <td key={p.id} className="px-4 py-3 text-slate-900 dark:text-slate-100">{t.common[p.light]}</td>)}
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-slate-500">{t.encyclopedia.waterEvery}</td>
                      {comparePair.map((p) => <td key={p.id} className="tabular-nums px-4 py-3 text-slate-900 dark:text-slate-100">{p.waterFrequencyDays} {t.common.days}</td>)}
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-slate-500">{t.encyclopedia.humidity}</td>
                      {comparePair.map((p) => <td key={p.id} className="px-4 py-3 text-slate-900 dark:text-slate-100">{t.common[p.humidity]}</td>)}
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-slate-500">{t.encyclopedia.petSafety}</td>
                      {comparePair.map((p) => <td key={p.id} className="px-4 py-3 text-slate-900 dark:text-slate-100">{p.petSafe ? t.common.petSafe : t.common.petToxic}</td>)}
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-slate-500">{t.encyclopedia.airPurifying}</td>
                      {comparePair.map((p) => <td key={p.id} className="tabular-nums px-4 py-3 text-slate-900 dark:text-slate-100">{p.airPurifying}/5</td>)}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
