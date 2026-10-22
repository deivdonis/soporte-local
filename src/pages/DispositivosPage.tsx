import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MonitorSmartphone,
  Monitor,
  Printer,
  HeartPulse,
  Mouse,
  Package,
  ChevronRight,
  ArrowLeft,
  FileDown,
  ClipboardList,
  BookOpen,
  Eye,
} from 'lucide-react';
import { inventarioZebras, inventarioZebrasDoc } from '@/data/inventarioZebras';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { PageHeader } from '@/components/shared/PageHeader';
import { cn } from '@/lib/utils';
import {
  deviceCategories,
  getDevicesByCategory,
  getBrandsByCategory,
  type DeviceCategory,
} from '@/data/devices';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MonitorSmartphone,
  Monitor,
  Printer,
  HeartPulse,
  Mouse,
  Package,
};

export function DispositivosPage() {
  return (
    <div>
      <PageHeader
        icon={MonitorSmartphone}
        title="Dispositivos"
        description="Consulta el catálogo de equipos por categoría"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {deviceCategories.map((cat, i) => {
          const Icon = iconMap[cat.icon] ?? Package;
          const modelCount = getDevicesByCategory(cat.id).length;
          const brandCount = getBrandsByCategory(cat.id).length;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link
                to={`/dispositivos/${cat.id}`}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/30 hover:bg-accent/30"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-base font-bold text-white">{cat.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
                <p className="mt-auto pt-4 text-xs text-muted-foreground">
                  {modelCount} modelos · {brandCount} fabricantes
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function CategoryPage({ category }: { category: DeviceCategory }) {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const categoryInfo = deviceCategories.find((c) => c.id === category);
  const brands = getBrandsByCategory(category);
  const allDevices = getDevicesByCategory(category);
  const devicesFiltered = selectedBrand
    ? allDevices.filter((d) => d.brand === selectedBrand)
    : allDevices;

  return (
    <div>
      <button
        onClick={() => navigate('/dispositivos')}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a categorías
      </button>

      <PageHeader
        icon={iconMap[categoryInfo?.icon ?? ''] ?? Package}
        title={categoryInfo?.name ?? 'Dispositivos'}
        description={categoryInfo?.description}
        actions={
          <>
            <ManualesCategoria category={category} />
            {category === 'impresoras' && <InventarioZebras />}
          </>
        }
      />

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedBrand(null)}
          className={cn(
            'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
            selectedBrand === null
              ? 'border-transparent bg-primary text-primary-foreground shadow-lg shadow-primary/20'
              : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-white'
          )}
        >
          Todos
        </button>
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
              selectedBrand === brand
                ? 'border-transparent bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-white'
            )}
          >
            {brand}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {devicesFiltered.map((device, i) => (
          <motion.div
            key={device.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Link
              to={`/dispositivos/modelo/${device.id}`}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/30 hover:bg-accent/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                  <Monitor className="h-5 w-5 text-primary" />
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-primary">
                {device.brand}
              </p>
              <h3 className="mt-0.5 text-base font-bold text-white">{device.model}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {device.description}
              </p>
              {device.specs.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {device.specs.slice(0, 2).map((spec) => (
                    <span
                      key={spec.label}
                      className="rounded-full bg-accent px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {spec.label}: {spec.value}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </motion.div>
        ))}
        {devicesFiltered.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
            No hay dispositivos para este filtro.
          </p>
        )}
      </div>
    </div>
  );
}

function ManualesCategoria({ category }: { category: DeviceCategory }) {
  const base = import.meta.env.BASE_URL;
  const items = getDevicesByCategory(category).flatMap((d) =>
    (d.configGuides ?? []).map((g, i) => ({
      key: `${d.id}-${i}`,
      title: g.title,
      device: `${d.brand} ${d.model}`,
      description: g.description,
      to: `/dispositivos/modelo/${d.id}?seccion=config-guide-${i}`,
      docUrl: g.docUrl,
    }))
  );
  if (items.length === 0) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <BookOpen className="mr-2 h-4 w-4" />
          Manuales
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto rounded-2xl border-border bg-card">
        <DialogHeader>
          <DialogTitle className="text-white">Manuales</DialogTitle>
          <DialogDescription>Guías de configuración con capturas</DialogDescription>
        </DialogHeader>
        <div className="space-y-2.5">
          {items.map((m) => (
            <div
              key={m.key}
              className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-background/40 p-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">{m.title}</p>
                <p className="text-xs text-muted-foreground">{m.device}</p>
              </div>
              <div className="flex gap-2">
                <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to={m.to}>
                    <Eye className="mr-1.5 h-4 w-4" />
                    Ver
                  </Link>
                </Button>
                {m.docUrl && (
                  <Button asChild size="sm" variant="outline">
                    <a href={`${base}${m.docUrl}`} download>
                      <FileDown className="mr-1.5 h-4 w-4" />
                      Descargar
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InventarioZebras() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90">
          <ClipboardList className="mr-2 h-4 w-4" />
          Inventario
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto rounded-2xl border-border bg-card">
      <DialogHeader>
        <DialogTitle className="text-white">Inventario de Zebras</DialogTitle>
        <DialogDescription>Registro de impresoras de etiquetas por ubicación</DialogDescription>
      </DialogHeader>
      <div className="flex justify-end">
        <a
          href={`${import.meta.env.BASE_URL}${inventarioZebrasDoc}`}
          download
          className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-white"
        >
          <FileDown className="h-4 w-4" />
          Descargar inventario
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="py-2 pr-4 font-semibold">Ubicación / Servicio</th>
              <th className="py-2 font-semibold">Modelo de impresora</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {inventarioZebras.map((item) => (
              <tr key={item.ubicacion}>
                <td className="py-2.5 pr-4 text-white">{item.ubicacion}</td>
                <td className="py-2.5">
                  {item.deviceId ? (
                    <Link to={`/dispositivos/modelo/${item.deviceId}`} className="font-medium text-primary hover:underline">
                      {item.modelo}
                    </Link>
                  ) : (
                    <span className="text-muted-foreground">{item.modelo}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </DialogContent>
    </Dialog>
  );
}
