import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Network, Users, Settings, HardDrive, ShieldAlert, Keyboard } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { useToast } from '@/hooks/use-toast';
import { getCategoriaBySlug } from '@/data/trucosWindows';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Network,
  Users,
  Settings,
  HardDrive,
  ShieldAlert,
  Keyboard,
};

export function TrucoCategoriaPage() {
  const { slug } = useParams();
  const { toast } = useToast();
  const categoria = getCategoriaBySlug(slug ?? '');

  if (!categoria) return <Navigate to="/trucos-windows" replace />;

  const Icon = iconMap[categoria.icon];

  const copy = (command: string) => {
    navigator.clipboard.writeText(command);
    toast({ title: 'Comando copiado' });
  };

  return (
    <div>
      <Link
        to="/trucos-windows"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a Trucos de Windows
      </Link>

      <PageHeader icon={Icon} title={categoria.title} description={categoria.description} />

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {categoria.trucos.map((truco, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: Math.min(i * 0.02, 0.4) }}
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3"
          >
            <div className="min-w-0 flex-1">
              {truco.command && (
                <code className="inline-block break-all rounded-md border border-border bg-muted px-2 py-1 font-mono text-xs text-white">
                  {truco.command}
                </code>
              )}
              <p className={truco.command ? 'mt-1.5 text-sm text-muted-foreground' : 'text-sm text-muted-foreground'}>
                {truco.description}
              </p>
            </div>
            {truco.command && (
              <button
                type="button"
                onClick={() => copy(truco.command!)}
                className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:border-primary/30 hover:text-white"
              >
                <Copy className="h-3.5 w-3.5" />
                Copiar
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
