import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Monitor,
  Download,
  BookOpen,
  CheckCircle2,
  KeyRound,
  AlertTriangle,
  FileDown,
  ListChecks,
  Cpu,
  Image as ImageIcon,
  Phone,
  Wrench,
  History,
  StickyNote,
  RotateCcw,
  ChevronDown,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { getDeviceById, deviceCategories } from '@/data/devices';

interface Section {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  warning?: boolean;
  content: React.ReactNode;
}

function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-2">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          {step}
        </li>
      ))}
    </ol>
  );
}

export function DeviceDetailPage() {
  const { id } = useParams();
  const device = getDeviceById(id ?? '');
  const [openSection, setOpenSection] = useState<string | null>(null);

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
    if (z.feed) shortcutEntries.push(`Avance: ${z.feed}`);
    if (z.pause) shortcutEntries.push(`Pausa: ${z.pause}`);
    if (z.sensor) shortcutEntries.push(`Sensor: ${z.sensor}`);
    if (z.configLabel) shortcutEntries.push(`Etiqueta de configuración: ${z.configLabel}`);
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
  const isLocal = (url: string) => !/^https?:\/\//.test(url);
  const resolveUrl = (url: string) => (isLocal(url) ? `${import.meta.env.BASE_URL}${url}` : url);
  const isZebra = device.brand === 'Zebra';
  const zebraProcedureLines = device.zebraInfo?.combinations ?? [];

  const factoryResetContent = device.factoryReset && (
    <div className="space-y-3">
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground">Por software</h4>
        <p className="mt-1 text-sm text-white/90">{device.factoryReset.software}</p>
      </div>
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground">Por botones</h4>
        <p className="mt-1 text-sm text-white/90">{device.factoryReset.buttons}</p>
      </div>
    </div>
  );

  const sections: Section[] = [];

  if (isZebra && zebraProcedureLines.length > 0) {
    sections.push({
      id: 'reset-calibrar',
      label: 'Reset y calibrar',
      icon: AlertTriangle,
      warning: true,
      content: <StepList steps={zebraProcedureLines} />,
    });
  }

  sections.push({
    id: 'specs',
    label: 'Especificaciones',
    icon: ListChecks,
    content: (
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
    ),
  });

  if (device.configGuide) {
    const guide = device.configGuide;
    sections.push({
      id: 'config-guide',
      label: guide.title,
      icon: ImageIcon,
      content: (
        <div>
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            {guide.description && <p className="text-sm text-muted-foreground">{guide.description}</p>}
            {firstManual && isLocal(firstManual.url) && (
              <Button asChild variant="outline" size="sm">
                <a href={resolveUrl(firstManual.url)} download>
                  <FileDown className="mr-2 h-4 w-4" />
                  Descargar manual
                </a>
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {guide.figures.map((fig) => (
              <figure key={fig.image} className="overflow-hidden rounded-xl border border-border bg-background/40">
                <a href={resolveUrl(fig.image)} target="_blank" rel="noreferrer">
                  <img
                    src={resolveUrl(fig.image)}
                    alt={fig.title}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover transition-opacity hover:opacity-90"
                  />
                </a>
                <figcaption className="p-3">
                  <p className="text-sm font-semibold text-primary">{fig.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{fig.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      ),
    });
  }

  if (device.bios) {
    const bios = device.bios;
    sections.push({
      id: 'bios',
      label: 'Acceso a la BIOS',
      icon: Cpu,
      content: (
        <div className="space-y-4">
          <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-500/10 p-3">
            <h3 className="text-sm font-semibold text-yellow-400">Acceso a la BIOS</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {bios.key || 'Ver instrucciones específicas del modelo'}
            </p>
          </div>
          {bios.bootMenu && (
            <div>
              <h3 className="text-sm font-semibold text-primary">Menú de arranque</h3>
              <p className="mt-1 text-sm text-muted-foreground">{bios.bootMenu}</p>
            </div>
          )}
          {bios.recovery && (
            <div>
              <h3 className="text-sm font-semibold text-primary">Recuperación</h3>
              <p className="mt-1 text-sm text-muted-foreground">{bios.recovery}</p>
            </div>
          )}
        </div>
      ),
    });
  }

  if (factoryResetContent) {
    sections.push({
      id: 'factory-reset',
      label: 'Restablecer de fábrica',
      icon: RotateCcw,
      content: factoryResetContent,
    });
  }

  if (device.telephoneInfo) {
    const t = device.telephoneInfo;
    sections.push({
      id: 'telefono',
      label: 'Información del teléfono',
      icon: Phone,
      content: (
        <div className="space-y-4">
          {t.ip && (
            <div>
              <h3 className="text-sm font-semibold text-primary">Dirección IP</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.ip}</p>
            </div>
          )}
          {t.firmware && (
            <div>
              <h3 className="text-sm font-semibold text-primary">Firmware</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.firmware}</p>
            </div>
          )}
          {t.factoryReset && (
            <div>
              <h3 className="text-sm font-semibold text-primary">Reset de fábrica</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.factoryReset}</p>
            </div>
          )}
          {t.reset && t.reset.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-primary">Pasos para reset</h3>
              <StepList steps={t.reset} />
            </div>
          )}
        </div>
      ),
    });
  }

  if (shortcutEntries.length > 0) {
    sections.push({
      id: 'atajos',
      label: 'Atajos y trucos',
      icon: KeyRound,
      content: (
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
      ),
    });
  }

  if (device.troubleshooting && device.troubleshooting.length > 0) {
    const items = device.troubleshooting;
    sections.push({
      id: 'problemas',
      label: 'Solución de problemas',
      icon: Wrench,
      content: (
        <Accordion type="single" collapsible>
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-white">{item.title}</AccordionTrigger>
              <AccordionContent>
                <StepList steps={item.steps} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ),
    });
  }

  if (device.notes && device.notes.length > 0) {
    sections.push({
      id: 'notas',
      label: 'Notas',
      icon: StickyNote,
      content: <StepList steps={device.notes} />,
    });
  }

  if (device.history && device.history.length > 0) {
    const history = device.history;
    sections.push({
      id: 'historial',
      label: 'Historial',
      icon: History,
      content: (
        <ul className="space-y-3">
          {history.map((h, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="shrink-0 text-muted-foreground">
                {new Date(h.date).toLocaleDateString('es-ES')}
              </span>
              <span className="text-white">— {h.event}</span>
            </li>
          ))}
        </ul>
      ),
    });
  }

  const current = sections.find((s) => s.id === openSection);

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
            {isZebra && (
              <Button asChild variant="outline">
                <a href={`${import.meta.env.BASE_URL}plantillas/zebra-autoconfig.drs`} download>
                  <FileDown className="mr-2 h-4 w-4" />
                  Archivo DRS
                </a>
              </Button>
            )}
            {firstManual && (
              <Button asChild className="bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90">
                <a
                  href={resolveUrl(firstManual.url)}
                  {...(isLocal(firstManual.url) ? { download: true } : { target: '_blank', rel: 'noreferrer' })}
                >
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

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {sections.map((s) => {
          const Icon = s.icon;
          const active = s.id === openSection;
          return (
            <button
              key={s.id}
              onClick={() => setOpenSection(active ? null : s.id)}
              className={cn(
                'flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left text-sm font-medium transition-colors',
                active
                  ? s.warning
                    ? 'border-yellow-500 bg-yellow-500/15 text-yellow-300'
                    : 'border-primary bg-primary/15 text-white'
                  : s.warning
                    ? 'border-yellow-500/40 bg-yellow-500/5 text-yellow-400 hover:bg-yellow-500/10'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-white'
              )}
            >
              <Icon className={cn('h-4 w-4 shrink-0', s.warning ? 'text-yellow-400' : 'text-primary')} />
              <span className="min-w-0 flex-1 truncate">{s.label}</span>
              <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform', active && 'rotate-180')} />
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'mt-4 rounded-2xl border bg-card p-6',
              current.warning ? 'border-l-4 border-yellow-500 bg-yellow-500/10' : 'border-border'
            )}
          >
            <h2
              className={cn(
                'mb-4 text-base font-bold',
                current.warning ? 'uppercase tracking-wide text-yellow-400' : 'text-white'
              )}
            >
              {current.label}
            </h2>
            {current.content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
