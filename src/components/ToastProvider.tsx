import React, {createContext, useCallback, useContext, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {CheckCircle2, Info, X} from 'lucide-react';

interface ToastItem {
  id: number;
  message: string;
  variant: 'success' | 'info';
}

interface ToastContextValue {
  showToast: (message: string, variant?: 'success' | 'info') => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, variant: 'success' | 'info' = 'success') => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((prev) => [...prev.slice(-2), {id, message, variant}]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 3200);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-5 right-5 z-50 flex max-w-sm flex-col gap-2"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{opacity: 0, y: 16, scale: 0.96}}
              animate={{opacity: 1, y: 0, scale: 1}}
              exit={{opacity: 0, y: 12, scale: 0.96}}
              transition={{duration: 0.18}}
              className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-emerald-200/80 bg-white/95 px-4 py-3 text-sm font-medium text-slate-900 shadow-lg backdrop-blur-md dark:border-emerald-800/70 dark:bg-slate-900/95 dark:text-slate-100"
            >
              {toast.variant === 'success' ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Info className="h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" />
              )}
              <span className="flex-1">{toast.message}</span>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                aria-label="Close"
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}
