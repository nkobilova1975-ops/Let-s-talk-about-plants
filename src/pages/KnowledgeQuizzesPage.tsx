import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {Award, Check, Clock, Flame, RotateCcw, Share2, Trophy, X} from 'lucide-react';
import {useI18n} from '../i18n/I18nContext';
import {useDocumentTitle} from '../hooks/useDocumentTitle';
import {QUIZ_CATEGORIES, type QuizCategory, type QuizCategoryId} from '../data/quizzes';
import {getStorage, setStorage} from '../utils/storage';
import {triggerConfetti} from '../utils/confetti';
import {useToast} from '../components/ToastProvider';

const BEST_SCORES_KEY = 'greennest_quiz_bests';

export const KnowledgeQuizzesPage: React.FC = () => {
  const {lang, t, pick} = useI18n();
  const {showToast} = useToast();
  useDocumentTitle(t.seo.quizTitle);

  const [activeCategory, setActiveCategory] = useState<QuizCategory | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [finished, setFinished] = useState(false);

  const [bestScores, setBestScores] = useState<Partial<Record<QuizCategoryId, number>>>(() =>
    getStorage<Partial<Record<QuizCategoryId, number>>>(BEST_SCORES_KEY, {}),
  );

  // Per-question countdown timer
  useEffect(() => {
    if (!activeCategory || finished || selectedOption !== null) return;
    if (timeLeft <= 0) {
      setSelectedOption(-1); // timed out
      setStreak(0);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [activeCategory, finished, selectedOption, timeLeft]);

  const startQuiz = (cat: QuizCategory) => {
    setActiveCategory(cat);
    setQIndex(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setTimeLeft(25);
    setFinished(false);
  };

  const handleAnswer = (idx: number) => {
    if (!activeCategory || selectedOption !== null) return;
    setSelectedOption(idx);
    const currentQ = activeCategory.questions[qIndex];
    if (idx === currentQ.correctIndex) {
      setScore((s) => s + 1);
      setStreak((st) => st + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (!activeCategory) return;
    if (qIndex + 1 < activeCategory.questions.length) {
      setQIndex((i) => i + 1);
      setSelectedOption(null);
      setTimeLeft(25);
    } else {
      setFinished(true);
      triggerConfetti();
      setBestScores((prev) => {
        const currentBest = prev[activeCategory.id] ?? 0;
        if (score > currentBest) {
          const updated = {...prev, [activeCategory.id]: score};
          setStorage(BEST_SCORES_KEY, updated);
          return updated;
        }
        return prev;
      });
    }
  };

  const copyShareCard = () => {
    if (!activeCategory) return;
    const total = activeCategory.questions.length;
    const pct = Math.round((score / total) * 100);
    const catName = t.quizzes.categories[activeCategory.id];
    const msg = t.quizzes.resultCopyTemplate
      .replace('{category}', catName)
      .replace('{score}', String(score))
      .replace('{total}', String(total))
      .replace('{pct}', String(pct));
    navigator.clipboard?.writeText(msg).catch(() => undefined);
    showToast(t.common.copied);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          {t.quizzes.title}
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          {t.quizzes.subtitle}
        </p>
      </div>

      {!activeCategory ? (
        <>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {QUIZ_CATEGORIES.map((cat) => {
              const best = bestScores[cat.id];
              return (
                <div
                  key={cat.id}
                  className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/85 p-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80"
                >
                  <div>
                    <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      {t.quizzes.questionsCount} · {pick(cat.badgeTitle)}
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
                      {t.quizzes.categories[cat.id]}
                    </h2>
                    {best !== undefined && (
                      <p className="tabular-nums mt-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
                        {t.quizzes.personalBest}: {best}/10
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => startQuiz(cat)}
                    className="mt-6 w-fit rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    {t.quizzes.startQuiz}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Personal Best Leaderboard */}
          <div className="mt-10 rounded-3xl border border-slate-200/80 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/75">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                {t.quizzes.leaderboardTitle}
              </h2>
            </div>
            {Object.keys(bestScores).length === 0 ? (
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                {t.quizzes.noScoresYet}
              </p>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {QUIZ_CATEGORIES.map((cat) => {
                  const val = bestScores[cat.id];
                  return (
                    <div key={cat.id} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {t.quizzes.categories[cat.id]}
                      </p>
                      <p className="tabular-nums mt-1 text-xl font-bold text-emerald-700 dark:text-emerald-400">
                        {val !== undefined ? `${val} / 10` : '—'}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      ) : finished ? (
        <motion.div
          initial={{opacity: 0, scale: 0.97}}
          animate={{opacity: 1, scale: 1}}
          className="mt-8 rounded-3xl border border-emerald-200 bg-white/90 p-8 text-center shadow-lg dark:border-emerald-900 dark:bg-slate-900/90"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            <Award className="h-7 w-7" />
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 dark:text-white">
            {t.quizzes.quizComplete}
          </h2>
          <p className="tabular-nums mt-2 text-lg font-semibold text-emerald-700 dark:text-emerald-400">
            {t.quizzes.score}: {score} / {activeCategory.questions.length} ({Math.round((score / activeCategory.questions.length) * 100)}%)
          </p>
          {score >= 7 && (
            <p className="mt-2 text-sm font-medium text-amber-700 dark:text-amber-300">
              {t.quizzes.badgeEarned}: {pick(activeCategory.badgeTitle)}
            </p>
          )}

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={copyShareCard}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              <Share2 className="h-4 w-4" />
              {t.quizzes.shareResult}
            </button>
            <button
              type="button"
              onClick={() => startQuiz(activeCategory)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <RotateCcw className="h-4 w-4" />
              {t.common.retry}
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400"
            >
              {t.common.back}
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="mt-8 rounded-3xl border border-slate-200/80 bg-white/85 p-6 backdrop-blur-md sm:p-8 dark:border-slate-800 dark:bg-slate-900/80">
          {/* Header status */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {t.quizzes.categories[activeCategory.id]} · {qIndex + 1}/{activeCategory.questions.length}
            </span>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="tabular-nums inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <Flame className="h-4 w-4" />
                {t.quizzes.streak}: {streak}
              </span>
              <span className="tabular-nums inline-flex items-center gap-1 text-slate-700 dark:text-slate-300">
                <Clock className="h-4 w-4" />
                {timeLeft}s
              </span>
            </div>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-emerald-600 transition-all duration-300"
              style={{width: `${((qIndex + 1) / activeCategory.questions.length) * 100}%`}}
            />
          </div>

          <h2 className="mt-6 font-display text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
            {pick(activeCategory.questions[qIndex].question)}
          </h2>

          <div className="mt-5 space-y-3">
            {activeCategory.questions[qIndex].options[lang].map((opt, idx) => {
              const correctIdx = activeCategory.questions[qIndex].correctIndex;
              const answered = selectedOption !== null;
              let btnStyle =
                'border-slate-200 bg-white text-slate-800 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200';
              if (answered) {
                if (idx === correctIdx) {
                  btnStyle =
                    'border-emerald-600 bg-emerald-50 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/60 dark:text-emerald-100';
                } else if (idx === selectedOption) {
                  btnStyle =
                    'border-rose-500 bg-rose-50 text-rose-950 dark:border-rose-500 dark:bg-rose-950/50 dark:text-rose-100';
                } else {
                  btnStyle = 'border-slate-200/60 opacity-60 dark:border-slate-800';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={answered}
                  onClick={() => handleAnswer(idx)}
                  className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-4 text-left text-sm font-medium transition ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {answered && idx === correctIdx && <Check className="h-4 w-4 shrink-0 text-emerald-600" />}
                  {answered && idx === selectedOption && idx !== correctIdx && (
                    <X className="h-4 w-4 shrink-0 text-rose-600" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {selectedOption === activeCategory.questions[qIndex].correctIndex
                  ? t.quizzes.correct
                  : t.quizzes.incorrect}
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {t.quizzes.explanation} {pick(activeCategory.questions[qIndex].explanation)}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  className="text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  {qIndex + 1 < activeCategory.questions.length ? t.common.next : t.common.finish}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
