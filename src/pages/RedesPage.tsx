import { motion } from 'framer-motion';
import {
  Network,
  Router,
  Server,
  Shield,
  Printer,
  Wifi,
  Copy,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
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
import {
  networkDevices,
  vlans,
  networkCommands,
  ipRanges,
  type NetworkDevice,
  type NetworkCommand,
} from '@/data/networks';

const typeIconMap: Record<NetworkDevice['type'], React.ComponentType<{ className?: string }>> = {
  switch: Network,
  router: Router,
  firewall: Shield,
  server: Server,
  printer: Printer,
  wifi: Wifi,
};

const typeLabelMap: Record<NetworkDevice['type'], string> = {
  switch: 'Switch',
  router: 'Router',
  firewall: 'Firewall',
  server: 'Servidor',
  printer: 'Impresora',
  wifi: 'WiFi',
};

const statusStyles: Record<NetworkDevice['status'], string> = {
  online: 'border-transparent bg-emerald-500/15 text-emerald-400',
  maintenance: 'border-transparent bg-amber-500/15 text-amber-400',
  offline: 'border-transparent bg-red-500/15 text-red-400',
};

const statusLabels: Record<NetworkDevice['status'], string> = {
  online: 'En línea',
  maintenance: 'Mantenimiento',
  offline: 'Desconectado',
};

function CommandsList({ commands }: { commands: NetworkCommand[] }) {
  const { toast } = useToast();

  const copy = (command: string) => {
    navigator.clipboard.writeText(command);
    toast({ title: 'Comando copiado' });
  };

  return (
    <div className="flex flex-col gap-2.5">
      {commands.map((cmd, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/40 p-3"
        >
          <div className="min-w-0 flex-1">
            <code className="inline-block rounded-md border border-border bg-muted px-2 py-1 font-mono text-xs text-white">
              {cmd.command}
            </code>
            <p className="mt-1.5 text-sm text-muted-foreground">{cmd.description}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => copy(cmd.command)} className="shrink-0">
            <Copy className="mr-1.5 h-3.5 w-3.5" />
            Copiar
          </Button>
        </div>
      ))}
    </div>
  );
}

export function RedesPage() {
  return (
    <div>
      <PageHeader icon={Network} title="Redes" description="Infraestructura de red del hospital" />

      <Tabs defaultValue="dispositivos">
        <TabsList>
          <TabsTrigger value="dispositivos">Dispositivos</TabsTrigger>
          <TabsTrigger value="vlans">VLANs</TabsTrigger>
          <TabsTrigger value="ip">Direccionamiento IP</TabsTrigger>
          <TabsTrigger value="comandos">Comandos</TabsTrigger>
        </TabsList>

        <TabsContent value="dispositivos">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border bg-card p-2"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Marca/Modelo</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {networkDevices.map((device) => {
                  const Icon = typeIconMap[device.type];
                  return (
                    <TableRow key={device.id}>
                      <TableCell>
                        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Icon className="h-4 w-4" />
                          {typeLabelMap[device.type]}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium text-white">{device.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {device.brand} {device.model}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{device.ip}</TableCell>
                      <TableCell className="text-muted-foreground">{device.location}</TableCell>
                      <TableCell>
                        <Badge className={statusStyles[device.status]}>{statusLabels[device.status]}</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </motion.div>
        </TabsContent>

        <TabsContent value="vlans">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border bg-card p-2"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Subred</TableHead>
                  <TableHead>Gateway</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Puertos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vlans.map((vlan) => (
                  <TableRow key={vlan.id}>
                    <TableCell className="font-mono text-xs text-white">{vlan.id}</TableCell>
                    <TableCell className="font-medium text-white">{vlan.name}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{vlan.subnet}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{vlan.gateway}</TableCell>
                    <TableCell className="text-muted-foreground">{vlan.description}</TableCell>
                    <TableCell className="text-muted-foreground">{vlan.ports ?? '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </TabsContent>

        <TabsContent value="ip">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ipRanges.map((range, i) => (
              <motion.div
                key={range.range}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <p className="font-mono text-base font-bold text-white">{range.range}</p>
                <p className="mt-1 text-sm text-muted-foreground">{range.purpose}</p>
                <Progress value={(range.assigned / range.total) * 100} className="mt-4" />
                <p className="mt-2 text-xs text-muted-foreground">
                  {range.assigned} / {range.total} IPs asignadas
                </p>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comandos">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="mb-4 text-base font-bold text-white">Cisco</h3>
              <CommandsList commands={networkCommands.filter((c) => c.category === 'cisco')} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="mb-4 text-base font-bold text-white">Aruba</h3>
              <CommandsList commands={networkCommands.filter((c) => c.category === 'aruba')} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="mb-4 text-base font-bold text-white">Windows</h3>
              <CommandsList commands={networkCommands.filter((c) => c.category === 'windows')} />
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
