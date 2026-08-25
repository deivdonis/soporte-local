const madridHolidays: Record<string, string> = {};

function addHoliday(year: number, month: number, day: number, name: string) {
  const key = `${year}-${month}-${day}`;
  madridHolidays[key] = name;
}

const years = [2025, 2026, 2027];

for (const year of years) {
  addHoliday(year, 0, 1, 'Año Nuevo');
  addHoliday(year, 0, 6, 'Reyes');
  addHoliday(year, 2, year === 2025 ? 20 : 19, 'San José');
  addHoliday(year, 4, 1, 'Fiesta del Trabajador');
  addHoliday(year, 4, 2, 'Día de la Comunidad de Madrid');
  addHoliday(year, 4, 15, 'San Isidro');
  addHoliday(year, 7, 15, 'Asunción de la Virgen');
  addHoliday(year, 9, 12, 'Fiesta Nacional de España');
  addHoliday(year, 10, 1, 'Todos los Santos');
  addHoliday(year, 11, 6, 'Día de la Constitución');
  addHoliday(year, 11, 8, 'Inmaculada Concepción');
  addHoliday(year, 11, 25, 'Navidad');
}

export function isMadridHoliday(date: Date): string | null {
  const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  return madridHolidays[key] || null;
}

export function getMadridHolidaysForMonth(year: number, month: number): Array<{ day: number; name: string }> {
  const results: Array<{ day: number; name: string }> = [];
  for (const key of Object.keys(madridHolidays)) {
    const [y, m, d] = key.split('-').map(Number);
    if (y === year && m === month) {
      results.push({ day: d, name: madridHolidays[key] });
    }
  }
  return results.sort((a, b) => a.day - b.day);
}
