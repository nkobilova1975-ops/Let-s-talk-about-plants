import React, {useMemo, useState} from 'react';
import {motion} from 'framer-motion';
import {Check, Droplets, HelpCircle, Layers, RotateCcw, Sparkles, X} from 'lucide-react';
import {useI18n} from '../i18n/I18nContext';
import {useDocumentTitle} from '../hooks/useDocumentTitle';
import {PLANTS} from '../data/plants';
import {GUESS_PLANT_ROUNDS, WATER_OR_NOT_CARDS} from '../data/content';
import {getStorage, setStorage} from '../utils/storage';
import {triggerConfetti} from '../utils/confetti';

type GameTab = 'memory' | 'water' | 'guess';

interface MemoryCard {
  uid: string;
  plantId: string;
  label: string;
  latin: string;
  flipped: boolean;
  matched: boolean;
}

const MEMORY_BEST_KEY = 'greennest_memory_best_moves';

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const MiniGamesPage: React.FC = () => {
  const {t, pick} = useI18n();
  useDocumentTitle(t.seo.gamesTitle);

  const [tab, setTab] = useState<GameTab>('memory');

  // ── Game A: Memory Match ──
  const buildMemoryDeck = (): MemoryCard[] => {
    const sample = PLANTS.slice(0, 6);
    const pairs = [...sample, ...sample].map((p, idx) => ({
      uid: `${p.id}-${idx}-${Math.random()}`,
      plantId: p.id,
      label: pick(p.name),
      latin: p.latinName,
      flipped: false,
      matched: false,
    }));
    return shuffleArray(pairs);
  };

  const [cards, setCards] = useState<MemoryCard[]>(() => buildMemoryDeck());
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [bestMoves, setBestMoves] = useState<number | null>(() =>
    getStorage<number | null>(MEMORY_BEST_KEY, null),
  );
  const [locked, setLocked] = useState(false);

  const matchedPairs = cards.filter((c) => c.matched).length / 2;

  const restartMemory = () => {
    setCards(buildMemoryDeck());
    setSelectedIndices([]);
    setMoves(0);
    setLocked(false);
  };

  const handleCardClick = (index: number) => {
    if (locked || cards[index].flipped || cards[index].matched) return;

    const updated = cards.map((c, i) => (i === index ? {...c, flipped: true} : c));
    const nextSel = [...selectedIndices, index];
    setCards(updated);
    setSelectedIndices(nextSel);

    if (nextSel.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      const [i1, i2] = nextSel;
      if (updated[i1].plantId === updated[i2].plantId) {
        setTimeout(() => {
          setCards((prev) => {
            const matched = prev.map((c, idx) =>
              idx === i1 || idx === i2 ? {...c, matched: true} : c,
            );
            if (matched.every((c) => c.matched)) {
              triggerConfetti();
              const finalMoves = moves + 1;
              if (bestMoves === null || finalMoves < bestMoves) {
                setBestMoves(finalMoves);
                setStorage(MEMORY_BEST_KEY, finalMoves);
              }
            }
            return matched;
          });
          setSelectedIndices([]);
          setLocked(false);
        }, 320);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, idx) => (idx === i1 || idx === i2 ? {...c, flipped: false} : c)),
          );
          setSelectedIndices([]);
          setLocked(false);
        }, 700);
      }
    }
  };

  // ── Game B: Water or Not? ──
  const [waterIdx, setWaterIdx] = useState(0);
  const [waterScore, setWaterScore] = useState(0);
  const [waterFeedback, setWaterFeedback] = useState<{correct: boolean; reason: string} | null>(null);
  const [waterDone, setWaterDone] = useState(false);

  const currentWaterCard = WATER_OR_NOT_CARDS[waterIdx];

  const answerWaterCard = (choice: boolean) => {
    if (waterFeedback || waterDone) return;
    const isCorrect = choice === currentWaterCard.shouldWater;
    if (isCorrect) setWaterScore((s) => s + 1);
    setWaterFeedback({correct: isCorrect, reason: pick(currentWaterCard.reason)});
  };

  const nextWaterCard = () => {
    setWaterFeedback(null);
    if (waterIdx + 1 < WATER_OR_NOT_CARDS.length) {
      setWaterIdx((i) => i + 1);
    } else {
      setWaterDone(true);
      triggerConfetti();
    }
  };

  const resetWaterGame = () => {
    setWaterIdx(0);
    setWaterScore(0);
    setWaterFeedback(null);
    setWaterDone(false);
  };

  // ── Game C: Guess the Plant ──
  const [guessIdx, setGuessIdx] = useState(0);
  const [cluesRevealed, setCluesRevealed] = useState(1);
  const [guessScore, setGuessScore] = useState(0);
  const [guessChoice, setGuessChoice] = useState<string | null>(null);
  const [guessDone, setGuessDone] = useState(false);

  const currentRound = GUESS_PLANT_ROUNDS[guessIdx];
  const guessOptions = useMemo(() => {
    const ids = [currentRound.answerId, ...currentRound.distractorIds];
    const items = ids
      .map((id) => PLANTS.find((p) => p.id === id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p));
    return items.sort((a, b) => a.id.localeCompare(b.id));
  }, [currentRound]);

  const pointsThisRound = cluesRevealed === 1 ? 30 : cluesRevealed === 2 ? 20 : 10;

  const submitGuess = (plantId: string) => {
    if (guessChoice) return;
    setGuessChoice(plantId);
    if (plantId === currentRound.answerId) {
      setGuessScore((s) => s + pointsThisRound);
    }
  };

  const nextGuessRound = () => {
    setGuessChoice(null);
    setCluesRevealed(1);
    if (guessIdx + 1 < GUESS_PLANT_ROUNDS.length) {
      setGuessIdx((i) => i + 1);
    } else {
      setGuessDone(true);
      triggerConfetti();
    }
  };

  const resetGuessGame = () => {
    setGuessIdx(0);
    setCluesRevealed(1);
    setGuessScore(0);
    setGuessChoice(null);
    setGuessDone(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          {t.games.title}
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          {t.games.subtitle}
        </p>
      </div>

      {/* Tab selector */}
      <div className="mt-8 inline-flex flex-wrap gap-1.5 rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-900">
        {[
          {id: 'memory' as const, label: t.games.tabMemory, icon: Layers},
          {id: 'water' as const, label: t.games.tabWater, icon: Droplets},
          {id: 'guess' as const, label: t.games.tabGuess, icon: HelpCircle},
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

      {/* TAB 1: MEMORY MATCH */}
      {tab === 'memory' && (
        <div className="mt-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-3.5 dark:border-slate-800 dark:bg-slate-900/75">
            <div className="flex flex-wrap items-center gap-6 text-sm font-semibold">
              <span className="tabular-nums text-slate-800 dark:text-slate-200">
                {t.games.moves}: {moves}
              </span>
              <span className="tabular-nums text-emerald-700 dark:text-emerald-400">
                {t.games.pairsFound}: {matchedPairs}/6
              </span>
              {bestMoves !== null && (
                <span className="tabular-nums text-slate-500 dark:text-slate-400">
                  {t.games.bestMoves}: {bestMoves}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={restartMemory}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {t.games.restartGame}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {cards.map((card, idx) => {
              const revealed = card.flipped || card.matched;
              return (
                <motion.button
                  key={card.uid}
                  type="button"
                  whileTap={{scale: 0.97}}
                  onClick={() => handleCardClick(idx)}
                  className={`flex h-32 flex-col items-center justify-center rounded-2xl border p-3 text-center transition ${
                    card.matched
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950 dark:border-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-100'
                      : revealed
                      ? 'border-emerald-300 bg-white text-slate-900 shadow-sm dark:border-emerald-700 dark:bg-slate-800 dark:text-white'
                      : 'border-slate-200 bg-gradient-to-br from-emerald-700 to-teal-800 text-white hover:opacity-95 dark:border-slate-700'
                  }`}
                >
                  {revealed ? (
                    <>
                      <span className="font-display text-sm font-bold leading-snug">{card.label}</span>
                      <span className="mt-1 text-[11px] italic opacity-70">{card.latin}</span>
                    </>
                  ) : (
                    <Sparkles className="h-6 w-6 opacity-80" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: WATER OR NOT */}
      {tab === 'water' && (
        <div className="mt-8">
          {waterDone ? (
            <div className="rounded-3xl border border-emerald-200 bg-white/90 p-8 text-center dark:border-emerald-900 dark:bg-slate-900/80">
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                {t.games.gameOver}
              </h2>
              <p className="tabular-nums mt-2 text-lg font-semibold text-emerald-700 dark:text-emerald-400">
                {t.games.finalScore}: {waterScore} / {WATER_OR_NOT_CARDS.length}
              </p>
              <button
                type="button"
                onClick={resetWaterGame}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                <RotateCcw className="h-4 w-4" />
                {t.games.restartGame}
              </button>
            </div>
          ) : (
            <motion.div
              key={currentWaterCard.id}
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              className="mx-auto max-w-xl rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/85"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span className="tabular-nums">{waterIdx + 1} / {WATER_OR_NOT_CARDS.length}</span>
                <span className="tabular-nums text-emerald-700 dark:text-emerald-400">
                  {t.quizzes.score}: {waterScore}
                </span>
              </div>

              <h2 className="mt-4 font-display text-2xl font-bold text-slate-900 dark:text-white">
                {pick(currentWaterCard.plantName)}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                {pick(currentWaterCard.scenario)}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={Boolean(waterFeedback)}
                  onClick={() => answerWaterCard(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-50"
                >
                  <Droplets className="h-4 w-4" />
                  {t.games.waterAction}
                </button>
                <button
                  type="button"
                  disabled={Boolean(waterFeedback)}
                  onClick={() => answerWaterCard(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                >
                  <X className="h-4 w-4" />
                  {t.games.skipWaterAction}
                </button>
              </div>

              {waterFeedback && (
                <div className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                  <p className={`text-sm font-bold ${waterFeedback.correct ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {waterFeedback.correct ? t.quizzes.correct : t.quizzes.incorrect}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{waterFeedback.reason}</p>
                  <button
                    type="button"
                    onClick={nextWaterCard}
                    className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                  >
                    {t.common.next}
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      )}

      {/* TAB 3: GUESS THE PLANT */}
      {tab === 'guess' && (
        <div className="mt-8">
          {guessDone ? (
            <div className="rounded-3xl border border-emerald-200 bg-white/90 p-8 text-center dark:border-emerald-900 dark:bg-slate-900/80">
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                {t.games.gameOver}
              </h2>
              <p className="tabular-nums mt-2 text-lg font-semibold text-emerald-700 dark:text-emerald-400">
                {t.games.finalScore}: {guessScore} / {GUESS_PLANT_ROUNDS.length * 30}
              </p>
              <button
                type="button"
                onClick={resetGuessGame}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                <RotateCcw className="h-4 w-4" />
                {t.games.restartGame}
              </button>
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/85">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
                <span className="tabular-nums text-slate-500 dark:text-slate-400">
                  {guessIdx + 1} / {GUESS_PLANT_ROUNDS.length}
                </span>
                <span className="tabular-nums text-emerald-700 dark:text-emerald-400">
                  {t.games.pointsAvailable}: +{pointsThisRound} · {t.quizzes.score}: {guessScore}
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                {t.games.guessInstruction}
              </p>

              <div className="mt-4 space-y-2.5">
                {currentRound.clues[pick({en: 'en', ru: 'ru', uz: 'uz'}) as 'en' | 'ru' | 'uz']
                  .slice(0, cluesRevealed)
                  .map((clue, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-emerald-200/80 bg-emerald-50/70 px-4 py-3 text-sm text-slate-800 dark:border-emerald-900/50 dark:bg-emerald-950/35 dark:text-slate-200"
                    >
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        {t.games.clueNumber} {idx + 1}:{' '}
                      </span>
                      {clue}
                    </div>
                  ))}
              </div>

              {cluesRevealed < 3 && !guessChoice && (
                <button
                  type="button"
                  onClick={() => setCluesRevealed((c) => Math.min(3, c + 1))}
                  className="mt-3 text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
                >
                  + {t.games.revealClue}
                </button>
              )}

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {guessOptions.map((opt) => {
                  const answered = Boolean(guessChoice);
                  const isCorrect = opt.id === currentRound.answerId;
                  const isPicked = opt.id === guessChoice;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={answered}
                      onClick={() => submitGuess(opt.id)}
                      className={`flex items-center justify-between rounded-2xl border p-4 text-left text-sm font-semibold transition ${
                        answered && isCorrect
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/60 dark:text-emerald-100'
                          : answered && isPicked
                          ? 'border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200'
                          : 'border-slate-200 bg-white text-slate-800 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
                      }`}
                    >
                      <span>{pick(opt.name)}</span>
                      {answered && isCorrect && <Check className="h-4 w-4 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>

              {guessChoice && (
                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={nextGuessRound}
                    className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    {t.common.next}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
