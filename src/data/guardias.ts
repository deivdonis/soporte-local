export interface GuardiaPerson {
  code: string; name: string; full: string;
  color: string; bg: string; border: string;
}

const neutralColor = '#94a3b8';
const neutralBg = 'rgba(148,163,184,0.10)';
const neutralBorder = 'rgba(148,163,184,0.25)';

export const torreRotation: GuardiaPerson[] = [
  { code: 'DAVI', name: 'David', full: 'David', color: neutralColor, bg: neutralBg, border: neutralBorder },
  { code: 'FRAN', name: 'Fran', full: 'Francisco', color: neutralColor, bg: neutralBg, border: neutralBorder },
  { code: 'NACHO', name: 'Nacho', full: 'Nacho', color: neutralColor, bg: neutralBg, border: neutralBorder },
  { code: 'KIKE', name: 'Kike', full: 'Kike', color: neutralColor, bg: neutralBg, border: neutralBorder },
];

export const hospitalRotation: GuardiaPerson[] = [
  { code: 'DFER', name: 'David', full: 'David Fernández', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)' },
  { code: 'MPAR', name: 'María', full: 'María Parra', color: neutralColor, bg: neutralBg, border: neutralBorder },
  { code: 'SZAM', name: 'Sergio', full: 'Sergio Zamora', color: neutralColor, bg: neutralBg, border: neutralBorder },
  { code: 'OFRA', name: 'Óscar', full: 'Óscar Fraile', color: neutralColor, bg: neutralBg, border: neutralBorder },
  { code: 'FRUB', name: 'Fernando', full: 'Fernando Rubio', color: neutralColor, bg: neutralBg, border: neutralBorder },
];

export const rotationStartDate = new Date(2025, 11, 29); // Lunes 29 Dic 2025

export function getHospitalGuardia(date: Date): GuardiaPerson {
  const msPerDay = 86400000;
  const start = new Date(rotationStartDate);
  start.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((d.getTime() - start.getTime()) / msPerDay);
  if (diffDays < 0) return hospitalRotation[0];
  const weekIndex = Math.floor(diffDays / 7);
  return hospitalRotation[weekIndex % hospitalRotation.length];
}

export function getHospitalGuardiaIndex(date: Date): number {
  const msPerDay = 86400000;
  const start = new Date(rotationStartDate);
  start.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((d.getTime() - start.getTime()) / msPerDay);
  if (diffDays < 0) return 0;
  const weekIndex = Math.floor(diffDays / 7);
  return weekIndex % hospitalRotation.length;
}

export function getTorreGuardia(date: Date): GuardiaPerson {
  const monthIndex = (date.getMonth() + date.getFullYear() * 12) - (6 + 2026 * 12);
  const rotationIndex = ((monthIndex % 4) + 4) % 4;
  return torreRotation[rotationIndex];
}

export function getTorreGuardiaIndex(date: Date): number {
  const monthIndex = (date.getMonth() + date.getFullYear() * 12) - (6 + 2026 * 12);
  return ((monthIndex % 4) + 4) % 4;
}

export const guardiaRotation = hospitalRotation;
export function getGuardiaForDate(date: Date): GuardiaPerson { return getHospitalGuardia(date); }
export function getGuardiaIndex(date: Date): number { return getHospitalGuardiaIndex(date); }
