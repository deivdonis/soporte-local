import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, FileBarChart, AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';

const procedures = [
  {
    label: 'Informe Mensual',
    icon: FileBarChart,
    description: 'Acceso directo al portal SharePoint',
    action: 'link',
    to: 'https://dxcportal.sharepoint.com/sites/SoporteTecnicoMD/',
    classes: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
  },
  {
    label: 'Irreparables',
    icon: AlertTriangle,
    description: 'Generar informe de equipo irreparable',
    action: 'navigate',
    to: '/procedimientos/irreparables',
    classes: 'bg-red-500/10 text-red-400 ring-red-500/20',
  },
];

export function ProcedimientosPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-8"
    >
      <PageHeader
        icon={Zap}
        title="Procedimientos"
        description="Acceso a procedimientos operativos y administrativos"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {procedures.map((proc, i) => {
          const Icon = proc.icon;
          const content = (
            <motion.div
              key={proc.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center transition-transform hover:scale-[1.02] hover:border-primary/30 hover:bg-accent/30"
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-xl ring-1 ${proc.classes}`}>
                <Icon className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{proc.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{proc.description}</p>
              </div>
            </motion.div>
          );

          if (proc.action === 'link') {
            return (
              <a key={proc.label} href={proc.to} target="_blank" rel="noreferrer">
                {content}
              </a>
            );
          }

          return (
            <Link key={proc.label} to={proc.to}>
              {content}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
