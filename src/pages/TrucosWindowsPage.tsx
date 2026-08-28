import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wrench, Network, Users, Settings, HardDrive, ShieldAlert, Keyboard, ChevronRight } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { categoriasTrucos } from '@/data/trucosWindows';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Network,
  Users,
  Settings,
  HardDrive,
  ShieldAlert,
  Keyboard,
};

const ORDEN_PRIORITARIO = ['usuarios-permisos'];

export function TrucosWindowsPage() {
  const categoriasOrdenadas = [...categoriasTrucos].sort((a, b) => {
    const ia = ORDEN_PRIORITARIO.indexOf(a.slug);
    const ib = ORDEN_PRIORITARIO.indexOf(b.slug);
    if (ia === -1 && ib === -1) return 0;
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  return (
    <div>
      <PageHeader
        icon={Wrench}
        title="Trucos de Windows"
        description="Comandos y atajos útiles para técnicos de redes y soporte"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categoriasOrdenadas.map((cat, i) => {
          const Icon = iconMap[cat.icon];
          return (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link
                to={`/trucos-windows/${cat.slug}`}
                className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-transform hover:scale-[1.02] hover:border-primary/30 hover:bg-accent/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{cat.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
                </div>
                <p className="mt-auto text-xs font-medium text-primary">{cat.trucos.length} trucos</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
