import React, {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {CheckCircle2, ChevronDown, Mail, Send} from 'lucide-react';
import {useI18n} from '../i18n/I18nContext';
import {useDocumentTitle} from '../hooks/useDocumentTitle';
import {FAQ_ITEMS} from '../data/content';

export const FaqContactPage: React.FC = () => {
  const {t, pick} = useI18n();
  useDocumentTitle(t.seo.faqTitle);

  const [openFaq, setOpenFaq] = useState<string | null>(FAQ_ITEMS[0].id);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const mailtoHref = `mailto:hello@greennest.local?subject=${encodeURIComponent(
    subject || 'GreenNest Question',
  )}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || !message.trim()) {
      setError(t.faqContact.validationError);
      return;
    }
    setError('');
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          {t.faqContact.title}
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          {t.faqContact.subtitle}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* FAQ Accordion */}
        <div className="lg:col-span-7">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            {t.faqContact.faqHeading}
          </h2>
          <div className="mt-5 space-y-3">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openFaq === item.id;
              return (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 dark:border-slate-800 dark:bg-slate-900/80"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {pick(item.question)}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180 text-emerald-600' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{height: 0, opacity: 0}}
                        animate={{height: 'auto', opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        transition={{duration: 0.18}}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-slate-200/70 px-5 pb-5 pt-3.5 text-sm leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-300">
                          {pick(item.answer)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              {t.faqContact.contactHeading}
            </h2>

            {sent ? (
              <motion.div
                initial={{opacity: 0, scale: 0.96}}
                animate={{opacity: 1, scale: 1}}
                className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 text-center dark:border-emerald-800 dark:bg-emerald-950/40"
              >
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                <h3 className="mt-3 font-display text-xl font-bold text-slate-900 dark:text-white">
                  {t.faqContact.successTitle}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {t.faqContact.successDesc}
                </p>
                <a
                  href={mailtoHref}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700"
                >
                  <Mail className="h-4 w-4" />
                  {t.faqContact.mailtoFallback}
                </a>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                    {t.faqContact.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                    {t.faqContact.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                    {t.faqContact.subjectLabel}
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                    {t.faqContact.messageLabel}
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                {error && <p className="text-xs font-medium text-rose-600 dark:text-rose-400">{error}</p>}

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <Send className="h-4 w-4" />
                  {t.faqContact.sendButton}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
