import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MonitorSmartphone,
  Network,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Zap,
  Wrench,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  hospitalRotation,
  torreRotation,
  getHospitalGuardia,
  getTorreGuardia,
} from '@/data/guardias';
import { isMadridHoliday } from '@/data/holidays';

const DAY_LABELS = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];

const quickAccess = [
  {
    label: 'Dispositivos',
    to: '/dispositivos',
    icon: MonitorSmartphone,
    classes: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
  },
  {
    label: 'Redes',
    to: '/redes',
    icon: Network,
    classes: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
  },
  {
    label: 'Procedimientos',
    to: '/procedimientos',
    icon: Zap,
    classes: 'bg-pink-500/10 text-pink-400 ring-pink-500/20',
  },
  {
    label: 'Windows',
    to: '/trucos-windows',
    icon: Wrench,
    classes: 'bg-cyan-500/10 text-cyan-400 ring-cyan-500/20',
  },
];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildMonthCells(viewDate: Date): (Date | null)[] {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = (firstDay.getDay() + 6) % 7;

  const cells: (Date | null)[] = [];
  for (let i = 0; i < leadingBlanks; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}

function monthLabel(date: Date) {
  const label = date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

interface Person {
  code: string;
  name: string;
  full: string;
  color: string;
  bg: string;
  border: string;
}

function TorreTurnosList({ legend }: { legend: Person[] }) {
  const today = new Date();

  const turnos = useMemo(() => {
    const list: { key: string; label: string; person: Person; sinTurno: boolean }[] = [];
    for (let i = -2; i <= 9; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
      const person = getTorreGuardia(date);
      list.push({
        key: `${date.getFullYear()}-${date.getMonth()}`,
        label: monthLabel(date),
        person,
        sinTurno: date.getMonth() === 7,
      });
    }
    return list;
  }, [today.getFullYear(), today.getMonth()]);

  const turnoActual = getTorreGuardia(today);
  const esAgostoActual = today.getMonth() === 7;

  return (
    <Card className="rounded-2xl border border-border bg-card">
      <CardHeader className="flex flex-col gap-4 pb-2">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <CalendarDays className="h-4 w-4 text-primary" />
          Guardia Virgen de la Torre
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Le toca este mes a</p>
          {esAgostoActual ? (
            <p className="text-2xl font-extrabold uppercase text-muted-foreground">
              Nadie (continúa en septiembre)
            </p>
          ) : (
            <p className="text-2xl font-extrabold uppercase" style={{ color: turnoActual.color }}>
              {turnoActual.full}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="flex flex-col divide-y divide-border">
          {turnos.map((t) => {
            const isCurrent = t.label === monthLabel(today);
            return (
              <div
                key={t.key}
                className={cn(
                  'flex items-center justify-between gap-3 py-3',
                  isCurrent && 'rounded-xl bg-accent/30 px-3'
                )}
              >
                <span className={cn('text-sm', isCurrent ? 'font-bold text-white' : 'text-muted-foreground')}>
                  {t.label}
                </span>
                {t.sinTurno ? (
                  <span className="text-xs italic text-muted-foreground">Sin turno (continúa en septiembre)</span>
                ) : (
                  <span
                    className="rounded-full px-3 py-1 text-xs font-bold uppercase"
                    style={{ backgroundColor: t.person.bg, color: t.person.color, border: `1px solid ${t.person.border}` }}
                  >
                    {t.person.full}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
          {legend.map((p) => (
            <div key={p.code} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
              {p.full}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function GuardiaCalendar({
  title,
  headerLabel,
  headerValue,
  headerColor,
  nextLabel,
  nextValue,
  nextColor,
  viewDate,
  onPrev,
  onNext,
  getPerson,
  legend,
}: {
  title: string;
  headerLabel: string;
  headerValue: string;
  headerColor: string;
  nextLabel?: string;
  nextValue?: string;
  nextColor?: string;
  viewDate: Date;
  onPrev: () => void;
  onNext: () => void;
  getPerson: (date: Date) => Person;
  legend: Person[];
}) {
  const today = new Date();
  const cells = useMemo(() => buildMonthCells(viewDate), [viewDate]);

  return (
    <Card className="rounded-2xl border border-border bg-card">
      <CardHeader className="flex flex-col gap-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <CalendarDays className="h-4 w-4 text-primary" />
            {title}
          </div>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{headerLabel}</p>
            <p className="text-2xl font-extrabold uppercase" style={{ color: headerColor }}>
              {headerValue}
            </p>
          </div>
          {nextValue && (
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{nextLabel}</p>
              <p className="text-base font-bold uppercase" style={{ color: nextColor }}>
                {nextValue}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onPrev}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-primary/30 hover:text-white"
            aria-label="Mes anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <p className="text-sm font-bold text-white">{monthLabel(viewDate)}</p>
          <button
            type="button"
            onClick={onNext}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-primary/30 hover:text-white"
            aria-label="Mes siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-muted-foreground">
          {DAY_LABELS.map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((date, i) => {
            if (!date) return <div key={`blank-${i}`} className="aspect-square" />;

            const holiday = isMadridHoliday(date);
            const person = getPerson(date);
            const isToday = isSameDay(date, today);
            const dow = date.getDay();
            const isWeekend = dow === 0 || dow === 6;

            const style: React.CSSProperties = holiday
              ? { background: 'rgba(245, 158, 11, 0.35)', borderColor: 'rgba(245, 158, 11, 0.5)' }
              : { background: isWeekend ? person.bg.replace('26)', '4d)') : person.bg, borderColor: person.border };

            if (isToday) {
              style.boxShadow = `inset 0 0 0 2px ${person.color}`;
            }

            return (
              <div
                key={date.toISOString()}
                className={cn(
                  'flex aspect-square flex-col items-center justify-center rounded-lg border text-[11px]',
                  isWeekend ? 'border-dashed' : 'border-solid',
                  holiday && 'text-white'
                )}
                style={style}
                title={holiday ?? undefined}
              >
                <span className="font-semibold">{date.getDate()}</span>
                <span className="text-[9px] font-medium opacity-80">{person.code}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
          {legend.map((p) => (
            <div key={p.code} className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              {p.code}
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            Festivo Madrid
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function HomePage() {
  const [hospitalViewDate, setHospitalViewDate] = useState(() => new Date());

  const today = new Date();
  const currentHospitalGuardia = getHospitalGuardia(today);
  const nextWeekDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  const nextHospitalGuardia = getHospitalGuardia(nextWeekDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-8"
    >
      <div>
        <h1 className="mb-4 text-xl font-bold text-white">Acceso rápido</h1>
        <div className="grid grid-cols-4 gap-3 sm:flex sm:flex-wrap">
          {quickAccess.map((item, i) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="aspect-square sm:w-24"
            >
              <Link
                to={item.to}
                className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-2 text-center transition-transform hover:scale-[1.02] hover:border-primary/30 hover:bg-accent/30"
              >
                <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl ring-1', item.classes)}>
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-white">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <GuardiaCalendar
            title="Guardia Hospital (NNHH)"
            headerLabel="Le toca esta semana a"
            headerValue={currentHospitalGuardia.code}
            headerColor={currentHospitalGuardia.color}
            nextLabel="La semana que viene"
            nextValue={nextHospitalGuardia.code}
            nextColor={nextHospitalGuardia.color}
            viewDate={hospitalViewDate}
            onPrev={() =>
              setHospitalViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
            }
            onNext={() =>
              setHospitalViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
            }
            getPerson={getHospitalGuardia}
            legend={hospitalRotation}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <TorreTurnosList legend={torreRotation} />
        </motion.div>
      </div>
    </motion.div>
  );
}
