import React, {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {Heart} from 'lucide-react';
import {useI18n} from '../i18n/I18nContext';
import {useDocumentTitle} from '../hooks/useDocumentTitle';
import {PLANTS, type Plant} from '../data/plants';
import {getPlantImage} from '../data/images';
import {PlantImage} from '../components/PlantImage';
import {getStorage, setStorage} from '../utils/storage';
import {useToast} from '../components/ToastProvider';

const FAV_KEY = 'greennest_favorites';
const RECENT_KEY = 'greennest_recent_plants';

export const FavoritesPage: React.FC = () => {
  const {t, pick} = useI18n();
  const {showToast} = useToast();
  useDocumentTitle(t.seo.favoritesTitle);

  const [favIds, setFavIds] = useState<string[]>(() => getStorage<string[]>(FAV_KEY, []));
  const recentIds = useMemo(() => getStorage<string[]>(RECENT_KEY, []), []);

  const favPlants = useMemo(
    () => favIds.map((id) => PLANTS.find((p) => p.id === id)).filter((p): p is Plant => Boolean(p)),
    [favIds],
  );

  const recentPlants = useMemo(
    () => recentIds.map((id) => PLANTS.find((p) => p.id === id)).filter((p): p is Plant => Boolean(p)),
    [recentIds],
  );

  const removeFavorite = (id: string) => {
    const next = favIds.filter((fid) => fid !== id);
    setFavIds(next);
    setStorage(FAV_KEY, next);
    showToast(t.common.removeFromFavorites, 'info');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          {t.favorites.title}
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          {t.favorites.subtitle}
        </p>
      </div>

      {favPlants.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-slate-200/80 bg-white/80 p-12 text-center dark:border-slate-800 dark:bg-slate-900/75">
          <Heart className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-600" />
          <h2 className="mt-4 font-display text-2xl font-bold text-slate-900 dark:text-white">
            {t.favorites.emptyTitle}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">
            {t.favorites.emptyDesc}
          </p>
          <Link
            to="/encyclopedia"
            className="mt-6 inline-flex rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            {t.favorites.browseEncyclopedia}
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favPlants.map((plant) => (
            <div
              key={plant.id}
              className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 dark:border-slate-800 dark:bg-slate-900/80"
            >
              <Link to={`/encyclopedia?plant=${plant.slug}`}>
                <PlantImage src={getPlantImage(plant.slug, plant.imageKey)} alt={pick(plant.name)} zoomOnHover />
              </Link>
              <div className="flex items-center justify-between gap-3 p-5">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{plant.latinName}</p>
                  <Link to={`/encyclopedia?plant=${plant.slug}`}>
                    <h2 className="font-display text-xl font-bold text-slate-900 hover:text-emerald-700 dark:text-white">
                      {pick(plant.name)}
                    </h2>
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={() => removeFavorite(plant.id)}
                  aria-label={t.common.removeFromFavorites}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400"
                >
                  <Heart className="h-4 w-4 fill-current" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {recentPlants.length > 0 && (
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            {t.favorites.recentTitle}
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {recentPlants.map((plant) => (
              <Link
                key={plant.id}
                to={`/encyclopedia?plant=${plant.slug}`}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-2 transition hover:border-emerald-400 dark:border-slate-800 dark:bg-slate-900/75"
              >
                <PlantImage
                  src={getPlantImage(plant.slug, plant.imageKey)}
                  alt={pick(plant.name)}
                  className="rounded-xl"
                />
                <p className="mt-2 truncate px-1 text-xs font-semibold text-slate-900 dark:text-white">
                  {pick(plant.name)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
