import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  MonitorSmartphone,
  LayoutGrid,
  BookOpen,
  ClipboardList,
  Network,
  Terminal,
  Wrench,
  Star,
  Zap,
  CornerDownLeft,
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { search, type SearchKind, type SearchEntry } from '@/lib/search';

const kindIcon: Record<SearchKind, React.ComponentType<{ className?: string }>> = {
  Dispositivo: MonitorSmartphone,
  'Categoría': LayoutGrid,
  Manual: BookOpen,
  Inventario: ClipboardList,
  Red: Network,
  Comando: Terminal,
  'Truco Windows': Wrench,
  'Dato importante': Star,
  Procedimiento: Zap,
};

const kindOrder: SearchKind[] = [
  'Dispositivo', 'Manual', 'Inventario', 'Categoría', 'Red', 'Comando',
  'Truco Windows', 'Dato importante', 'Procedimiento',
];

export function GlobalSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => search(query), [query]);

  // Agrupa por tipo manteniendo el orden de relevancia dentro de cada grupo.
  const groups = useMemo(() => {
    const map = new Map<SearchKind, SearchEntry[]>();
    for (const r of results) {
      if (!map.has(r.kind)) map.set(r.kind, []);
      map.get(r.kind)!.push(r);
    }
    return kindOrder.filter((k) => map.has(k)).map((k) => ({ kind: k, items: map.get(k)! }));
  }, [results]);

  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => setOpen(false), [location.pathname, location.search]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const go = (r: SearchEntry) => {
    setOpen(false);
    setQuery('');
    navigate(r.to);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && flat[active]) {
      e.preventDefault();
      go(flat[active]);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden h-10 w-64 items-center gap-2 rounded-xl border border-border bg-card px-3 text-sm text-muted-foreground transition-colors hover:border-primary/30 lg:flex"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Buscar en todo...</span>
        <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">Ctrl K</kbd>
      </button>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl p-2 text-muted-foreground hover:bg-accent/50 hover:text-white lg:hidden"
        aria-label="Buscar"
      >
        <Search className="h-5 w-5" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="top-[10%] max-w-2xl translate-y-0 gap-0 overflow-hidden rounded-2xl border-border bg-card p-0 data-[state=closed]:slide-out-to-top-[5%] data-[state=open]:slide-in-from-top-[5%] [&>button]:hidden">
          <DialogTitle className="sr-only">Buscar</DialogTitle>
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className="h-5 w-5 shrink-0 text-primary" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKey}
              placeholder="Dispositivo, manual, IP, comando, ubicación..."
              className="h-14 flex-1 bg-transparent text-base text-white placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground hover:text-white"
            >
              Esc
            </button>
          </div>

          <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-2">
            {query.trim().length < 2 ? (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                Escribe al menos 2 letras. Busca en dispositivos, manuales, inventario, redes, comandos, trucos de Windows y datos importantes.
              </p>
            ) : flat.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                No hay resultados para «{query}»
              </p>
            ) : (
              groups.map((g) => (
                <div key={g.kind} className="mb-2">
                  <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {g.kind}
                  </p>
                  {g.items.map((r) => {
                    const idx = flat.indexOf(r);
                    const Icon = kindIcon[r.kind];
                    return (
                      <button
                        key={r.id}
                        type="button"
                        data-index={idx}
                        onClick={() => go(r)}
                        onMouseMove={() => setActive(idx)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left',
                          idx === active ? 'bg-primary/15' : 'hover:bg-accent/50'
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0 text-primary" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm text-white">{r.title}</span>
                          {r.subtitle && (
                            <span className="block truncate text-xs text-muted-foreground">{r.subtitle}</span>
                          )}
                        </span>
                        {idx === active && <CornerDownLeft className="h-4 w-4 shrink-0 text-muted-foreground" />}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
