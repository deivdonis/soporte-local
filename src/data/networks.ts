export interface NetworkDevice {
  id: string;
  name: string;
  type: 'switch' | 'router' | 'firewall' | 'server' | 'printer' | 'wifi';
  brand: string;
  model: string;
  ip: string;
  location: string;
  ports?: number;
  vlanIds?: number[];
  status: 'online' | 'offline' | 'maintenance';
  notes?: string;
}

export interface VLAN {
  id: number;
  name: string;
  subnet: string;
  gateway: string;
  description: string;
  ports?: string;
}

export interface NetworkCommand {
  command: string;
  description: string;
  category: 'cisco' | 'aruba' | 'windows';
}

export interface IPRange {
  range: string;
  purpose: string;
  assigned: number;
  total: number;
}

export const networkDevices: NetworkDevice[] = [
  { id: 'n1', name: 'SW-CORE-01', type: 'switch', brand: 'Cisco', model: 'Catalyst 9300', ip: '192.168.1.1', location: 'CPD Principal', ports: 48, vlanIds: [1,10,20,30,40,50], status: 'online', notes: 'Switch núcleo de la red' },
  { id: 'n2', name: 'SW-Dist-02', type: 'switch', brand: 'Cisco', model: 'Catalyst 2960X', ip: '192.168.1.2', location: 'Planta 1', ports: 48, vlanIds: [10,20,30], status: 'online' },
  { id: 'n3', name: 'SW-Dist-03', type: 'switch', brand: 'Cisco', model: 'Catalyst 2960X', ip: '192.168.1.3', location: 'Planta 2', ports: 48, vlanIds: [10,20,40], status: 'online' },
  { id: 'n4', name: 'SW-Aruba-01', type: 'switch', brand: 'Aruba', model: '2530-48G', ip: '192.168.1.4', location: 'Urgencias', ports: 48, vlanIds: [10,20,50], status: 'online' },
  { id: 'n5', name: 'FW-Perimeter', type: 'firewall', brand: 'Fortinet', model: 'FortiGate 100F', ip: '192.168.0.1', location: 'CPD Principal', status: 'online', notes: 'Firewall perimetral con VPN SSL' },
  { id: 'n6', name: 'SRV-DC-01', type: 'server', brand: 'Dell', model: 'PowerEdge R650', ip: '192.168.1.10', location: 'CPD Principal', status: 'online', notes: 'Controlador de dominio principal' },
  { id: 'n7', name: 'SRV-DC-02', type: 'server', brand: 'Dell', model: 'PowerEdge R650', ip: '192.168.1.11', location: 'CPD Secundario', status: 'online', notes: 'Controlador de dominio secundario' },
  { id: 'n8', name: 'SRV-FS-01', type: 'server', brand: 'HP', model: 'ProLiant DL380 Gen10', ip: '192.168.1.20', location: 'CPD Principal', status: 'online', notes: 'Servidor de ficheros' },
  { id: 'n9', name: 'SRV-APP-01', type: 'server', brand: 'HP', model: 'ProLiant DL360 Gen10', ip: '192.168.1.30', location: 'CPD Principal', status: 'maintenance', notes: 'Servidor de aplicaciones HIS' },
  { id: 'n10', name: 'WLC-Aruba-01', type: 'wifi', brand: 'Aruba', model: '7200 Series Controller', ip: '192.168.1.5', location: 'CPD Principal', status: 'online', notes: 'Controlador WiFi corporativo' },
  { id: 'n11', name: 'AP-P1-01', type: 'wifi', brand: 'Aruba', model: 'AP-515', ip: '192.168.1.101', location: 'Planta 1 - Ala Norte', status: 'online' },
  { id: 'n12', name: 'AP-P1-02', type: 'wifi', brand: 'Aruba', model: 'AP-515', ip: '192.168.1.102', location: 'Planta 1 - Ala Sur', status: 'online' },
  { id: 'n13', name: 'AP-P2-01', type: 'wifi', brand: 'Aruba', model: 'AP-515', ip: '192.168.1.103', location: 'Planta 2 - Ala Norte', status: 'online' },
  { id: 'n14', name: 'AP-URG-01', type: 'wifi', brand: 'Aruba', model: 'AP-515', ip: '192.168.1.104', location: 'Urgencias', status: 'online' },
  { id: 'n15', name: 'IMP-Ricoh-C3000', type: 'printer', brand: 'Ricoh', model: 'IM C3000', ip: '192.168.1.70', location: 'Planta 1 - Oficina', status: 'online' },
  { id: 'n16', name: 'IMP-Kyocera-4054', type: 'printer', brand: 'Kyocera', model: 'TASKalfa 4054ci', ip: '192.168.1.80', location: 'Planta 2 - Archivo', status: 'online' },
];

export const vlans: VLAN[] = [
  { id: 1, name: 'Management', subnet: '192.168.1.0/24', gateway: '192.168.1.1', description: 'Gestión de equipos de red', ports: 'Trunk' },
  { id: 10, name: 'Administración', subnet: '192.168.10.0/24', gateway: '192.168.10.1', description: 'Equipos administrativos', ports: 'Gi0/1-24' },
  { id: 20, name: 'Médica', subnet: '192.168.20.0/24', gateway: '192.168.20.1', description: 'Equipos médicos y clínicos', ports: 'Gi0/25-36' },
  { id: 30, name: 'Impresoras', subnet: '192.168.30.0/24', gateway: '192.168.30.1', description: 'Impresoras y multifuncionales', ports: 'Gi0/37-44' },
  { id: 40, name: 'Invitados', subnet: '192.168.40.0/24', gateway: '192.168.40.1', description: 'Red de invitados y visitantes', ports: 'Gi0/45-46' },
  { id: 50, name: 'VoIP', subnet: '192.168.50.0/24', gateway: '192.168.50.1', description: 'Telefonía IP', ports: 'Gi0/47-48' },
];

