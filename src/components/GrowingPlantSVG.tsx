import React from 'react';
import {motion} from 'framer-motion';

interface GrowingPlantSVGProps {
  progressPercent: number; // 0 to 100
  className?: string;
}

/**
 * Custom animated botanical SVG that progressively sprouts stems,
 * unfolds 5 pairs of leaves, and blooms a botanical flower as Academy progress rises.
 */
export const GrowingPlantSVG: React.FC<GrowingPlantSVGProps> = ({progressPercent, className = ''}) => {
  const clamped = Math.max(0, Math.min(100, progressPercent));
  const stemHeight = 25 + (clamped / 100) * 115; // grows from y=175 up toward y=60
  const stemTopY = 175 - stemHeight;

  const showLeaf1 = clamped >= 10;
  const showLeaf2 = clamped >= 25;
  const showLeaf3 = clamped >= 45;
  const showLeaf4 = clamped >= 65;
  const showLeaf5 = clamped >= 82;
  const showBloom = clamped >= 95;

  return (
    <svg
      viewBox="0 0 220 230"
      className={`h-full w-full ${className}`}
      role="img"
      aria-label={`Growing plant illustration at ${Math.round(clamped)}% progress`}
    >
      <defs>
        <linearGradient id="potGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D97757" />
          <stop offset="100%" stopColor="#A94F33" />
        </linearGradient>
        <linearGradient id="leafGradA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="leafGradB" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#84CC16" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>

      {/* Soft ground shadow */}
      <ellipse cx="110" cy="216" rx="54" ry="7" fill="currentColor" className="text-emerald-950/10 dark:text-black/40" />

      {/* Soil mound */}
      <ellipse cx="110" cy="175" rx="38" ry="8" fill="#4A3525" />

      {/* Main growing stem */}
      <motion.line
        x1="110"
        y1="175"
        x2="110"
        animate={{y2: stemTopY}}
        transition={{type: 'spring', stiffness: 90, damping: 16}}
        stroke="#10B981"
        strokeWidth="5.5"
        strokeLinecap="round"
      />

      {/* Cotyledon starter sprout (always visible) */}
      <motion.path
        d="M110 162 C95 152, 82 152, 80 160 C85 166, 98 167, 110 162 Z"
        fill="url(#leafGradB)"
        initial={{scale: 0.7}}
        animate={{scale: 1}}
      />
      <motion.path
        d="M110 162 C125 152, 138 152, 140 160 C135 166, 122 167, 110 162 Z"
        fill="url(#leafGradA)"
        initial={{scale: 0.7}}
        animate={{scale: 1}}
      />

      {/* Leaf 1 (10%+) */}
      {showLeaf1 && (
        <motion.path
          d="M110 144 C82 128, 66 135, 65 147 C77 154, 96 152, 110 144 Z"
          fill="url(#leafGradA)"
          initial={{scale: 0, opacity: 0}}
          animate={{scale: 1, opacity: 1}}
          style={{transformOrigin: '110px 144px'}}
          transition={{duration: 0.4}}
        />
      )}

      {/* Leaf 2 (25%+) */}
      {showLeaf2 && (
        <motion.path
          d="M110 128 C138 110, 158 118, 160 131 C146 139, 126 137, 110 128 Z"
          fill="url(#leafGradB)"
          initial={{scale: 0, opacity: 0}}
          animate={{scale: 1, opacity: 1}}
          style={{transformOrigin: '110px 128px'}}
          transition={{duration: 0.4}}
        />
      )}

      {/* Leaf 3 (45%+) */}
      {showLeaf3 && (
        <motion.path
          d="M110 110 C76 88, 56 98, 55 113 C72 123, 94 120, 110 110 Z"
          fill="url(#leafGradA)"
          initial={{scale: 0, opacity: 0}}
          animate={{scale: 1, opacity: 1}}
          style={{transformOrigin: '110px 110px'}}
          transition={{duration: 0.45}}
        />
      )}

      {/* Leaf 4 (65%+) */}
      {showLeaf4 && (
        <motion.path
          d="M110 92 C142 70, 165 80, 166 96 C150 106, 126 102, 110 92 Z"
          fill="url(#leafGradB)"
          initial={{scale: 0, opacity: 0}}
          animate={{scale: 1, opacity: 1}}
          style={{transformOrigin: '110px 92px'}}
          transition={{duration: 0.45}}
        />
      )}

      {/* Leaf 5 (82%+) */}
      {showLeaf5 && (
        <motion.path
          d="M110 76 C84 54, 65 62, 65 76 C79 86, 97 83, 110 76 Z"
          fill="url(#leafGradA)"
          initial={{scale: 0, opacity: 0}}
          animate={{scale: 1, opacity: 1}}
          style={{transformOrigin: '110px 76px'}}
          transition={{duration: 0.45}}
        />
      )}

      {/* Crown Flower Bloom (95%+) */}
      {showBloom && (
        <motion.g
          initial={{scale: 0, opacity: 0}}
          animate={{scale: 1, opacity: 1}}
          style={{transformOrigin: '110px 56px'}}
          transition={{type: 'spring', stiffness: 160, damping: 14}}
        >
          <circle cx="110" cy="44" r="9" fill="#FDE68A" />
          <circle cx="99" cy="54" r="9" fill="#FEF3C7" />
          <circle cx="121" cy="54" r="9" fill="#FEF3C7" />
          <circle cx="104" cy="64" r="8" fill="#FDE68A" />
          <circle cx="116" cy="64" r="8" fill="#FDE68A" />
          <circle cx="110" cy="55" r="7" fill="#F59E0B" />
        </motion.g>
      )}

      {/* Terracotta Pot */}
      <path d="M72 176 L148 176 L138 214 L82 214 Z" fill="url(#potGrad)" />
      <rect x="66" y="168" width="88" height="11" rx="5.5" fill="#E08666" />
    </svg>
  );
};
