import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, CheckCircle2, ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Badge } from '@/components/ui/badge';
import { manuals } from '@/data/manuals';

export function ManualPage() {
  const { id } = useParams();
  const manual = manuals.find((m) => m.id === id);

  if (!manual) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="text-xl font-bold text-white">Manual no encontrado</h1>
        <Link to="/" className="mt-6 inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => window.history.back()}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </button>

      <PageHeader icon={BookOpen} title={manual.title} description={manual.description} />

      <div className="mb-6 flex flex-wrap gap-2">
        <Badge>{manual.category}</Badge>
        {manual.tags.map((t) => (
          <span key={t} className="rounded-full bg-accent px-2.5 py-0.5 text-xs text-muted-foreground">{t}</span>
        ))}
      </div>

      <div className="space-y-4">
        {(manual.steps ?? []).map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h2 className="mb-3 text-base font-bold text-white">{i + 1}. {step.title}</h2>
            <ol className="space-y-2">
              {step.content.map((c, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {c}
                </li>
              ))}
            </ol>
          </motion.div>
        ))}

        {manual.notes && manual.notes.length > 0 && (
          <div className="rounded-2xl border-l-4 border-yellow-500 bg-yellow-500/10 p-5">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-yellow-400">Notas</h2>
            <ul className="space-y-1">
              {manual.notes.map((n, i) => (
                <li key={i} className="text-sm text-white/90">{n}</li>
              ))}
            </ul>
          </div>
        )}

        {manual.links && manual.links.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-3 text-base font-bold text-white">Enlaces</h2>
            <div className="flex flex-wrap gap-2">
              {manual.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-sm text-muted-foreground hover:border-primary/30 hover:text-white"
                >
                  <ExternalLink className="h-4 w-4" />
                  {l.name}
                </a>
              ))}
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          {manual.author} · {new Date(manual.date).toLocaleDateString('es-ES')}
        </p>
      </div>
    </div>
  );
}
