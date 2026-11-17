import React, {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {
  Bell,
  BookOpen,
  Calendar,
  Check,
  Droplets,
  Layers,
  Plus,
  Sun,
  Trash2,
} from 'lucide-react';
import {useI18n} from '../i18n/I18nContext';
import {useDocumentTitle} from '../hooks/useDocumentTitle';
import {PLANTS} from '../data/plants';
import {getStorage, setStorage} from '../utils/storage';
import {useToast} from '../components/ToastProvider';

type ToolTab = 'watering' | 'light' | 'soil' | 'journal';

interface ScheduledPlant {
  id: string;
  name: string;
  intervalDays: number;
  lastWatered: string; // YYYY-MM-DD
}

interface JournalEntry {
  id: string;
  date: string;
  plantName: string;
  heightCm: string;
  health: 'healthy' | 'recovering' | 'needsAttention';
  notes: string;
}

const SCHEDULE_KEY = 'greennest_watering_schedule';
const JOURNAL_KEY = 'greennest_plant_journal';

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDaysIso(isoDate: string, days: number): string {
  const dt = new Date(`${isoDate}T00:00:00`);
  dt.setDate(dt.getDate() + days);
  return dt.toISOString().slice(0, 10);
}

function diffDaysFromToday(targetIso: string): number {
  const now = new Date(`${todayIso()}T00:00:00`);
  const tgt = new Date(`${targetIso}T00:00:00`);
  return Math.round((tgt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export const CareToolsPage: React.FC = () => {
  const {t, pick} = useI18n();
  const {showToast} = useToast();
  useDocumentTitle(t.seo.toolsTitle);

  const [tab, setTab] = useState<ToolTab>('watering');

  // ── 1. Watering Schedule Planner ──
  const [schedule, setSchedule] = useState<ScheduledPlant[]>(() =>
    getStorage<ScheduledPlant[]>(SCHEDULE_KEY, []),
  );
  const [plantName, setPlantName] = useState('');
  const [intervalDays, setIntervalDays] = useState(7);
  const [lastWatered, setLastWatered] = useState(todayIso());
  const [notifStatus, setNotifStatus] = useState<string>(() =>
    typeof Notification !== 'undefined' ? Notification.permission : 'default',
  );

  const saveSchedule = (next: ScheduledPlant[]) => {
    setSchedule(next);
    setStorage(SCHEDULE_KEY, next);
  };

  const handleAddScheduledPlant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plantName.trim()) return;
    const next: ScheduledPlant = {
      id: `${Date.now()}`,
      name: plantName.trim(),
      intervalDays: Math.max(1, Math.min(60, Number(intervalDays) || 7)),
      lastWatered: lastWatered || todayIso(),
    };
    saveSchedule([next, ...schedule]);
    setPlantName('');
    showToast(t.common.save);
  };

  const markWateredToday = (id: string) => {
    const next = schedule.map((p) => (p.id === id ? {...p, lastWatered: todayIso()} : p));
    saveSchedule(next);
    showToast(t.tools.markWatered);
  };

  const removeScheduled = (id: string) => {
    saveSchedule(schedule.filter((p) => p.id !== id));
  };

  const requestNotifications = async () => {
    if (typeof Notification === 'undefined') return;
    const perm = await Notification.requestPermission();
    setNotifStatus(perm);
    if (perm === 'granted') {
      new Notification('GreenNest', {body: t.tools.notificationsEnabled});
    }
  };

  const upcoming14Days = useMemo(() => {
    const days: Array<{date: string; plants: ScheduledPlant[]}> = [];
    const base = todayIso();
    for (let i = 0; i < 14; i++) {
      const date = addDaysIso(base, i);
      const due = schedule.filter((p) => addDaysIso(p.lastWatered, p.intervalDays) === date);
      days.push({date, plants: due});
    }
    return days;
  }, [schedule]);

  // ── 2. Light Calculator ──
  const [windowDir, setWindowDir] = useState<'north' | 'south' | 'east' | 'west'>('east');
  const [distanceM, setDistanceM] = useState(1.2);
  const [hasCurtain, setHasCurtain] = useState(false);

  const computedLight = useMemo<'low' | 'medium' | 'bright' | 'direct'>(() => {
    let score = windowDir === 'south' ? 95 : windowDir === 'west' ? 82 : windowDir === 'east' ? 75 : 48;
    score -= distanceM * 18;
    if (hasCurtain) score -= 22;

    if (score >= 78) return 'direct';
    if (score >= 52) return 'bright';
    if (score >= 30) return 'medium';
    return 'low';
  }, [windowDir, distanceM, hasCurtain]);

  const lightMatchingPlants = useMemo(
    () => PLANTS.filter((p) => p.light === computedLight).slice(0, 6),
    [computedLight],
  );

  // ── 3. Pot Size & Soil Mix Helper ──
  const [currentPotCm, setCurrentPotCm] = useState(14);
  const [plantFamily, setPlantFamily] = useState<'aroid' | 'succulent' | 'orchid' | 'fern'>('aroid');

  const recommendedPotCm = currentPotCm + (currentPotCm >= 20 ? 4 : 3);
  const familyLabels: Record<'aroid' | 'succulent' | 'orchid' | 'fern', {en: string; ru: string; uz: string}> = {
    aroid: {en: 'Tropical Aroids', ru: 'Тропические ароидные', uz: 'Tropik aroidlar'},
    succulent: {en: 'Cacti & Succulents', ru: 'Кактусы и суккуленты', uz: 'Kaktus va sukkulentlar'},
    orchid: {en: 'Epiphytic Orchids', ru: 'Эпифитные орхидеи', uz: 'Epifit orxideyalar'},
    fern: {en: 'Ferns & Calatheas', ru: 'Папоротники и калатеи', uz: 'Qirqquloq va kalateyalar'},
  };

  const soilRecipe = useMemo(() => {
    switch (plantFamily) {
      case 'aroid':
        return [
          {
            part: '40%',
            label: {
              en: 'Coco coir / Indoor potting mix',
              ru: 'Кокосовый субстрат / универсальный грунт',
              uz: 'Kokos tolasi / xona o‘simliklari tuprog‘i',
            },
          },
          {
            part: '30%',
            label: {
              en: 'Medium pine orchid bark',
              ru: 'Средняя сосновая кора',
              uz: 'O‘rtacha kattalikdagi qarag‘ay po‘stlog‘i',
            },
          },
          {
            part: '20%',
            label: {
              en: 'Coarse perlite or pumice',
              ru: 'Крупный перлит или пемза',
              uz: 'Yirik perlit yoki pemza',
            },
          },
          {
            part: '10%',
            label: {
              en: 'Worm castings + charcoal',
              ru: 'Биогумус + древесный уголь',
              uz: 'Biogumus + yog‘och ko‘miri',
            },
          },
        ];
      case 'succulent':
        return [
          {
            part: '45%',
            label: {
              en: 'Coarse pumice or lava grit',
              ru: 'Крупная пемза или лавовая крошка',
              uz: 'Yirik pemza yoki lava toshchasi',
            },
          },
          {
            part: '35%',
            label: {
              en: 'Indoor potting soil',
              ru: 'Лёгкий грунт для комнатных растений',
              uz: 'Yengil xona o‘simliklari tuprog‘i',
            },
          },
          {
            part: '20%',
            label: {
              en: 'Coarse horticultural sand / perlite',
              ru: 'Крупный речной песок / перлит',
              uz: 'Yirik daryo qumi / perlit',
            },
          },
        ];
      case 'orchid':
        return [
          {
            part: '75%',
            label: {
              en: 'Medium fir / pine bark chunks',
              ru: 'Кусочки пихтовой / сосновой коры',
              uz: 'Qarag‘ay po‘stlog‘i bo‘laklari',
            },
          },
          {
            part: '15%',
            label: {
              en: 'Sphagnum moss',
              ru: 'Мох сфагнум',
              uz: 'Sfagnum moxi',
            },
          },
          {
            part: '10%',
            label: {
              en: 'Horticultural charcoal',
              ru: 'Древесный уголь',
              uz: 'Bog‘dorchilik ko‘miri',
            },
          },
        ];
      case 'fern':
        return [
          {
            part: '60%',
            label: {
              en: 'Moisture-retentive coco peat mix',
              ru: 'Влагоёмкая смесь на кокосовом торфе',
              uz: 'Namlik saqlovchi kokos torfi aralashmasi',
            },
          },
          {
            part: '25%',
            label: {
              en: 'Compost / leaf mold',
              ru: 'Листовой перегной / компост',
              uz: 'Barg chirindisi / kompost',
            },
          },
          {
            part: '15%',
            label: {
              en: 'Fine perlite',
              ru: 'Мелкий перлит',
              uz: 'Mayda perlit',
            },
          },
        ];
    }
  }, [plantFamily]);

  // ── 4. Plant Journal ──
  const [journal, setJournal] = useState<JournalEntry[]>(() =>
    getStorage<JournalEntry[]>(JOURNAL_KEY, []),
  );
  const [jPlant, setJPlant] = useState('');
  const [jDate, setJDate] = useState(todayIso());
  const [jHeight, setJHeight] = useState('');
  const [jHealth, setJHealth] = useState<JournalEntry['health']>('healthy');
  const [jNotes, setJNotes] = useState('');

  const addJournalEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jPlant.trim() || !jNotes.trim()) return;
    const next: JournalEntry = {
      id: `${Date.now()}`,
      date: jDate || todayIso(),
      plantName: jPlant.trim(),
      heightCm: jHeight.trim(),
      health: jHealth,
      notes: jNotes.trim(),
    };
    const updated = [next, ...journal];
    setJournal(updated);
    setStorage(JOURNAL_KEY, updated);
    setJNotes('');
    setJHeight('');
    showToast(t.common.save);
  };

  const deleteJournal = (id: string) => {
    const updated = journal.filter((item) => item.id !== id);
    setJournal(updated);
    setStorage(JOURNAL_KEY, updated);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          {t.tools.title}
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          {t.tools.subtitle}
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-8 inline-flex flex-wrap gap-1.5 rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-900">
        {[
          {id: 'watering' as const, label: t.tools.tabWatering, icon: Droplets},
          {id: 'light' as const, label: t.tools.tabLight, icon: Sun},
          {id: 'soil' as const, label: t.tools.tabSoil, icon: Layers},
          {id: 'journal' as const, label: t.tools.tabJournal, icon: BookOpen},
        ].map((item) => {
          const Icon = item.icon;
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition ${
                active
                  ? 'bg-white text-emerald-800 shadow-xs dark:bg-slate-800 dark:text-emerald-300'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* TOOL 1: WATERING PLANNER */}
      {tab === 'watering' && (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <form
              onSubmit={handleAddScheduledPlant}
              className="space-y-4 rounded-3xl border border-slate-200/80 bg-white/85 p-6 dark:border-slate-800 dark:bg-slate-900/80"
            >
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                {t.tools.addPlantTitle}
              </h2>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                  {t.tools.plantNameLabel}
                </label>
                <input
                  type="text"
                  list="plant-suggestions"
                  value={plantName}
                  onChange={(e) => {
                    setPlantName(e.target.value);
                    const match = PLANTS.find((p) => pick(p.name) === e.target.value);
                    if (match) setIntervalDays(match.waterFrequencyDays);
                  }}
                  required
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
                <datalist id="plant-suggestions">
                  {PLANTS.map((p) => (
                    <option key={p.id} value={pick(p.name)} />
                  ))}
                </datalist>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                    {t.tools.intervalDaysLabel}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={intervalDays}
                    onChange={(e) => setIntervalDays(Number(e.target.value))}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                    {t.tools.lastWateredLabel}
                  </label>
                  <input
                    type="date"
                    value={lastWatered}
                    onChange={(e) => setLastWatered(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                <Plus className="h-4 w-4" />
                {t.tools.addPlantBtn}
              </button>

              {typeof Notification !== 'undefined' && (
                <button
                  type="button"
                  onClick={requestNotifications}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <Bell className="h-3.5 w-3.5" />
                  {notifStatus === 'granted'
                    ? t.tools.notificationsEnabled
                    : notifStatus === 'denied'
                    ? t.tools.notificationsDenied
                    : t.tools.enableNotifications}
                </button>
              )}
            </form>
          </div>

          <div className="space-y-6 lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 dark:border-slate-800 dark:bg-slate-900/80">
              {schedule.length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                  {t.tools.noScheduledPlants}
                </p>
              ) : (
                <ul className="divide-y divide-slate-200/70 dark:divide-slate-800">
                  {schedule.map((item) => {
                    const nextDate = addDaysIso(item.lastWatered, item.intervalDays);
                    const delta = diffDaysFromToday(nextDate);
                    const statusLabel =
                      delta === 0
                        ? t.tools.dueToday
                        : delta < 0
                        ? t.tools.overdueBy.replace('{days}', String(Math.abs(delta)))
                        : t.tools.dueInDays.replace('{days}', String(delta));

                    return (
                      <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                          <p className={`tabular-nums text-xs font-medium ${delta <= 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`}>
                            {statusLabel} · {nextDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => markWateredToday(item.id)}
                            className="inline-flex items-center gap-1 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300"
                          >
                            <Check className="h-3.5 w-3.5" />
                            {t.tools.markWatered}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeScheduled(item.id)}
                            aria-label={t.tools.deletePlant}
                            className="rounded-xl p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* 14-day Calendar Grid */}
            <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 dark:border-slate-800 dark:bg-slate-900/80">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  {t.tools.calendarTitle}
                </h3>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-7">
                {upcoming14Days.map((day) => (
                  <div
                    key={day.date}
                    className={`rounded-2xl border p-2.5 text-xs ${
                      day.plants.length > 0
                        ? 'border-emerald-300 bg-emerald-50/70 dark:border-emerald-800 dark:bg-emerald-950/40'
                        : 'border-slate-200/70 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/50'
                    }`}
                  >
                    <p className="tabular-nums font-semibold text-slate-700 dark:text-slate-300">
                      {day.date.slice(5)}
                    </p>
                    <div className="mt-1.5 space-y-1">
                      {day.plants.map((p) => (
                        <p key={p.id} className="truncate font-medium text-emerald-800 dark:text-emerald-300">
                          • {p.name}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 2: LIGHT CALCULATOR */}
      {tab === 'light' && (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-5 rounded-3xl border border-slate-200/80 bg-white/85 p-6 lg:col-span-5 dark:border-slate-800 dark:bg-slate-900/80">
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                {t.tools.lightWindowDir}
              </label>
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                {(['north', 'east', 'south', 'west'] as const).map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => setWindowDir(dir)}
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                      windowDir === dir
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300'
                    }`}
                  >
                    {t.tools[dir]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-slate-900 dark:text-white">
                <label htmlFor="dist-slider">{t.tools.lightDistance}</label>
                <span className="tabular-nums text-emerald-700 dark:text-emerald-400">
                  {distanceM.toFixed(1)} m
                </span>
              </div>
              <input
                id="dist-slider"
                type="range"
                min={0.2}
                max={4.0}
                step={0.2}
                value={distanceM}
                onChange={(e) => setDistanceM(Number(e.target.value))}
                className="mt-2 w-full accent-emerald-600"
              />
            </div>

            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-3.5 text-sm font-medium text-slate-800 dark:border-slate-700 dark:text-slate-200">
              <input
                type="checkbox"
                checked={hasCurtain}
                onChange={(e) => setHasCurtain(e.target.checked)}
                className="h-4 w-4 accent-emerald-600"
              />
              {t.tools.lightCurtain}
            </label>
          </div>

          <div className="rounded-3xl border border-emerald-200/80 bg-white/85 p-6 lg:col-span-7 dark:border-emerald-900/50 dark:bg-slate-900/80">
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {t.tools.lightResultLevel}
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold text-slate-900 dark:text-white">
              {t.common[computedLight]}
            </h2>

            <h3 className="mt-6 text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t.tools.recommendedPlants}
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {lightMatchingPlants.map((p) => (
                <Link
                  key={p.id}
                  to={`/encyclopedia?plant=${p.slug}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 transition hover:border-emerald-400 dark:border-slate-800 dark:bg-slate-950/60"
                >
                  <p className="font-semibold text-slate-900 dark:text-white">{pick(p.name)}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{p.latinName}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TOOL 3: POT & SOIL HELPER */}
      {tab === 'soil' && (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-5 rounded-3xl border border-slate-200/80 bg-white/85 p-6 lg:col-span-5 dark:border-slate-800 dark:bg-slate-900/80">
            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-slate-900 dark:text-white">
                <label htmlFor="pot-slider">{t.tools.currentPotLabel}</label>
                <span className="tabular-nums text-emerald-700 dark:text-emerald-400">{currentPotCm} cm</span>
              </div>
              <input
                id="pot-slider"
                type="range"
                min={8}
                max={40}
                step={2}
                value={currentPotCm}
                onChange={(e) => setCurrentPotCm(Number(e.target.value))}
                className="mt-2 w-full accent-emerald-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                {t.tools.plantTypeLabel}
              </label>
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                {(['aroid', 'succulent', 'orchid', 'fern'] as const).map((fam) => (
                  <button
                    key={fam}
                    type="button"
                    onClick={() => setPlantFamily(fam)}
                    className={`rounded-xl border px-3 py-2 text-left text-xs font-semibold transition ${
                      plantFamily === fam
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300'
                    }`}
                  >
                    {pick(familyLabels[fam])}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 lg:col-span-7 dark:border-slate-800 dark:bg-slate-900/80">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              {t.tools.soilResultTitle}
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              {t.tools.recommendedPotLabel}:{' '}
              <strong className="tabular-nums text-emerald-700 dark:text-emerald-400">
                {recommendedPotCm} cm
              </strong>
            </p>

            <h3 className="mt-5 text-sm font-semibold text-slate-800 dark:text-slate-200">
              {t.tools.soilMixRecipe}
            </h3>
            <div className="mt-3 space-y-2.5">
              {soilRecipe.map((layer) => (
                <div
                  key={layer.label.en}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-800/70"
                >
                  <span className="font-medium text-slate-800 dark:text-slate-200">{pick(layer.label)}</span>
                  <span className="tabular-nums font-bold text-emerald-700 dark:text-emerald-400">
                    {layer.part}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TOOL 4: PLANT JOURNAL */}
      {tab === 'journal' && (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <form
            onSubmit={addJournalEntry}
            className="space-y-4 rounded-3xl border border-slate-200/80 bg-white/85 p-6 lg:col-span-5 dark:border-slate-800 dark:bg-slate-900/80"
          >
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                {t.tools.plantNameLabel}
              </label>
              <input
                type="text"
                value={jPlant}
                onChange={(e) => setJPlant(e.target.value)}
                required
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                  {t.tools.journalDate}
                </label>
                <input
                  type="date"
                  value={jDate}
                  onChange={(e) => setJDate(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                  {t.tools.journalHeight}
                </label>
                <input
                  type="number"
                  min={1}
                  value={jHeight}
                  onChange={(e) => setJHeight(e.target.value)}
                  placeholder="35"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                {t.tools.journalHealth}
              </label>
              <select
                value={jHealth}
                onChange={(e) => setJHealth(e.target.value as JournalEntry['health'])}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <option value="healthy">{t.tools.healthy}</option>
                <option value="recovering">{t.tools.recovering}</option>
                <option value="needsAttention">{t.tools.needsAttention}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                {t.tools.journalNotes}
              </label>
              <textarea
                rows={3}
                value={jNotes}
                onChange={(e) => setJNotes(e.target.value)}
                required
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              {t.tools.journalAddEntry}
            </button>
          </form>

          <div className="space-y-3 lg:col-span-7">
            {journal.length === 0 ? (
              <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-10 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/75 dark:text-slate-400">
                {t.tools.journalEmpty}
              </div>
            ) : (
              journal.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-start justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white/85 p-5 dark:border-slate-800 dark:bg-slate-900/80"
                >
                  <div>
                    <p className="tabular-nums text-xs text-slate-500 dark:text-slate-400">
                      {entry.date} · {t.tools[entry.health]}
                      {entry.heightCm ? ` · ${entry.heightCm} cm` : ''}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-bold text-slate-900 dark:text-white">
                      {entry.plantName}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
                      {entry.notes}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteJournal(entry.id)}
                    aria-label={t.tools.deletePlant}
                    className="rounded-xl p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
