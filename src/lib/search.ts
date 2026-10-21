import { devices, deviceCategories } from '@/data/devices';
import { manuals } from '@/data/manuals';
import { networkDevices, vlans, networkCommands, ipRanges } from '@/data/networks';
import { categoriasTrucos } from '@/data/trucosWindows';
import { datosImportantes } from '@/data/datosImportantes';
import { inventarioZebras } from '@/data/inventarioZebras';

export type SearchKind =
  | 'Dispositivo' | 'Categoría' | 'Manual' | 'Inventario' | 'Red'
  | 'Comando' | 'Truco Windows' | 'Dato importante' | 'Procedimiento';

export interface SearchEntry {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle?: string;
  to: string;
  /** Texto principal (pesa más al puntuar). */
  title_n: string;
  /** Todo el texto buscable, ya normalizado. */
  text_n: string;
}

export function normalize(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function entry(
  id: string, kind: SearchKind, title: string, to: string,
  subtitle: string | undefined, extra: (string | undefined)[]
): SearchEntry {
  return {
    id, kind, title, subtitle, to,
    title_n: normalize(title),
    text_n: normalize([title, subtitle, kind, ...extra].filter(Boolean).join(' · ')),
  };
}

function buildIndex(): SearchEntry[] {
  const out: SearchEntry[] = [];
  const catName = (id: string) => deviceCategories.find((c) => c.id === id)?.name ?? id;

  for (const c of deviceCategories) {
    out.push(entry(`cat-${c.id}`, 'Categoría', c.name, `/dispositivos/${c.id}`, c.description, []));
  }

  for (const d of devices) {
    const to = `/dispositivos/modelo/${d.id}`;
    out.push(entry(`dev-${d.id}`, 'Dispositivo', `${d.brand} ${d.model}`, to, catName(d.category), [
      d.description,
      ...d.specs.map((s) => `${s.label} ${s.value}`),
      ...(d.shortcuts ?? []),
      ...(d.troubleshooting ?? []).flatMap((t) => [t.title, ...t.steps]),
      ...(d.notes ?? []),
      ...(d.history ?? []).map((h) => h.event),
      d.printerInfo?.ip, d.telephoneInfo?.ip,
      ...(d.printerInfo?.consumables ?? []).map((c) => `${c.name} ${c.code}`),
      d.factoryReset?.software, d.factoryReset?.buttons,
      d.bios?.key, d.bios?.bootMenu,
      ...d.drivers.map((x) => x.name),
    ]));

    d.manuals
      .filter((m) => !/^https?:\/\//.test(m.url))
      .forEach((m, i) => out.push(entry(`devman-${d.id}-${i}`, 'Manual', m.name, to, `${d.brand} ${d.model}`, [m.type])));

    (d.configGuides ?? []).forEach((g, i) => out.push(entry(
      `guide-${d.id}-${i}`, 'Manual', `Configuración ${g.title}`,
      `${to}?seccion=config-guide-${i}`, `${d.brand} ${d.model}`,
      [g.description, ...g.figures.flatMap((f) => [f.title, f.caption])],
    )));
  }

  for (const m of manuals) {
    out.push(entry(`man-${m.id}`, 'Manual', m.title, `/manuales/${m.id}`, m.category, [
      m.description, ...m.tags,
      ...(m.steps ?? []).flatMap((s) => [s.title, ...s.content]),
      ...(m.notes ?? []),
    ]));
  }

  inventarioZebras.forEach((z, i) => out.push(entry(
    `inv-${i}`, 'Inventario', `Zebra ${z.modelo} — ${z.ubicacion}`,
    z.deviceId ? `/dispositivos/modelo/${z.deviceId}` : '/dispositivos/impresoras',
    'Inventario de Zebras', ['impresora etiquetas'],
  )));

  for (const n of networkDevices) {
    out.push(entry(`net-${n.id}`, 'Red', n.name, '/redes', `${n.brand} ${n.model} · ${n.ip}`, [n.location, n.type, n.notes]));
  }
  for (const v of vlans) {
    out.push(entry(`vlan-${v.id}`, 'Red', `VLAN ${v.id} ${v.name}`, '/redes', v.subnet, [v.gateway, v.description, v.ports]));
  }
  for (const r of ipRanges) {
    out.push(entry(`ip-${r.range}`, 'Red', r.range, '/redes', r.purpose, []));
  }
  networkCommands.forEach((c, i) => out.push(entry(`cmd-${i}`, 'Comando', c.command, '/redes', c.description, [c.category])));

  for (const cat of categoriasTrucos) {
    const to = `/trucos-windows/${cat.slug}`;
    out.push(entry(`tcat-${cat.slug}`, 'Truco Windows', cat.title, to, cat.description, []));
    cat.trucos.forEach((t, i) => out.push(entry(
      `truco-${cat.slug}-${i}`, 'Truco Windows', t.command ?? t.description, to,
      t.command ? t.description : cat.title, [cat.title],
    )));
  }

  for (const d of datosImportantes) {
    out.push(entry(`dato-${d.id}`, 'Dato importante', d.title, '/datos-importantes',
      d.items.map((it) => `${it.label}: ${it.value}`).join(' · '), [...(d.notes ?? [])]));
  }

  const procs: [string, string, string][] = [
    ['Garantías', '/procedimientos/garantias', 'Gestionar la garantía de impresoras y preparar el correo'],
    ['Irreparables', '/procedimientos/irreparables', 'Generar informe de equipo irreparable'],
    ['Informe mensual', '/informe', 'Informe mensual SharePoint'],
    ['Procedimientos', '/procedimientos', 'Procedimientos operativos y administrativos'],
    ['Datos importantes', '/datos-importantes', 'Códigos, incidencias y datos del puesto'],
  ];
  procs.forEach(([t, to, desc]) => out.push(entry(`proc-${to}`, 'Procedimiento', t, to, desc, [])));

  return out;
}

let index: SearchEntry[] | null = null;

export function search(query: string, limit = 40): SearchEntry[] {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (words.length === 0 || query.trim().length < 2) return [];
  index ??= buildIndex();

  const scored: { e: SearchEntry; score: number }[] = [];
  for (const e of index) {
    if (!words.every((w) => e.text_n.includes(w))) continue;
    let score = 0;
    for (const w of words) {
      if (e.title_n.startsWith(w)) score += 6;
      else if (e.title_n.includes(w)) score += 4;
      else score += 1;
    }
    if (e.kind === 'Dispositivo' || e.kind === 'Manual') score += 1;
    scored.push({ e, score });
  }
  scored.sort((a, b) => b.score - a.score || a.e.title.localeCompare(b.e.title));
  return scored.slice(0, limit).map((s) => s.e);
}
