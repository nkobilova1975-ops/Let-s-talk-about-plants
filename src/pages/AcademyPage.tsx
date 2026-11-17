import React, {useMemo, useState} from 'react';
import {motion} from 'framer-motion';
import {
  Award,
  BookOpen,
  CalendarCheck,
  Check,
  Printer,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {useI18n} from '../i18n/I18nContext';
import {useDocumentTitle} from '../hooks/useDocumentTitle';
import {ACADEMY_BADGES, CHALLENGE_DAYS, HOMEWORK_MODULES} from '../data/academy';
import {GrowingPlantSVG} from '../components/GrowingPlantSVG';
import {getStorage, removeStorage, setStorage} from '../utils/storage';
import {triggerConfetti} from '../utils/confetti';
import {useToast} from '../components/ToastProvider';

interface AcademyState {
  completedDays: number[];
  homeworkChecklist: Record<string, boolean[]>;
  reflections: Record<string, string>;
  miniTestAnswers: Record<string, number>;
  completedHomework: string[];
  certificateName: string;
}

const ACADEMY_KEY = 'greennest_academy_state';

const DEFAULT_STATE: AcademyState = {
  completedDays: [],
  homeworkChecklist: {},
  reflections: {},
  miniTestAnswers: {},
  completedHomework: [],
  certificateName: '',
};

export const AcademyPage: React.FC = () => {
  const {lang, t, pick} = useI18n();
  const {showToast} = useToast();
  useDocumentTitle(t.seo.academyTitle);

  const [state, setState] = useState<AcademyState>(() =>
    getStorage<AcademyState>(ACADEMY_KEY, DEFAULT_STATE),
  );
  const [tab, setTab] = useState<'challenge' | 'homework' | 'certificate'>('challenge');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const persist = (next: AcademyState) => {
    setState(next);
    setStorage(ACADEMY_KEY, next);
  };

  const toggleDay = (dayNum: number) => {
    const done = state.completedDays.includes(dayNum);
    const completedDays = done
      ? state.completedDays.filter((d) => d !== dayNum)
      : [...state.completedDays, dayNum];
    persist({...state, completedDays});
    if (!done && (completedDays.length === 7 || completedDays.length === 15 || completedDays.length === 30)) {
      triggerConfetti();
    }
  };

  const toggleChecklistItem = (moduleId: string, idx: number, totalItems: number) => {
    const current = state.homeworkChecklist[moduleId] || Array(totalItems).fill(false);
    const updated = [...current];
    updated[idx] = !updated[idx];
    persist({
      ...state,
      homeworkChecklist: {...state.homeworkChecklist, [moduleId]: updated},
    });
  };

  const submitHomeworkModule = (moduleId: string) => {
    if (state.completedHomework.includes(moduleId)) return;
    persist({
      ...state,
      completedHomework: [...state.completedHomework, moduleId],
    });
    triggerConfetti();
    showToast(t.academy.homeworkDone);
  };

  const totalXp = useMemo(() => {
    const dayXp = CHALLENGE_DAYS.filter((d) => state.completedDays.includes(d.day)).reduce(
      (sum, d) => sum + d.xp,
      0,
    );
    const hwXp = HOMEWORK_MODULES.filter((m) => state.completedHomework.includes(m.id)).reduce(
      (sum, m) => sum + m.xp,
      0,
    );
    return dayXp + hwXp;
  }, [state.completedDays, state.completedHomework]);

  const totalTasks = CHALLENGE_DAYS.length + HOMEWORK_MODULES.length;
  const doneTasks = state.completedDays.length + state.completedHomework.length;
  const progressPercent = Math.round((doneTasks / totalTasks) * 100);
  const level = Math.floor(totalXp / 150) + 1;

  const unlockedBadges = useMemo(() => {
    return ACADEMY_BADGES.filter((b) => {
      if (b.requirementType === 'days') return state.completedDays.length >= b.threshold;
      if (b.requirementType === 'homework') return state.completedHomework.length >= b.threshold;
      return totalXp >= b.threshold;
    }).map((b) => b.id);
  }, [state.completedDays.length, state.completedHomework.length, totalXp]);

  const handleReset = () => {
    removeStorage(ACADEMY_KEY);
    setState(DEFAULT_STATE);
    setShowResetConfirm(false);
    showToast(t.common.reset, 'info');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header + Growing Plant Hero Card */}
      <div className="no-print grid grid-cols-1 items-center gap-8 rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/85 via-white to-lime-50/70 p-6 backdrop-blur-md lg:grid-cols-12 lg:p-8 dark:border-emerald-900/50 dark:from-emerald-950/50 dark:via-slate-900 dark:to-teal-950/40">
        <div className="lg:col-span-8">
          <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            {t.academy.title}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            {t.academy.subtitle}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 sm:max-w-lg">
            <div className="rounded-2xl bg-white/85 p-3.5 shadow-xs dark:bg-slate-900/80">
              <p className="text-xs text-slate-500 dark:text-slate-400">{t.academy.levelLabel}</p>
              <p className="tabular-nums mt-1 font-display text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                Lv.{level}
              </p>
            </div>
            <div className="rounded-2xl bg-white/85 p-3.5 shadow-xs dark:bg-slate-900/80">
              <p className="text-xs text-slate-500 dark:text-slate-400">{t.academy.xpLabel}</p>
              <p className="tabular-nums mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
                {totalXp}
              </p>
            </div>
            <div className="rounded-2xl bg-white/85 p-3.5 shadow-xs dark:bg-slate-900/80">
              <p className="text-xs text-slate-500 dark:text-slate-400">{t.academy.streakLabel}</p>
              <p className="tabular-nums mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
                {doneTasks}/{totalTasks}
              </p>
            </div>
          </div>

          <div className="mt-5 max-w-lg">
            <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span>{t.academy.overallProgress}</span>
              <span className="tabular-nums">{progressPercent}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-emerald-950/10 dark:bg-slate-800">
              <motion.div
                animate={{width: `${progressPercent}%`}}
                transition={{duration: 0.4}}
                className="h-full rounded-full bg-emerald-600"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto h-52 w-52 lg:col-span-4">
          <GrowingPlantSVG progressPercent={progressPercent} />
        </div>
      </div>

      {/* Tabs + Reset button */}
      <div className="no-print mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex flex-wrap gap-1.5 rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-900">
          {[
            {id: 'challenge' as const, label: t.academy.tabChallenge, icon: CalendarCheck},
            {id: 'homework' as const, label: t.academy.tabHomework, icon: BookOpen},
            {id: 'certificate' as const, label: t.academy.tabCertificate, icon: Award},
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

        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-600 hover:border-rose-300 hover:text-rose-600 dark:border-slate-700 dark:text-slate-400"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {t.academy.resetProgress}
        </button>
      </div>

      {/* TAB 1: 30-DAY CHALLENGE */}
      {tab === 'challenge' && (
        <div className="no-print mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHALLENGE_DAYS.map((item) => {
            const done = state.completedDays.includes(item.day);
            return (
              <div
                key={item.day}
                className={`flex flex-col justify-between rounded-3xl border p-5 transition ${
                  done
                    ? 'border-emerald-400/70 bg-emerald-50/70 dark:border-emerald-800 dark:bg-emerald-950/35'
                    : 'border-slate-200/80 bg-white/85 dark:border-slate-800 dark:bg-slate-900/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="tabular-nums text-emerald-700 dark:text-emerald-400">
                      {t.academy.dayPrefix} {item.day}
                    </span>
                    <span className="tabular-nums text-slate-500 dark:text-slate-400">
                      +{item.xp} XP
                    </span>
                  </div>
                  <h2 className="mt-1.5 font-display text-lg font-bold text-slate-900 dark:text-white">
                    {pick(item.title)}
                  </h2>
                  <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
                    {pick(item.description)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleDay(item.day)}
                  className={`mt-5 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                    done
                      ? 'bg-emerald-600 text-white'
                      : 'border border-slate-300 bg-white text-slate-800 hover:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
                  }`}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : null}
                  {done ? t.academy.completed : t.academy.markComplete}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: WEEKLY HOMEWORK */}
      {tab === 'homework' && (
        <div className="no-print mt-8 space-y-6">
          {HOMEWORK_MODULES.map((mod) => {
            const isSubmitted = state.completedHomework.includes(mod.id);
            const checklist = state.homeworkChecklist[mod.id] || Array(mod.checklist[lang].length).fill(false);
            const reflection = state.reflections[mod.id] || '';
            const miniAns = state.miniTestAnswers[mod.id];

            return (
              <div
                key={mod.id}
                className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      +{mod.xp} XP · {mod.level}
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
                      {pick(mod.title)}
                    </h2>
                  </div>
                  {isSubmitted && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      <Check className="h-4 w-4" />
                      {t.academy.homeworkDone}
                    </span>
                  )}
                </div>

                <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {t.academy.homeworkChecklist}
                    </h3>
                    <div className="mt-3 space-y-2">
                      {mod.checklist[lang].map((task, idx) => (
                        <label
                          key={idx}
                          className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200/80 p-3 text-sm text-slate-700 dark:border-slate-800 dark:text-slate-300"
                        >
                          <input
                            type="checkbox"
                            checked={Boolean(checklist[idx])}
                            onChange={() =>
                              toggleChecklistItem(mod.id, idx, mod.checklist[lang].length)
                            }
                            className="mt-0.5 h-4 w-4 accent-emerald-600"
                          />
                          <span>{task}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {t.academy.homeworkReflection}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {pick(mod.reflectionPrompt)}
                      </p>
                      <textarea
                        rows={2}
                        value={reflection}
                        onChange={(e) =>
                          persist({
                            ...state,
                            reflections: {...state.reflections, [mod.id]: e.target.value},
                          })
                        }
                        placeholder={t.academy.reflectionPlaceholder}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {t.academy.homeworkMiniTest}: {pick(mod.miniTest.question)}
                      </h3>
                      <div className="mt-2 space-y-1.5">
                        {mod.miniTest.options[lang].map((opt, idx) => (
                          <label
                            key={idx}
                            className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2 text-xs font-medium transition ${
                              miniAns === idx
                                ? idx === mod.miniTest.correctIndex
                                  ? 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-100'
                                  : 'border-rose-400 bg-rose-50 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200'
                                : 'border-slate-200 text-slate-700 dark:border-slate-800 dark:text-slate-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`minitest-${mod.id}`}
                              checked={miniAns === idx}
                              onChange={() =>
                                persist({
                                  ...state,
                                  miniTestAnswers: {...state.miniTestAnswers, [mod.id]: idx},
                                })
                              }
                              className="accent-emerald-600"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => submitHomeworkModule(mod.id)}
                    className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                  >
                    {isSubmitted ? t.academy.homeworkDone : t.academy.submitHomework}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: BADGES & PRINTABLE CERTIFICATE */}
      {tab === 'certificate' && (
        <div className="mt-8 space-y-8">
          <div className="no-print">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              {t.academy.badgesTitle}
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ACADEMY_BADGES.map((badge) => {
                const unlocked = unlockedBadges.includes(badge.id);
                return (
                  <motion.div
                    key={badge.id}
                    whileHover={{y: -2}}
                    className={`rounded-3xl border p-5 ${
                      unlocked
                        ? 'border-emerald-300 bg-emerald-50/70 dark:border-emerald-800 dark:bg-emerald-950/40'
                        : 'border-slate-200/80 bg-white/60 opacity-65 dark:border-slate-800 dark:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Sparkles
                        className={`h-5 w-5 ${
                          unlocked ? 'text-amber-500' : 'text-slate-400'
                        }`}
                      />
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {unlocked ? t.academy.badgeUnlocked : t.academy.badgeLocked}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold text-slate-900 dark:text-white">
                      {pick(badge.title)}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                      {pick(badge.description)}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Printable Certificate */}
          <div className="space-y-4">
            <div className="no-print flex flex-wrap items-end justify-between gap-4">
              <div className="w-full max-w-sm">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {t.academy.recipientLabel}
                </label>
                <input
                  type="text"
                  value={state.certificateName}
                  onChange={(e) => persist({...state, certificateName: e.target.value})}
                  placeholder={t.academy.recipientPlaceholder}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                <Printer className="h-4 w-4" />
                {t.academy.printCertificate}
              </button>
            </div>

            <div className="print-certificate rounded-3xl border-2 border-emerald-700/40 bg-white p-8 text-center shadow-sm sm:p-12 dark:border-emerald-500/30 dark:bg-slate-900">
              <p className="text-xs font-semibold tracking-widest text-emerald-700 dark:text-emerald-400">
                GREENNEST ACADEMY
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
                {t.academy.certificateTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 dark:text-slate-300">
                {t.academy.certificateSubtitle}
              </p>
              <p className="mt-8 font-display text-3xl font-bold italic text-emerald-800 dark:text-emerald-300">
                {state.certificateName.trim() || 'Indoor Botanical Grower'}
              </p>
              <div className="mx-auto mt-8 flex max-w-md justify-around border-t border-slate-200 pt-5 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <span className="tabular-nums">{t.academy.xpLabel}: {totalXp} XP</span>
                <span className="tabular-nums">{t.academy.overallProgress}: {progressPercent}%</span>
                <span className="tabular-nums">{new Date().toISOString().slice(0, 10)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowResetConfirm(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              {t.academy.resetConfirmTitle}
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {t.academy.resetConfirmDesc}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
              >
                {t.common.cancel}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
              >
                {t.common.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
