import React from 'react';
import {AlertTriangle, RotateCcw} from 'lucide-react';

interface State {
  hasError: boolean;
}

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
  reloadLabel?: string;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(): State {
    return {hasError: true};
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {this.props.title || 'A leaf took an unexpected turn'}
          </h2>
          <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">
            {this.props.description || 'Something went wrong while rendering this view. Your saved progress is safe.'}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            <RotateCcw className="h-4 w-4" />
            {this.props.reloadLabel || 'Reload page'}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
