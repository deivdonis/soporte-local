import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User as UserIcon, LogOut, KeyRound } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-3 last:border-b-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  );
}

export function ProfilePage() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChangePassword = () => {
    toast({
      title: 'Función no disponible',
      description: 'Contacta con el administrador del sistema.',
    });
  };

  const lastLogin = user.lastLogin
    ? new Date(user.lastLogin).toLocaleString('es-ES')
    : 'Sin datos';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader icon={UserIcon} title="Mi perfil" description="Gestiona tu información de cuenta" />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl border border-border bg-card lg:col-span-1">
          <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
            <Avatar className="h-24 w-24 text-2xl">
              <AvatarFallback className="bg-primary/10 text-3xl font-bold text-primary">
                {user.name[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-bold text-white">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Badge variant="secondary" className="mt-1">
              {user.role === 'admin' ? 'Administrador' : 'Técnico'}
            </Badge>

            <Button
              variant="outline"
              onClick={handleLogout}
              className="mt-4 w-full rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border bg-card lg:col-span-2">
          <CardContent className="flex flex-col gap-6 p-6">
            <div>
              <h2 className="mb-2 text-sm font-semibold text-white">Información de la cuenta</h2>
              <div className="flex flex-col">
                <InfoRow label="Usuario" value={user.username} />
                <InfoRow label="Email" value={user.email} />
                <InfoRow label="Teléfono" value={user.phone ?? 'Sin datos'} />
                <InfoRow label="Departamento" value={user.department ?? 'Sin datos'} />
                <InfoRow label="Último acceso" value={lastLogin} />
              </div>
            </div>

            <div>
              <h2 className="mb-3 text-sm font-semibold text-white">Seguridad</h2>
              <Button
                variant="outline"
                onClick={handleChangePassword}
                className="rounded-xl border-border"
              >
                <KeyRound className="mr-2 h-4 w-4" />
                Cambiar contraseña
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
