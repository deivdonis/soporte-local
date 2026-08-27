import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Monitor,
  Download,
  BookOpen,
  CheckCircle2,
  KeyRound,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { getDeviceById, deviceCategories } from '@/data/devices';

export function DeviceDetailPage() {
  const { id } = useParams();
  const device = getDeviceById(id ?? '');

  if (!device) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="text-xl font-bold text-white">Dispositivo no encontrado</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          El dispositivo que buscas no existe o ha sido eliminado.
        </p>
        <Link
          to="/dispositivos"
          className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a dispositivos
        </Link>
      </div>
    );
  }

  const categoryInfo = deviceCategories.find((c) => c.id === device.category);

  const shortcutEntries: string[] = [
    ...(device.shortcuts ?? []),
  ];

  if (device.printerInfo) {
    const p = device.printerInfo;
    if (p.testPage) shortcutEntries.push(`Página de prueba: ${p.testPage}`);
    (p.cleaning ?? []).forEach((c) => shortcutEntries.push(`Limpieza: ${c}`));
    (p.maintenance ?? []).forEach((m) => shortcutEntries.push(`Mantenimiento: ${m}`));
  }

  if (device.zebraInfo) {
    const z = device.zebraInfo;
    (z.calibration ?? []).forEach((c) => shortcutEntries.push(`Calibración: ${c}`));
    if (z.feed) shortcutEntries.push(`Avance: ${z.feed}`);
    if (z.pause) shortcutEntries.push(`Pausa: ${z.pause}`);
    if (z.sensor) shortcutEntries.push(`Sensor: ${z.sensor}`);
    if (z.configLabel) shortcutEntries.push(`Etiqueta de configuración: ${z.configLabel}`);
    (z.reset ?? []).forEach((r) => shortcutEntries.push(`Reset: ${r}`));
    (z.combinations ?? []).forEach((c) => shortcutEntries.push(`Combinación: ${c}`));
  }

  if (device.monitorInfo) {
    const m = device.monitorInfo;
    if (m.reset) shortcutEntries.push(`Reset: ${m.reset}`);
    if (m.osd) shortcutEntries.push(`OSD: ${m.osd}`);
    if (m.serviceMode) shortcutEntries.push(`Modo servicio: ${m.serviceMode}`);
    if (m.factoryMode) shortcutEntries.push(`Modo fábrica: ${m.factoryMode}`);
    if (m.osdUnlock) shortcutEntries.push(`Desbloqueo OSD: ${m.osdUnlock}`);
    (m.buttonCombos ?? []).forEach((b) => shortcutEntries.push(`Combinación: ${b}`));
    if (m.calibration) shortcutEntries.push(`Calibración: ${m.calibration}`);
  }

  if (device.telephoneInfo) {
    const t = device.telephoneInfo;
    (t.codes ?? []).forEach((c) => shortcutEntries.push(`Código: ${c}`));
    if (t.voicemail) shortcutEntries.push(`Correo de voz: ${t.voicemail}`);
    if (t.speedDial) shortcutEntries.push(`Marcación rápida: ${t.speedDial}`);
    if (t.transfer) shortcutEntries.push(`Transferencia: ${t.transfer}`);
  }

  const MANUAL_TIPOS_EXCLUIDOS = ['Seguridad', 'Configuración', 'Mantenimiento', 'Procedimientos'];
  const manualesFiltrados = device.manuals.filter(
    (m) => !MANUAL_TIPOS_EXCLUIDOS.some((tipo) => m.type?.includes(tipo))
  );

  const firstDriver = device.drivers[0];
  const firstManual = manualesFiltrados[0];

  return (
    <div>
      <Link
        to={`/dispositivos/${device.category}`}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a {categoryInfo?.name ?? 'Dispositivos'}
      </Link>

      <PageHeader
        icon={Monitor}
        title={device.model}
        description={device.description}
        actions={
          <>
            {firstDriver && (
              <Button asChild variant="outline">
                <a href={firstDriver.url} target="_blank" rel="noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Driver
                </a>
              </Button>
            )}
            {firstManual && (
              <Button asChild className="bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90">
                <a href={firstManual.url} target="_blank" rel="noreferrer">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Manual
                </a>
              </Button>
            )}
          </>
        }
      />

      <div className="mb-6">
        <Badge>{device.brand}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <h2 className="mb-4 text-base font-bold text-white">Especificaciones</h2>
          <dl className="divide-y divide-border">
            {device.specs.map((spec) => (
              <div key={spec.label} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                <dt className="text-muted-foreground">{spec.label}</dt>
                <dd className="text-right font-medium text-white">{spec.value}</dd>
              </div>
            ))}
            {device.specs.length === 0 && (
              <p className="py-2.5 text-sm text-muted-foreground">Sin especificaciones registradas.</p>
            )}
          </dl>
        </motion.div>

        {device.bios && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h2 className="mb-4 text-base font-bold text-white">ACCESO A LA BIOS</h2>
            <div className="space-y-4">
              <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-500/10 p-3">
                <h3 className="text-sm font-semibold text-yellow-400">Acceso a la BIOS</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {device.bios.key || 'Ver instrucciones específicas del modelo'}
                </p>
              </div>
              {device.bios.bootMenu && (
                <div>
                  <h3 className="text-sm font-semibold text-primary">Menú de arranque</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{device.bios.bootMenu}</p>
                </div>
              )}
              {device.bios.recovery && (
                <div>
                  <h3 className="text-sm font-semibold text-primary">Recuperación</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{device.bios.recovery}</p>
                </div>
              )}
              {device.factoryReset && (
                <>
                  <div className="border-t border-border pt-4">
                    <h3 className="text-sm font-semibold text-primary">Restablecimiento de fábrica</h3>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground">Por software</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{device.factoryReset.software}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground">Por botones</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{device.factoryReset.buttons}</p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}

        {device.telephoneInfo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="rounded-2xl border border-border bg-card p-6 lg:col-span-2"
          >
            <h2 className="mb-4 text-base font-bold text-white">Información del teléfono</h2>
            <div className="space-y-4">
              {device.telephoneInfo.ip && (
                <div>
                  <h3 className="text-sm font-semibold text-primary">Dirección IP</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{device.telephoneInfo.ip}</p>
                </div>
              )}
              {device.telephoneInfo.firmware && (
                <div>
                  <h3 className="text-sm font-semibold text-primary">Firmware</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{device.telephoneInfo.firmware}</p>
                </div>
              )}
              {device.telephoneInfo.factoryReset && (
                <div>
                  <h3 className="text-sm font-semibold text-primary">Reset de fábrica</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{device.telephoneInfo.factoryReset}</p>
                </div>
              )}
              {device.telephoneInfo.reset && device.telephoneInfo.reset.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-primary">Pasos para reset</h3>
                  <ol className="mt-2 space-y-1">
                    {device.telephoneInfo.reset.map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {shortcutEntries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="rounded-2xl border border-border bg-card p-6 lg:col-span-2"
          >
            <h2 className="mb-4 text-base font-bold text-white">Atajos, trucos y combinaciones</h2>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {shortcutEntries.map((entry, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 rounded-xl border border-border bg-background/40 p-3"
                >
                  <kbd className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-muted font-mono text-xs text-muted-foreground">
                    <KeyRound className="h-3 w-3" />
                  </kbd>
                  <span className="text-sm text-muted-foreground">{entry}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {device.troubleshooting && device.troubleshooting.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="rounded-2xl border border-border bg-card p-6 lg:col-span-2"
          >
            <h2 className="mb-4 text-base font-bold text-white">Solución de problemas</h2>
            <Accordion type="single" collapsible>
              {device.troubleshooting.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-white">{item.title}</AccordionTrigger>
                  <AccordionContent>
                    <ol className="space-y-2">
                      {item.steps.map((step, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {step}
                        </li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        )}

        {device.history && device.history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="rounded-2xl border border-border bg-card p-6 lg:col-span-2"
          >
            <h2 className="mb-4 text-base font-bold text-white">Historial</h2>
            <ul className="space-y-3">
              {device.history.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="shrink-0 text-muted-foreground">
                    {new Date(h.date).toLocaleDateString('es-ES')}
                  </span>
                  <span className="text-white">— {h.event}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
