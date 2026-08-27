export interface GuardiaPerson {
  code: string; name: string; full: string;
  color: string; bg: string; border: string;
}

function swatch(color: string) {
  return { color, bg: `${color}26`, border: `${color}4d` };
}

export const torreRotation: GuardiaPerson[] = [
  { code: 'DAVI', name: 'David', full: 'David', ...swatch('#3b82f6') },
  { code: 'FRAN', name: 'Fran', full: 'Francisco', ...swatch('#10b981') },
  { code: 'ANDREI', name: 'Andrei', full: 'Andrei', ...swatch('#a855f7') },
  { code: 'KIKE', name: 'Kike', full: 'Kike', ...swatch('#f97316') },
];

export const hospitalRotation: GuardiaPerson[] = [
  { code: 'DFER', name: 'David', full: 'David Fernández', ...swatch('#FFFF00') },
  { code: 'MPAR', name: 'María', full: 'María Parra', ...swatch('#10b981') },
  { code: 'SZAM', name: 'Sergio', full: 'Sergio Zamora', ...swatch('#a855f7') },
  { code: 'OFRA', name: 'Óscar', full: 'Óscar Fraile', ...swatch('#f97316') },
  { code: 'FRUB', name: 'Fernando', full: 'Fernando Rubio', ...swatch('#22d3ee') },
];

export const rotationStartDate = new Date(2025, 11, 29); // Lunes 29 Dic 2025

// Días completos entre dos fechas usando componentes UTC de calendario,
// para que no se desalineen por cambios de horario (DST) a mitad de semana.
function diffCalendarDays(from: Date, to: Date): number {
  const msPerDay = 86400000;
  const a = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  const b = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((b - a) / msPerDay);
}

export function getHospitalGuardia(date: Date): GuardiaPerson {
  const diffDays = diffCalendarDays(rotationStartDate, date);
  if (diffDays < 0) return hospitalRotation[0];
  const weekIndex = Math.floor(diffDays / 7);
  return hospitalRotation[weekIndex % hospitalRotation.length];
}

export function getHospitalGuardiaIndex(date: Date): number {
  const diffDays = diffCalendarDays(rotationStartDate, date);
  if (diffDays < 0) return 0;
  const weekIndex = Math.floor(diffDays / 7);
  return weekIndex % hospitalRotation.length;
}

export function getTorreGuardia(date: Date): GuardiaPerson {
  // Serie empieza en julio 2026 con David: DAVI -> FRAN -> ANDREI -> KIKE -> repetir
  const month = date.getMonth();
  const year = date.getFullYear();
  const monthIndex = (month + year * 12) - (6 + 2026 * 12);
  const rotationIndex = ((monthIndex % 4) + 4) % 4;
  return torreRotation[rotationIndex];
}

export function getTorreGuardiaIndex(date: Date): number {
  // Serie empieza en julio 2026 con David: DAVI -> FRAN -> ANDREI -> KIKE -> repetir
  const month = date.getMonth();
  const year = date.getFullYear();
  const monthIndex = (month + year * 12) - (6 + 2026 * 12);
  return ((monthIndex % 4) + 4) % 4;
}

export const guardiaRotation = hospitalRotation;
export function getGuardiaForDate(date: Date): GuardiaPerson { return getHospitalGuardia(date); }
export function getGuardiaIndex(date: Date): number { return getHospitalGuardiaIndex(date); }
