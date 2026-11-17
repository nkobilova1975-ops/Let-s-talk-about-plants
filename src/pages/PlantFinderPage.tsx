import React, {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {AnimatePresence, motion} from 'framer-motion';
import {ArrowLeft, ArrowRight, RotateCcw} from 'lucide-react';
import {useI18n} from '../i18n/I18nContext';
import {useDocumentTitle} from '../hooks/useDocumentTitle';
import {calculatePlantMatches, FINDER_QUESTIONS, type FinderOption} from '../data/quizzes';
import {getPlantImage} from '../data/images';
import {PlantImage} from '../components/PlantImage';
import {triggerConfetti} from '../utils/confetti';

export const PlantFinderPage: React.FC = () => {
  const {t, pick} = useI18n();
  useDocumentTitle(t.seo.finderTitle);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, FinderOption>>({});
  const [finished, setFinished] = useState(false);

  const currentQuestion = FINDER_QUESTIONS[step];
  const progress = finished ? 100 : Math.round(((step + 1) / FINDER_QUESTIONS.length) * 100);

  const matches = useMemo(() => {
    if (!finished) return [];
    return calculatePlantMatches(answers);
  }, [finished, answers]);

  const chooseOption = (option: FinderOption) => {
    const nextAnswers = {...answers, [currentQuestion.id]: option};
    setAnswers(nextAnswers);
    if (step + 1 < FINDER_QUESTIONS.length) {
      setStep((s) => s + 1);
    } else {
      setFinished(true);
      triggerConfetti();
    }
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setFinished(false);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          {t.finder.title}
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-300">
          {t.finder.subtitle}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>
            {finished
              ? t.finder.resultsTitle
              : t.finder.questionOf
                  .replace('{current}', String(step + 1))
                  .replace('{total}', String(FINDER_QUESTIONS.length))}
          </span>
          <span className="tabular-nums">{progress}%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <motion.div
            animate={{width: `${progress}%`}}
            transition={{duration: 0.3}}
            className="h-full rounded-full bg-emerald-600"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={currentQuestion.id}
            initial={{opacity: 0, x: 20}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: -20}}
            transition={{duration: 0.22}}
            className="mt-8 rounded-3xl border border-slate-200/80 bg-white/85 p-6 backdrop-blur-md sm:p-8 dark:border-slate-800 dark:bg-slate-900/80"
          >
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              {pick(currentQuestion.question)}
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {currentQuestion.options.map((opt) => {
                const selected = answers[currentQuestion.id]?.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => chooseOption(opt)}
                    className={`rounded-2xl border p-4 text-left text-sm font-medium transition ${
                      selected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/60 dark:text-emerald-100'
                        : 'border-slate-200 bg-white text-slate-800 hover:border-emerald-400 hover:bg-emerald-50/40 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-emerald-700'
                    }`}
                  >
                    {pick(opt.label)}
                  </button>
                );
              })}
            </div>

            {step > 0 && (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-emerald-700 dark:text-slate-400"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t.common.back}
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            className="mt-8 space-y-6"
          >
            <div className="text-center">
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                {t.finder.resultsTitle}
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {t.finder.resultsSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {matches.map(({plant, percentage}) => (
                <div
                  key={plant.id}
                  className="flex flex-col overflow-hidden rounded-3xl border border-emerald-200/80 bg-white/90 shadow-md dark:border-emerald-900/60 dark:bg-slate-900/85"
                >
                  <PlantImage src={getPlantImage(plant.slug, plant.imageKey)} alt={pick(plant.name)} />
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <p className="tabular-nums text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        {percentage}% {t.finder.matchScore} · {t.common[plant.difficulty]}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-bold text-slate-900 dark:text-white">
                        {pick(plant.name)}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        {pick(plant.description)}
                      </p>
                    </div>
                    <Link
                      to={`/encyclopedia?plant=${plant.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400"
                    >
                      {t.common.viewDetails}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                <RotateCcw className="h-4 w-4" />
                {t.finder.retake}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
