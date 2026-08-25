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
} from 'lucide-react';
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
