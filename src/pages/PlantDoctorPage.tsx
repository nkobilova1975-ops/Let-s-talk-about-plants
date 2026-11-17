import React, {useMemo, useState} from 'react';
import {motion} from 'framer-motion';
import {CheckCircle2, ShieldAlert, Stethoscope} from 'lucide-react';
import {useI18n} from '../i18n/I18nContext';
import {useDocumentTitle} from '../hooks/useDocumentTitle';
import {
  CONDITIONS,
  diagnosePlant,
  SYMPTOMS,
  type ConditionId,
  type SymptomId,
} from '../data/doctor';

export const PlantDoctorPage: React.FC = () => {
  const {lang, t, pick} = useI18n();
  useDocumentTitle(t.seo.doctorTitle);

  const [selectedSymptom, setSelectedSymptom] = useState<SymptomId | null>('yellow_leaves');
  const [conditions, setConditions] = useState<ConditionId[]>([]);

  const toggleCondition = (id: ConditionId) => {
    setConditions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const diagnosis = useMemo(() => {
    if (!selectedSymptom) return null;
    return diagnosePlant(selectedSymptom, conditions);
  }, [selectedSymptom, conditions]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          {t.doctor.title}
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          {t.doctor.subtitle}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Input selection column */}
        <div className="space-y-6 lg:col-span-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              {t.doctor.step1Title}
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {SYMPTOMS.map((sym) => {
                const active = selectedSymptom === sym.id;
                return (
                  <button
                    key={sym.id}
                    type="button"
                    onClick={() => setSelectedSymptom(sym.id)}
                    className={`rounded-2xl border p-3.5 text-left transition ${
                      active
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/60 dark:text-emerald-100'
                        : 'border-slate-200 bg-white text-slate-800 hover:border-emerald-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
                    }`}
                  >
                    <p className="text-sm font-semibold">{pick(sym.label)}</p>
                    <p className="mt-1 text-xs opacity-75">{pick(sym.description)}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              {t.doctor.step2Title}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {CONDITIONS.map((cond) => {
                const active = conditions.includes(cond.id);
                return (
                  <button
                    key={cond.id}
                    type="button"
                    onClick={() => toggleCondition(cond.id)}
                    className={`rounded-xl border px-3.5 py-2 text-xs font-medium transition ${
                      active
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {pick(cond.label)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Diagnosis Result column */}
        <div className="lg:col-span-6">
          {!diagnosis ? (
            <div className="flex h-full items-center justify-center rounded-3xl border border-slate-200 bg-white/70 p-10 text-center dark:border-slate-800 dark:bg-slate-900/60">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t.doctor.selectSymptomPrompt}
              </p>
            </div>
          ) : (
            <motion.div
              key={`${selectedSymptom}-${conditions.join(',')}`}
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              className="rounded-3xl border border-emerald-200/80 bg-white/90 p-6 shadow-md backdrop-blur-md sm:p-8 dark:border-emerald-900/60 dark:bg-slate-900/85"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 text-emerald-700 dark:text-emerald-400">
                  <Stethoscope className="h-5 w-5" />
                  <span className="text-xs font-semibold">{t.doctor.resultsTitle}</span>
                </div>
                <span className="tabular-nums text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {t.doctor.confidence}: {diagnosis.confidence}%
                </span>
              </div>

              <h2 className="mt-3 font-display text-2xl font-bold text-slate-900 dark:text-white">
                {pick(diagnosis.title)}
              </h2>

              <div className="mt-6">
                <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
                  <ShieldAlert className="h-4 w-4 text-amber-600" />
                  {t.doctor.likelyCauses}
                </h3>
                <ul className="mt-2.5 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  {diagnosis.causes[lang].map((cause, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span aria-hidden="true" className="text-amber-600">•</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  {t.doctor.stepByStepFix}
                </h3>
                <ol className="mt-2.5 space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
                  {diagnosis.steps[lang].map((step, idx) => (
                    <li key={idx} className="flex gap-2.5">
                      <span className="tabular-nums font-bold text-emerald-600 dark:text-emerald-400">
                        {idx + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/35">
                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  {t.doctor.prevention}
                </p>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                  {pick(diagnosis.prevention)}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
