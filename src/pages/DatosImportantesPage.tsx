import { Star } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { datosImportantes } from '@/data/datosImportantes';

export function DatosImportantesPage() {
  return (
    <div>
      <PageHeader icon={Star} title="Datos importantes" description="Códigos, incidencias y contactos del puesto" />

      <div className="space-y-6 rounded-2xl border border-border bg-card p-6">
        {datosImportantes.map((dato) => (
          <section key={dato.id}>
            <h3 className="text-base font-bold text-white">{dato.title}</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {dato.items.map((item) => (
                <li key={item.label}>
                  {item.label}: <span className="text-white">{item.value}</span>
                </li>
              ))}
              {dato.notes?.map((note, ni) => (
                <li key={ni} className="text-xs italic">
                  {note}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
