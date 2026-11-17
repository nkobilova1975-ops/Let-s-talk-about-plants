import React, {useState} from 'react';
import {Download} from 'lucide-react';
import {usePWAInstall} from '../hooks/usePWAInstall';
import {useI18n} from '../i18n/I18nContext';

export const PWAInstallButton: React.FC = () => {
  const {isInstallable, isInstalled, isIOS, install} = usePWAInstall();
  const {t} = useI18n();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) return null;

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200 dark:hover:bg-emerald-900"
      >
        <Download className="h-3.5 w-3.5" />
        {t.nav.installApp}
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Download className="h-3.5 w-3.5" />
          {t.nav.installIOS}
        </button>

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            role="dialog"
            aria-modal="true"
            onClick={() => setShowIOSGuide(false)}
          >
            <div
              className="w-full max-w-sm rounded-3xl border border-emerald-200 bg-white p-6 shadow-xl dark:border-emerald-900 dark:bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                {t.nav.iosInstallTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {t.nav.iosInstallStep1}
                <br />
                {t.nav.iosInstallStep2}
              </p>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
              >
                {t.common.close}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
