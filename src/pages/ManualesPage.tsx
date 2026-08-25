import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  FileText,
  Search,
  Star,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Download,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { manuals, manualCategories } from '@/data/manuals';

export function ManualesPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = manuals.filter((m) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      m.title.toLowerCase().includes(q) ||
      m.tags.some((t) => t.toLowerCase().includes(q));
    const matchesCategory = !selectedCategory || m.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div>
      <PageHeader icon={BookOpen} title="Manuales" description="Guías y procedimientos internos de soporte" />

      <div className="mb-6 flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar manuales..."
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
              selectedCategory === null
                ? 'border-transparent bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-white'
            )}
          >
            Todos
          </button>
          {manualCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                selectedCategory === cat
                  ? 'border-transparent bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-white'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((manual, i) => (
          <motion.div
            key={manual.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Link
              to={`/manuales/${manual.id}`}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/30 hover:bg-accent/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                  <FileText className="h-5 w-5" />
                </div>
                <Star
                  className={cn(
                    'h-4 w-4',
                    manual.favorite ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'
                  )}
                />
              </div>
              <h3 className="mt-3 text-base font-bold text-white">{manual.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{manual.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge>{manual.category}</Badge>
                {manual.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-accent px-2.5 py-0.5 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-auto pt-4 text-xs text-muted-foreground">
                {manual.author} · {new Date(manual.date).toLocaleDateString('es-ES')}
              </p>
            </Link>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
            No se encontraron manuales.
          </p>
        )}
      </div>
    </div>
  );
}

export function ManualDetailPage() {
  const { id } = useParams();
  const manual = manuals.find((m) => m.id === id);

  if (!manual) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="text-xl font-bold text-white">Manual no encontrado</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          El manual que buscas no existe o ha sido eliminado.
        </p>
        <Link
          to="/manuales"
          className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a manuales
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/manuales"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a manuales
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20">
          <FileText className="h-6 w-6" />
        </div>
        <div>
          <Badge className="mb-2">{manual.category}</Badge>
          <h1 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">{manual.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{manual.description}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {manual.author} · {new Date(manual.date).toLocaleDateString('es-ES')}
          </p>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {manual.steps?.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-white">
                  {i + 1}. {step.title}
                </h3>
              </div>
              <ul className="mt-3 space-y-2 pl-7">
                {step.content.map((line, j) => (
                  <li key={j} className="list-disc text-sm text-muted-foreground">
                    {line}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {manual.notes && manual.notes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-6"
            >
              <h3 className="mb-2 text-sm font-bold text-amber-400">Notas</h3>
              <ul className="space-y-1.5">
                {manual.notes.map((note, i) => (
                  <li key={i} className="list-disc pl-4 text-sm text-muted-foreground">
                    {note}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h3 className="mb-3 text-sm font-bold text-white">Etiquetas</h3>
            <div className="flex flex-wrap gap-1.5">
              {manual.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-accent px-2.5 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {manual.links && manual.links.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="mb-3 text-sm font-bold text-white">Enlaces externos</h3>
              <div className="flex flex-col gap-2">
                {manual.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-2 rounded-xl border border-border bg-background/40 p-3 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-white"
                  >
                    {link.name}
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}

          {manual.pdfUrl && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <Button asChild className="w-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90">
                <a href={manual.pdfUrl} target="_blank" rel="noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar PDF
                </a>
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
