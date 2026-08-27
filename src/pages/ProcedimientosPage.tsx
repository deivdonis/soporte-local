import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, FileBarChart, AlertTriangle, X } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
  const [showManual, setShowManual] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Procedimientos</h1>
            <p className="mt-2 text-muted-foreground">Acceso a procedimientos operativos y administrativos</p>
          </div>
          <Button
            onClick={() => setShowManual(true)}
            variant="outline"
            className="gap-2"
          >
            <FileBarChart className="h-4 w-4" />
            Manual completo
          </Button>
        </div>

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

      {showManual && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Manual - Proceso de Irreparables</h2>
                <button
                  onClick={() => setShowManual(false)}
                  className="text-muted-foreground hover:text-white"
                  aria-label="Cerrar"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Acceder a Procedimientos → Irreparables</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Desde el menú principal, navega a Procedimientos y selecciona Irreparables.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Completar formulario de equipo</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Rellena los datos del equipo: tipo, marca, modelo, número de serie y número SAP. El ticket FARO se genera automáticamente con el prefijo INC00000.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Registrar motivos de baja</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Añade al menos un motivo por el que el equipo se considera irreparable. Puedes agregar múltiples motivos si lo necesitas.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Revisar PDF generado</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        El sistema genera automáticamente un PDF con el informe. Revisa el contenido en la vista previa antes de continuar.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Enviar por Outlook</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Haz clic en "Abrir Outlook" para abrir el cliente de correo con el email pre-rellenado. Los destinatarios (TM, David, Andrei y Enrique) estarán incluidos automáticamente.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mt-6">
                  <p className="text-xs text-muted-foreground">
                    <strong>Nota:</strong> El proceso es completamente local en tu navegador. Los datos no se guardan en servidor, solo se genera el formulario sobre la marcha.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
