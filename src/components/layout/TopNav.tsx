import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Shield,
  Home,
  MonitorSmartphone,
  BookOpen,
  Network,
  Lightbulb,
  Zap,
  Settings,
  Search,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Phone,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { devices } from '@/data/devices';
import { manuals } from '@/data/manuals';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mainNav = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/dispositivos', label: 'Dispositivos', icon: MonitorSmartphone },
  { to: '/manuales', label: 'Manuales', icon: BookOpen },
  { to: '/redes', label: 'Redes', icon: Network },
  { to: '/sugerencias', label: 'Sugerencias', icon: Lightbulb },
  { to: '/procedimientos', label: 'Procedimientos', icon: Zap },
];

const notifications = [
  { id: 1, title: 'Nueva sugerencia de Fernando Rubio', time: 'Hace 2 h', type: 'info' as const },
  { id: 2, title: 'Sugerencia aprobada: Sistema de tickets', time: 'Hace 5 h', type: 'success' as const },
  { id: 3, title: 'Documentación actualizada', time: 'Hace 1 día', type: 'info' as const },
];

interface SearchResult {
  id: string;
  label: string;
  category: string;
  to: string;
  icon: typeof MonitorSmartphone;
}

function NotificationDot({ type }: { type: 'info' | 'success' }) {
  return (
    <span
      className={cn(
        'mt-1.5 h-2 w-2 shrink-0 rounded-full',
        type === 'success' ? 'bg-emerald-500' : 'bg-sky-500'
      )}
    />
  );
}

export function TopNav({
  open,
  onClose,
  onToggle,
}: {
  open: boolean;
  onClose: () => void;
  onToggle: () => void;
}) {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const navItems = useMemo(
    () => (isAdmin ? [...mainNav, { to: '/admin', label: 'Admin', icon: Settings }] : mainNav),
    [isAdmin]
  );

  const results: SearchResult[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];

    const deviceResults: SearchResult[] = devices
      .filter(
        (d) => d.brand.toLowerCase().includes(q) || d.model.toLowerCase().includes(q)
      )
      .map((d) => ({
        id: `device-${d.id}`,
        label: `${d.brand} ${d.model}`,
        category: d.category,
        to: `/dispositivos/modelo/${d.id}`,
        icon: MonitorSmartphone,
      }));

    const manualResults: SearchResult[] = manuals
      .filter((m) => m.title.toLowerCase().includes(q))
      .map((m) => ({
        id: `manual-${m.id}`,
        label: m.title,
        category: m.category,
        to: `/manuales/${m.id}`,
        icon: BookOpen,
      }));

    return [...deviceResults, ...manualResults].slice(0, 6);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initial = user?.name?.charAt(0).toUpperCase() ?? '?';
  const hasUnread = notifications.length > 0;

  return (
    <>
      <header className="glass fixed left-0 right-0 top-0 z-50 border-b border-border">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 lg:px-8">
          {/* Left: mobile toggle + brand */}
          <div className="flex items-center gap-2 lg:gap-4">
            <button
              type="button"
              onClick={onToggle}
              className="rounded-xl p-2 text-muted-foreground hover:bg-accent/50 hover:text-white lg:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div className="hidden flex-col leading-tight sm:flex">
                <span className="text-sm font-bold text-white">Soporte Local</span>
                <span className="text-xs text-muted-foreground">IT Support Portal</span>
              </div>
            </Link>
          </div>

          {/* Center: desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-white'
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right: search, notifications, profile */}
          <div className="flex items-center gap-2 lg:gap-4">
            <div ref={searchRef} className="relative hidden lg:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Buscar dispositivos, manuales..."
                className="h-10 w-64 rounded-xl border border-border bg-card py-2 pl-9 pr-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />

              {searchOpen && query.trim().length >= 2 && (
                <div className="absolute left-0 right-0 top-full mt-2 max-h-80 overflow-y-auto rounded-xl border border-border bg-popover p-1.5 shadow-lg">
                  {results.length === 0 ? (
                    <p className="px-3 py-4 text-center text-sm text-muted-foreground">
                      No hay resultados
                    </p>
                  ) : (
                    results.map((result) => (
                      <Link
                        key={result.id}
                        to={result.to}
                        onClick={() => {
                          setSearchOpen(false);
                          setQuery('');
                        }}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent/50"
                      >
                        <result.icon className="h-4 w-4 shrink-0 text-primary" />
                        <span className="flex-1 truncate text-white">{result.label}</span>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {result.category}
                        </span>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="relative rounded-xl p-2 text-muted-foreground hover:bg-accent/50 hover:text-white"
                  aria-label="Notificaciones"
                >
                  <Bell className="h-5 w-5" />
                  {hasUnread && (
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((n) => (
                  <DropdownMenuItem key={n.id} className="items-start gap-2">
                    <NotificationDot type={n.type} />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm text-white">{n.title}</span>
                      <span className="text-xs text-muted-foreground">{n.time}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" className="rounded-full outline-none ring-primary/20 focus-visible:ring-2">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {initial}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-white">{user?.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">{user?.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/perfil" className="cursor-pointer">
                    <User className="h-4 w-4" />
                    Mi perfil
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="cursor-pointer">
                      <Settings className="h-4 w-4" />
                      Administración
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-primary focus:text-primary"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Slim support phone bar */}
        <div className="hidden border-t border-border/50 px-8 py-1.5 lg:flex">
          <div className="mx-auto flex w-full max-w-[1600px] items-center justify-end gap-1.5 text-xs text-muted-foreground">
            <Phone className="h-3 w-3" />
            <span>Soporte técnico: 600 000 000</span>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={onClose}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-border bg-card p-4 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <Link to="/" onClick={onClose} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-bold text-white">Soporte Local</span>
                    <span className="text-xs text-muted-foreground">IT Support Portal</span>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl p-2 text-muted-foreground hover:bg-accent/50 hover:text-white"
                  aria-label="Cerrar menú"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-1 flex-col gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-accent/50 hover:text-white'
                      )
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="border-t border-border pt-4">
                <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Soporte técnico
                </p>
                <div className="flex items-center gap-2 rounded-xl bg-accent/30 px-3 py-2.5 text-sm text-white">
                  <Phone className="h-4 w-4 text-primary" />
                  600 000 000
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
