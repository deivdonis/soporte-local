import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Search,
  Plus,
  Pencil,
  Trash2,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { users } from '@/data/users';
import { devices, deviceCategories, getDevicesByCategory, getBrands } from '@/data/devices';
import { manuals } from '@/data/manuals';
import { hospitalRotation } from '@/data/guardias';

function placeholderToast(toast: ReturnType<typeof useToast>['toast']) {
  toast({ title: 'Función no disponible en esta demo' });
}

function UsuariosTab() {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filtered = users.filter((u) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      u.name.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast({ title: 'Función no disponible en esta demo' });
    setShowForm(false);
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar usuarios..."
            className="pl-9"
          />
        </div>
        <Button
          onClick={() => setShowForm((v) => !v)}
          className="bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo usuario
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-4 grid grid-cols-1 gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2"
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="new-username">Usuario</Label>
            <Input id="new-username" placeholder="usuario" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="new-name">Nombre</Label>
            <Input id="new-name" placeholder="Nombre completo" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="new-email">Email</Label>
            <Input id="new-email" type="email" placeholder="usuario@soportelocal.es" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="new-role">Rol</Label>
            <Input id="new-role" placeholder="admin / user" />
          </div>
          <div className="flex gap-2 sm:col-span-2">
            <Button type="submit" className="bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90">
              Guardar
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
          </div>
        </form>
      )}

      <div className="rounded-2xl border border-border bg-card p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium text-white">{user.username}</TableCell>
                <TableCell className="text-muted-foreground">{user.name}</TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>{user.role}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.phone ?? '—'}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toast({ title: 'Editar usuario', description: user.name })}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      toast({ title: 'Eliminar usuario', description: `¿Eliminar a ${user.name}?` })
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function DispositivosTab() {
  const { toast } = useToast();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {devices.map((device, i) => (
        <motion.div
          key={device.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.03 }}
          className="rounded-2xl border border-border bg-card p-5"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">{device.brand}</p>
          <h3 className="mt-0.5 text-sm font-bold text-white">{device.model}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{device.category}</p>
          <div className="mt-3 flex gap-2">
            <Button variant="outline" size="icon" onClick={() => placeholderToast(toast)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => placeholderToast(toast)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ManualesTab() {
  const { toast } = useToast();
  return (
    <div className="flex flex-col gap-2.5">
      {manuals.map((manual) => (
        <div
          key={manual.id}
          className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{manual.title}</p>
            <p className="text-xs text-muted-foreground">
              {manual.category} · {manual.author} · {new Date(manual.date).toLocaleDateString('es-ES')}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="ghost" size="icon" onClick={() => placeholderToast(toast)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => placeholderToast(toast)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

function MarcasTab() {
  const { toast } = useToast();
  const brands = getBrands();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {brands.map((brand) => {
        const count = devices.filter((d) => d.brand === brand).length;
        return (
          <div key={brand} className="flex items-center justify-between rounded-2xl border border-border bg-card p-5">
            <div>
              <p className="text-sm font-bold text-white">{brand}</p>
              <p className="text-xs text-muted-foreground">{count} dispositivos</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => placeholderToast(toast)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}

function CategoriasTab() {
  const { toast } = useToast();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {deviceCategories.map((cat) => (
        <div key={cat.id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-5">
          <div>
            <p className="text-sm font-bold text-white">{cat.name}</p>
            <p className="text-xs text-muted-foreground">{getDevicesByCategory(cat.id).length} dispositivos</p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => placeholderToast(toast)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

function GuardiasTab() {
  const { toast } = useToast();
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button
          onClick={() => placeholderToast(toast)}
          className="bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Añadir guardia
        </Button>
      </div>
      <div className="flex flex-col gap-2.5">
        {hospitalRotation.map((person) => (
          <div
            key={person.code}
            className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold"
                style={{ color: person.color, backgroundColor: person.bg, borderColor: person.border }}
              >
                {person.code.slice(0, 2)}
              </span>
              <div>
                <p className="text-sm font-medium text-white">{person.full}</p>
                <p className="text-xs text-muted-foreground">{person.code}</p>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button variant="ghost" size="icon" onClick={() => placeholderToast(toast)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => placeholderToast(toast)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminPage() {
  return (
    <div>
      <PageHeader icon={Settings} title="Administración" description="Gestión de usuarios, dispositivos y contenidos" />

      <Tabs defaultValue="usuarios">
        <TabsList>
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
          <TabsTrigger value="dispositivos">Dispositivos</TabsTrigger>
          <TabsTrigger value="manuales">Manuales</TabsTrigger>
          <TabsTrigger value="marcas">Marcas</TabsTrigger>
          <TabsTrigger value="categorias">Categorías</TabsTrigger>
          <TabsTrigger value="guardias">Guardias</TabsTrigger>
        </TabsList>

        <TabsContent value="usuarios">
          <UsuariosTab />
        </TabsContent>
        <TabsContent value="dispositivos">
          <DispositivosTab />
        </TabsContent>
        <TabsContent value="manuales">
          <ManualesTab />
        </TabsContent>
        <TabsContent value="marcas">
          <MarcasTab />
        </TabsContent>
        <TabsContent value="categorias">
          <CategoriasTab />
        </TabsContent>
        <TabsContent value="guardias">
          <GuardiasTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
