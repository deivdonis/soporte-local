import { motion } from 'framer-motion';
import { Wrench, Copy, Network, Users, Settings, HardDrive, Keyboard, ShieldAlert } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { useToast } from '@/hooks/use-toast';

interface Truco {
  command?: string;
  description: string;
}

interface Categoria {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  trucos: Truco[];
}

const categorias: Categoria[] = [
  {
    title: 'Red y conectividad',
    icon: Network,
    trucos: [
      { command: 'ipconfig /all', description: 'Muestra la configuración IP completa de todos los adaptadores.' },
      { command: 'ipconfig /release && ipconfig /renew', description: 'Libera y renueva la IP asignada por DHCP.' },
      { command: 'ipconfig /flushdns', description: 'Vacía la caché DNS local.' },
      { command: 'nslookup <dominio>', description: 'Consulta la resolución DNS de un dominio.' },
      { command: 'ping -t <ip>', description: 'Hace ping continuo a una IP hasta cancelarlo con Ctrl+C.' },
      { command: 'tracert <ip>', description: 'Traza la ruta de red hasta un destino, salto a salto.' },
      { command: 'netstat -ano', description: 'Lista las conexiones activas y el PID del proceso que las usa.' },
      { command: 'netsh winsock reset', description: 'Reinicia la pila Winsock; requiere reinicio del equipo.' },
      { command: 'netsh int ip reset', description: 'Restablece la configuración TCP/IP a valores por defecto.' },
      { command: 'arp -a', description: 'Muestra la tabla ARP con las IPs y MACs vistas en la red local.' },
      { command: 'route print', description: 'Muestra la tabla de rutas del equipo.' },
    ],
  },
  {
    title: 'Usuarios y permisos',
    icon: Users,
    trucos: [
      { command: 'net user', description: 'Lista los usuarios locales del equipo.' },
      { command: 'net user <usuario> /active:yes', description: 'Reactiva una cuenta local deshabilitada.' },
      { command: 'net localgroup administradores <usuario> /add', description: 'Añade un usuario al grupo de administradores locales.' },
      { command: 'whoami /all', description: 'Muestra el usuario actual, sus grupos y privilegios.' },
      { command: 'gpupdate /force', description: 'Fuerza la actualización de directivas de grupo del dominio.' },
      { command: 'gpresult /r', description: 'Muestra las directivas de grupo aplicadas al usuario/equipo.' },
      { command: 'rundll32.exe keymgr.dll,KRShowKeyMgr', description: 'Abre el gestor de credenciales almacenadas (Administrador de credenciales).' },
    ],
  },
  {
    title: 'Sistema y mantenimiento',
    icon: Settings,
    trucos: [
      { command: 'sfc /scannow', description: 'Escanea y repara archivos de sistema corruptos.' },
      { command: 'DISM /Online /Cleanup-Image /RestoreHealth', description: 'Repara la imagen de Windows cuando sfc no es suficiente.' },
      { command: 'chkdsk C: /f /r', description: 'Comprueba y repara errores del disco en el próximo reinicio.' },
      { command: 'shutdown /r /t 0', description: 'Reinicia el equipo inmediatamente.' },
      { command: 'shutdown /a', description: 'Cancela un apagado/reinicio programado.' },
      { command: 'taskkill /IM <proceso.exe> /F', description: 'Fuerza el cierre de un proceso por nombre.' },
      { command: 'msconfig', description: 'Abre la configuración del sistema (arranque, servicios, inicio).' },
      { command: 'services.msc', description: 'Abre el panel de gestión de servicios de Windows.' },
      { command: 'eventvwr.msc', description: 'Abre el Visor de eventos para revisar errores del sistema.' },
      { command: 'cleanmgr', description: 'Abre el Liberador de espacio en disco.' },
      { command: 'winver', description: 'Muestra la versión y build exacta de Windows instalada.' },
    ],
  },
  {
    title: 'Discos y almacenamiento',
    icon: HardDrive,
    trucos: [
      { command: 'diskmgmt.msc', description: 'Abre el Administrador de discos gráfico.' },
      { command: 'diskpart', description: 'Abre la utilidad de particionado por línea de comandos.' },
      { command: 'wmic diskdrive get status,model', description: 'Muestra el estado SMART y modelo de los discos instalados.' },
      { command: 'defrag C: /O', description: 'Optimiza (desfragmenta o TRIM en SSD) la unidad C.' },
    ],
  },
  {
    title: 'Seguridad',
    icon: ShieldAlert,
    trucos: [
      { command: 'secpol.msc', description: 'Abre la Directiva de seguridad local.' },
      { command: 'wf.msc', description: 'Abre el Firewall de Windows Defender con seguridad avanzada.' },
      { command: 'Get-MpComputerStatus', description: 'PowerShell: muestra el estado de Windows Defender.' },
      { command: 'Update-MpSignature', description: 'PowerShell: actualiza las firmas de Windows Defender manualmente.' },
    ],
  },
  {
    title: 'Atajos de teclado útiles',
    icon: Keyboard,
    trucos: [
      { description: 'Win + R — Abrir cuadro de Ejecutar' },
      { description: 'Win + Shift + S — Captura de pantalla recortada' },
      { description: 'Win + L — Bloquear sesión' },
      { description: 'Win + . — Abrir panel de emojis/símbolos' },
      { description: 'Ctrl + Shift + Esc — Abrir el Administrador de tareas directamente' },
      { description: 'Win + Tab — Vista de tareas / escritorios virtuales' },
      { description: 'Win + Ctrl + Shift + B — Reiniciar el driver gráfico sin reiniciar el equipo' },
      { description: 'Alt + F4 — Cerrar la ventana activa' },
    ],
  },
];

export function TrucosWindowsPage() {
  const { toast } = useToast();

  const copy = (command: string) => {
    navigator.clipboard.writeText(command);
    toast({ title: 'Comando copiado' });
  };

  return (
    <div>
      <PageHeader
        icon={Wrench}
        title="Trucos de Windows"
        description="Comandos y atajos útiles para técnicos de redes y soporte"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {categorias.map((cat, ci) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: ci * 0.05 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-white">
                <Icon className="h-4 w-4 text-primary" />
                {cat.title}
              </h2>
              <div className="flex flex-col gap-2.5">
                {cat.trucos.map((truco, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/40 p-3"
                  >
                    <div className="min-w-0 flex-1">
                      {truco.command && (
                        <code className="inline-block break-all rounded-md border border-border bg-muted px-2 py-1 font-mono text-xs text-white">
                          {truco.command}
                        </code>
                      )}
                      <p className={truco.command ? 'mt-1.5 text-sm text-muted-foreground' : 'text-sm text-muted-foreground'}>
                        {truco.description}
                      </p>
                    </div>
                    {truco.command && (
                      <button
                        type="button"
                        onClick={() => copy(truco.command!)}
                        className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:border-primary/30 hover:text-white"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        Copiar
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