export const networkCommands: NetworkCommand[] = [
  // Cisco
  { command: 'show vlan brief', description: 'Muestra el listado resumido de VLANs configuradas y sus puertos asociados.', category: 'cisco' },
  { command: 'show interfaces status', description: 'Muestra el estado, velocidad y VLAN de cada puerto del switch.', category: 'cisco' },
  { command: 'show running-config', description: 'Muestra la configuración actual en ejecución del equipo.', category: 'cisco' },
  { command: 'show mac address-table', description: 'Muestra la tabla de direcciones MAC aprendidas por puerto.', category: 'cisco' },
  { command: 'show ip interface brief', description: 'Muestra el resumen de interfaces IP y su estado.', category: 'cisco' },
  { command: 'show spanning-tree', description: 'Muestra el estado del protocolo Spanning Tree en el switch.', category: 'cisco' },
  { command: 'configure terminal', description: 'Entra en el modo de configuración global del equipo.', category: 'cisco' },
  { command: 'show version', description: 'Muestra la versión de IOS, el uptime y el modelo del equipo.', category: 'cisco' },
  { command: 'show cdp neighbors', description: 'Muestra los dispositivos Cisco vecinos detectados mediante CDP.', category: 'cisco' },
  { command: 'write memory', description: 'Guarda la configuración en ejecución en la configuración de arranque.', category: 'cisco' },
  { command: 'show vtp status', description: 'Muestra el estado del protocolo VTP y el dominio configurado.', category: 'cisco' },
  { command: 'show etherchannel summary', description: 'Muestra el resumen de los grupos EtherChannel configurados.', category: 'cisco' },
  // Aruba
  { command: 'show vlans', description: 'Muestra el listado de VLANs configuradas en el switch Aruba.', category: 'aruba' },
  { command: 'show ports', description: 'Muestra el estado y la configuración de todos los puertos.', category: 'aruba' },
  { command: 'show running-config', description: 'Muestra la configuración actualmente en ejecución del equipo.', category: 'aruba' },
  { command: 'show ip', description: 'Muestra la configuración IP de las interfaces del switch.', category: 'aruba' },
  { command: 'show mac-address', description: 'Muestra la tabla de direcciones MAC aprendidas por el switch.', category: 'aruba' },
  { command: 'show system', description: 'Muestra información general del sistema y su estado.', category: 'aruba' },
  { command: 'show interfaces brief', description: 'Muestra un resumen breve del estado de todas las interfaces.', category: 'aruba' },
  { command: 'show lldp neighbors', description: 'Muestra los dispositivos vecinos detectados mediante LLDP.', category: 'aruba' },
  { command: 'write memory', description: 'Guarda la configuración actual en la memoria persistente del equipo.', category: 'aruba' },
  { command: 'show spanning-tree', description: 'Muestra el estado del protocolo Spanning Tree en el switch Aruba.', category: 'aruba' },
  // Windows
  { command: 'ipconfig /all', description: 'Muestra toda la configuración de red del equipo, incluyendo IP, DNS y MAC.', category: 'windows' },
  { command: 'ping', description: 'Comprueba la conectividad hacia una IP o nombre de host.', category: 'windows' },
  { command: 'tracert', description: 'Traza la ruta de red hasta un destino mostrando cada salto.', category: 'windows' },
  { command: 'netstat -an', description: 'Muestra las conexiones de red activas y los puertos en escucha.', category: 'windows' },
  { command: 'nslookup', description: 'Consulta la resolución DNS de un nombre de dominio.', category: 'windows' },
  { command: 'arp -a', description: 'Muestra la tabla ARP con las direcciones MAC de la red local.', category: 'windows' },
  { command: 'netsh winsock reset', description: 'Restablece el catálogo Winsock para resolver problemas de conexión.', category: 'windows' },
  { command: 'netsh int ip reset', description: 'Restablece la configuración de la pila TCP/IP a sus valores por defecto.', category: 'windows' },
  { command: 'ipconfig /flushdns', description: 'Vacía la caché de resolución DNS del equipo.', category: 'windows' },
  { command: 'ipconfig /release', description: 'Libera la dirección IP asignada por el servidor DHCP.', category: 'windows' },
  { command: 'ipconfig /renew', description: 'Solicita una nueva dirección IP al servidor DHCP.', category: 'windows' },
  { command: 'route print', description: 'Muestra la tabla de enrutamiento del equipo local.', category: 'windows' },
  { command: 'pathping', description: 'Combina ping y tracert para analizar la pérdida de paquetes en cada salto.', category: 'windows' },
  { command: 'gpupdate /force', description: 'Fuerza la actualización de las políticas de grupo del dominio.', category: 'windows' },
];

export const ipRanges: IPRange[] = [
  { range: '192.168.1.0/24', purpose: 'Gestión de red (Switches, APs, Firewalls)', assigned: 16, total: 254 },
  { range: '192.168.10.0/24', purpose: 'Equipos administrativos', assigned: 85, total: 254 },
  { range: '192.168.20.0/24', purpose: 'Equipos médicos y clínicos', assigned: 42, total: 254 },
  { range: '192.168.30.0/24', purpose: 'Impresoras y multifuncionales', assigned: 12, total: 254 },
  { range: '192.168.40.0/24', purpose: 'Red de invitados', assigned: 5, total: 254 },
  { range: '192.168.50.0/24', purpose: 'Telefonía IP', assigned: 28, total: 254 },
];
