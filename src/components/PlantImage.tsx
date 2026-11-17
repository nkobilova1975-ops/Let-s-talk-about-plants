import React, {useState} from 'react';
import {Leaf} from 'lucide-react';

interface PlantImageProps {
  src: string;
  alt: string;
  aspectClass?: string;
  className?: string;
  zoomOnHover?: boolean;
  priority?: boolean;
}

export const PlantImage: React.FC<PlantImageProps> = ({
  src,
  alt,
  aspectClass = 'aspect-[4/3]',
  className = '',
  zoomOnHover = false,
  priority = false,
}) => {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-emerald-100 via-lime-50 to-teal-100 dark:from-emerald-950 dark:via-slate-900 dark:to-teal-950 ${aspectClass} ${className}`}
    >
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-transform duration-500 ease-out ${
            zoomOnHover ? 'group-hover:scale-105' : ''
          }`}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600/15 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
            <Leaf className="h-6 w-6" aria-hidden="true" />
          </div>
          <span className="line-clamp-2 text-xs font-medium text-emerald-900/70 dark:text-emerald-200/70">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
};
