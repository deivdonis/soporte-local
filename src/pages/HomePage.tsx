import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MonitorSmartphone,
  BookOpen,
  Network,
  Lightbulb,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Zap,
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
    label: 'Manuales',
    to: '/manuales',
    icon: BookOpen,
    classes: 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
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
    label: 'Sugerencias',
    to: '/sugerencias',
    icon: Lightbulb,
    classes: 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/20',
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

function GuardiaCalendar({
  title,
  headerLabel,
  headerValue,
  headerColor,
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

        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{headerLabel}</p>
          <p className="text-2xl font-extrabold uppercase" style={{ color: headerColor }}>
            {headerValue}
          </p>
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
  const [torreViewDate, setTorreViewDate] = useState(() => new Date());

  const today = new Date();
  const currentHospitalGuardia = getHospitalGuardia(today);
  const currentTorreGuardia = getTorreGuardia(torreViewDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-8"
    >
      <div>
        <h1 className="mb-4 text-xl font-bold text-white">Acceso rápido</h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {quickAccess.map((item, i) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link
                to={item.to}
                className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center transition-transform hover:scale-[1.02] hover:border-primary/30 hover:bg-accent/30"
              >
                <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl ring-1', item.classes)}>
                  <item.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-white">{item.label}</span>
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
          <GuardiaCalendar
            title="Guardia Virgen de la Torre"
            headerLabel="Le toca este mes a"
            headerValue={currentTorreGuardia.full}
            headerColor={currentTorreGuardia.color}
            viewDate={torreViewDate}
            onPrev={() => setTorreViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
            onNext={() => setTorreViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
            getPerson={getTorreGuardia}
            legend={torreRotation}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
