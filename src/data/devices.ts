export type DeviceCategory =
  | 'portatiles' | 'sobremesas' | 'monitores' | 'impresoras' | 'telefonos'
  | 'equipos-clinicos' | 'perifericos' | 'otros';

export interface DeviceModel {
  id: string;
  brand: string;
  model: string;
  category: DeviceCategory;
  description: string;
  specs: { label: string; value: string }[];
  drivers: { name: string; url: string; os: string; version: string }[];
  manuals: { name: string; url: string; type: string }[];
  links: { name: string; url: string }[];
  bios?: {
    key?: string; bootMenu?: string; recovery?: string;
    tpm?: string; secureBoot?: string; reset?: string; diagnostics?: string;
  };
  shortcuts?: string[];
  troubleshooting?: { title: string; steps: string[] }[];
  notes?: string[];
  history?: { date: string; event: string }[];
  printerInfo?: {
    ip?: string; dhcp?: boolean; firmware?: string;
    maintenance?: string[]; testPage?: string; cleaning?: string[];
    consumables?: { name: string; code: string; yield?: string }[];
  };
  zebraInfo?: {
    calibration?: string[]; feed?: string; pause?: string;
    sensor?: string; configLabel?: string; reset?: string[];
    combinations?: string[];
  };
  monitorInfo?: {
    reset?: string; osd?: string; serviceMode?: string;
    factoryMode?: string; osdUnlock?: string;
    buttonCombos?: string[]; calibration?: string;
  };
  telephoneInfo?: {
    ip?: string; dhcp?: boolean; firmware?: string;
    reset?: string[]; factoryReset?: string; codes?: string[];
    voicemail?: string; speedDial?: string; transfer?: string;
  };
  factoryReset?: { software: string; buttons: string };
}

export const deviceCategories: { id: DeviceCategory; name: string; icon: string; description: string }[] = [
  { id: 'sobremesas', name: 'Sobremesas', icon: 'Monitor', description: 'Ordenadores de sobremesa y workstations' },
  { id: 'portatiles', name: 'Portátiles', icon: 'MonitorSmartphone', description: 'Ordenadores portátiles y laptops' },
  { id: 'impresoras', name: 'Impresoras', icon: 'Printer', description: 'Impresoras térmicas, láser y de inyección' },
  { id: 'monitores', name: 'Monitores', icon: 'Monitor', description: 'Pantallas y monitores de todo tipo' },
  { id: 'telefonos', name: 'Teléfonos', icon: 'Phone', description: 'Teléfonos IP y sistemas de telefonía' },
  { id: 'equipos-clinicos', name: 'Equipos Clínicos', icon: 'HeartPulse', description: 'Equipos médicos y de monitorización' },
  { id: 'perifericos', name: 'Periféricos', icon: 'Mouse', description: 'Ratones, teclados, escáneres y más' },
  { id: 'otros', name: 'Otros', icon: 'Package', description: 'Otros dispositivos técnicos' },
];

// ---------------------------------------------------------------------------
// Constantes reutilizables por marca
// ---------------------------------------------------------------------------

const hpDrivers: DeviceModel['drivers'] = [
  { name: 'Chipset Intel', url: 'https://support.hp.com', os: 'Windows 10/11 64-bit', version: '10.1.18.20' },
  { name: 'Gráficos Intel UHD', url: 'https://support.hp.com', os: 'Windows 10/11 64-bit', version: '31.0.101.4502' },
  { name: 'Audio Realtek', url: 'https://support.hp.com', os: 'Windows 10/11 64-bit', version: '6.0.9333.1' },
  { name: 'Wi-Fi Intel AX201', url: 'https://support.hp.com', os: 'Windows 10/11 64-bit', version: '22.190.0.5' },
];

const hpLinks: DeviceModel['links'] = [
  { name: 'Soporte HP', url: 'https://support.hp.com' },
  { name: 'HP Image Assistant', url: 'https://support.hp.com/us-en/document/c05207812' },
  { name: 'Foro de soporte HP', url: 'https://h30434.www3.hp.com' },
];

const hpBios: DeviceModel['bios'] = {
  key: 'F10 / Esc',
  bootMenu: 'F9',
  recovery: 'F11 (HP Recovery Manager)',
  tpm: 'BIOS > Security > TPM Embedded Security',
  secureBoot: 'BIOS > Security > Secure Boot Configuration',
  reset: 'BIOS > Security > Restore Security Settings to Factory Defaults',
  diagnostics: 'Esc > F2 (HP PC Hardware Diagnostics)',
};

const hpShortcuts: string[] = [
  'Fn+F5 - Ajustar brillo de pantalla',
  'F9 durante el arranque - Menú de selección de arranque',
  'Fn+Esc - Información del sistema',
  'Fn+F6 - Activar/desactivar modo avión',
  'Ctrl+Alt+Supr - Bloquear sesión',
];

const lenovoDrivers: DeviceModel['drivers'] = [
  { name: 'Chipset Intel', url: 'https://pcsupport.lenovo.com', os: 'Windows 10/11 64-bit', version: '10.1.19.21' },
  { name: 'Gráficos Intel Iris Xe', url: 'https://pcsupport.lenovo.com', os: 'Windows 10/11 64-bit', version: '31.0.101.4887' },
  { name: 'Audio Realtek', url: 'https://pcsupport.lenovo.com', os: 'Windows 10/11 64-bit', version: '6.0.9341.1' },
];

const lenovoLinks: DeviceModel['links'] = [
  { name: 'Soporte Lenovo', url: 'https://pcsupport.lenovo.com' },
  { name: 'Lenovo Vantage', url: 'https://pcsupport.lenovo.com/us/en/lenovovantage' },
];

const lenovoBios: DeviceModel['bios'] = {
  key: 'F1 / Novo button',
  bootMenu: 'F12',
  recovery: 'Novo Button > System Recovery',
  tpm: 'BIOS > Security > Security Chip',
  secureBoot: 'BIOS > Security > Secure Boot',
  reset: 'BIOS > Exit > Load Setup Defaults',
  diagnostics: 'Novo Button > Lenovo Diagnostics',
};

const lenovoShortcuts: string[] = [
  'Fn+F2 - Bloquear pantalla',
  'F12 durante el arranque - Menú de arranque',
  'Novo button (apagado) - Menú de recuperación',
  'Fn+F4 - Suspender equipo',
  'Fn+Espacio - Retroiluminación de teclado',
];

const toshibaDrivers: DeviceModel['drivers'] = [
  { name: 'Chipset Intel', url: 'https://dynabook.com/support', os: 'Windows 10 64-bit', version: '10.1.1.45' },
  { name: 'Gráficos Intel UHD 620', url: 'https://dynabook.com/support', os: 'Windows 10 64-bit', version: '26.20.100.7263' },
];

const toshibaLinks: DeviceModel['links'] = [
  { name: 'Soporte Toshiba / Dynabook', url: 'https://dynabook.com/support' },
];

const toshibaBios: DeviceModel['bios'] = {
  key: 'F2 / F12',
  bootMenu: 'F12',
  recovery: 'F8 al arrancar (Toshiba Recovery)',
  tpm: 'BIOS > Security > TPM',
  secureBoot: 'BIOS > Security > Secure Boot',
  reset: 'BIOS > Exit > Load Default Settings',
  diagnostics: 'F2 > Diagnostics',
};

const toshibaShortcuts: string[] = [
  'F12 durante el arranque - Menú de arranque',
  'Fn+F7 - Modo avión',
  'Fn+Esc - Silenciar teclado táctil',
];

const fujitsuDrivers: DeviceModel['drivers'] = [
  { name: 'Chipset Intel', url: 'https://support.ts.fujitsu.com', os: 'Windows 10 64-bit', version: '10.1.1.40' },
  { name: 'Gráficos Intel UHD 620', url: 'https://support.ts.fujitsu.com', os: 'Windows 10 64-bit', version: '26.20.100.7000' },
];

const fujitsuLinks: DeviceModel['links'] = [
  { name: 'Soporte Fujitsu', url: 'https://support.ts.fujitsu.com' },
];

const fujitsuBios: DeviceModel['bios'] = {
  key: 'F2 / F12',
  bootMenu: 'F12',
  recovery: 'F8 (Windows Recovery)',
  tpm: 'BIOS > Security > TPM Device',
  secureBoot: 'BIOS > Security > Secure Boot',
  reset: 'BIOS > Exit > Load Setup Defaults',
  diagnostics: 'F12 > Diagnostics',
};

const fujitsuShortcuts: string[] = [
  'F12 durante el arranque - Menú de arranque',
  'Fn+F4 - Modo avión',
  'Fn+F8 - Alternar salida de vídeo',
];

const dellDrivers: DeviceModel['drivers'] = [
  { name: 'Chipset Intel', url: 'https://www.dell.com/support', os: 'Windows 10/11 64-bit', version: '10.1.19.5' },
  { name: 'Gráficos Intel UHD', url: 'https://www.dell.com/support', os: 'Windows 10/11 64-bit', version: '31.0.101.4655' },
  { name: 'Dell SupportAssist', url: 'https://www.dell.com/support', os: 'Windows 10/11 64-bit', version: '3.14.1' },
];

const dellLinks: DeviceModel['links'] = [
  { name: 'Soporte Dell', url: 'https://www.dell.com/support' },
  { name: 'Dell SupportAssist', url: 'https://www.dell.com/support/contents/en-us/article/product-support/self-support-knowledgebase/software-and-downloads/supportassist' },
];

const dellBios: DeviceModel['bios'] = {
  key: 'F2 / F12',
  bootMenu: 'F12',
  recovery: 'F8 / SupportAssist',
  tpm: 'BIOS > Security > TPM 2.0 Security',
  secureBoot: 'BIOS > Secure Boot > Secure Boot Enable',
  reset: 'BIOS > System Configuration > Restore Settings',
  diagnostics: 'F12 > Dell Diagnostics (ePSA)',
};

const dellShortcuts: string[] = [
  'F12 durante el arranque - Menú de arranque',
  'Fn+F1 - Modo avión',
  'Ctrl+Shift+B - Reiniciar controladora gráfica',
];

const zebraLinks: DeviceModel['links'] = [
  { name: 'Soporte Zebra', url: 'https://www.zebra.com/support' },
  { name: 'Zebra Setup Utilities', url: 'https://www.zebra.com/us/en/support-downloads/software/printer-software/zebra-setup-utilities.html' },
];

const zebraDrivers: DeviceModel['drivers'] = [
  { name: 'ZDesigner Driver', url: 'https://www.zebra.com/support', os: 'Windows 10/11', version: 'v8.4.2' },
];

type ZebraInfo = NonNullable<DeviceModel['zebraInfo']>;
type PrinterInfo = NonNullable<DeviceModel['printerInfo']>;

function zebraInfo(extra?: Partial<ZebraInfo>): ZebraInfo {
  return {
    calibration: [
      'Apagar la impresora',
      'Mantener pulsado el botón Feed',
      'Encender manteniendo Feed pulsado 2 segundos',
      'Soltar cuando el LED de estado parpadee en ámbar',
    ],
    feed: 'Pulsación corta del botón Feed - Avanza una etiqueta',
    pause: 'Pulsación corta del botón Pause - Pausa/reanuda la impresión',
    sensor: 'Verificar sensor de brecha (gap) o de marca negra según el tipo de etiqueta usada',
    configLabel: 'Cancel (2s) o Feed+Pause al encender - Imprime etiqueta de configuración',
    reset: [
      'Apagar la impresora',
      'Mantener pulsados Pause + Feed',
      'Encender manteniendo ambos botones 5 segundos',
      'Soltar cuando los LEDs parpadeen simultáneamente',
    ],
    combinations: [
      'Pause + Feed (5s) - Restaurar valores de fábrica',
      'Feed (2s) durante el encendido - Calibración de sensores',
      'Cancel (2s) - Imprimir etiqueta de configuración',
    ],
    ...extra,
  };
}

function zebraPrinterInfo(ip?: string, dhcp = true, firmware = 'v75.20.11Z'): PrinterInfo {
  return {
    ip,
    dhcp,
    firmware,
    maintenance: [
      'Limpiar el cabezal de impresión cada 500 metros de etiquetas',
      'Limpiar el rodillo de arrastre con alcohol isopropílico',
      'Revisar los sensores de etiqueta mensualmente',
    ],
    testPage: 'Mantener pulsado Feed durante el encendido para imprimir etiqueta de prueba',
    cleaning: [
      'Usar bolígrafo de limpieza o alcohol isopropílico al 90%',
      'Limpiar cabezal, rodillo y sensores con la impresora apagada',
      'Dejar secar 1 minuto antes de volver a imprimir',
    ],
    consumables: [
      { name: 'Etiquetas térmicas 4x6"', code: 'Z-PERFORM 2000D', yield: '1000 etiquetas/rollo' },
      { name: 'Ribbon cera/resina 110mm', code: 'Zebra 5319', yield: '450 m' },
    ],
  };
}

// ---------------------------------------------------------------------------
// Catálogo de dispositivos
// ---------------------------------------------------------------------------

export const devices: DeviceModel[] = [
  // --- Sobremesas ---
  {
    id: 'hp-elitedesk-800-g3',
    brand: 'HP',
    model: 'EliteDesk 800 G3 SFF',
    category: 'sobremesas',
    description: 'Sobremesa corporativo de factor reducido con Intel 7ª generación, muy extendido en puestos administrativos.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-7500' },
      { label: 'RAM', value: '8 GB DDR4' },
      { label: 'Almacenamiento', value: '256 GB SSD' },
      { label: 'Factor de forma', value: 'Small Form Factor' },
      { label: 'SO', value: 'Windows 10 Pro' },
    ],
    drivers: hpDrivers,
    manuals: [
      { name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' },
      { name: 'Guía de mantenimiento', url: 'https://support.hp.com', type: 'PDF' },
    ],
    links: hpLinks,
    bios: hpBios,
    shortcuts: hpShortcuts,
    troubleshooting: [
      { title: 'No enciende', steps: ['Comprobar cable de alimentación', 'Probar otra toma de corriente', 'Retirar pila CMOS 30 segundos', 'Comprobar fuente de alimentación interna'] },
      { title: 'Pitidos al arrancar', steps: ['Contar el número de pitidos', 'Consultar código en manual HP', 'Reasentar módulos de RAM', 'Probar con un solo módulo de RAM'] },
    ],
    notes: ['Modelo en fase de sustitución progresiva', 'Común en puestos de administración'],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F11 al arrancar > Troubleshoot > Reset this PC',
    },
    history: [{ date: '2025-11-04', event: 'Sustitución de disco duro por SSD' }],
  },
  {
    id: 'hp-elitedesk-800-g4-sff',
    brand: 'HP',
    model: 'EliteDesk 800 G4 SFF',
    category: 'sobremesas',
    description: 'Sobremesa SFF de gama alta con Intel 8ª generación, orientado a consultas y despachos clínicos.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-8500' },
      { label: 'RAM', value: '16 GB DDR4' },
      { label: 'Almacenamiento', value: '512 GB SSD NVMe' },
      { label: 'Factor de forma', value: 'Small Form Factor' },
      { label: 'SO', value: 'Windows 10/11 Pro' },
    ],
    drivers: hpDrivers,
    manuals: [
      { name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' },
      { name: 'Guía de despiece', url: 'https://support.hp.com', type: 'PDF' },
    ],
    links: hpLinks,
    bios: hpBios,
    shortcuts: hpShortcuts,
    troubleshooting: [
      { title: 'Se reinicia solo', steps: ['Comprobar temperaturas con HWMonitor', 'Limpiar polvo del disipador', 'Actualizar BIOS a última versión', 'Probar con fuente de alimentación distinta'] },
    ],
    notes: ['Equipo estándar en consultas'],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F11 al arrancar > Troubleshoot > Reset this PC',
    },
    history: [{ date: '2026-01-15', event: 'Actualización de BIOS y limpieza interna' }],
  },
  {
    id: 'hp-elite-sff-800-g9',
    brand: 'HP',
    model: 'Elite SFF 800 G9',
    category: 'sobremesas',
    description: 'Sobremesa SFF de última generación con Intel 13ª generación, alto rendimiento en poco espacio.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-13500' },
      { label: 'RAM', value: '16 GB DDR5' },
      { label: 'Almacenamiento', value: '512 GB SSD NVMe' },
      { label: 'Factor de forma', value: 'Small Form Factor' },
      { label: 'SO', value: 'Windows 11 Pro' },
    ],
    drivers: hpDrivers,
    manuals: [
      { name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' },
      { name: 'Guía rápida de instalación', url: 'https://support.hp.com', type: 'PDF' },
    ],
    links: hpLinks,
    bios: hpBios,
    shortcuts: hpShortcuts,
    troubleshooting: [
      { title: 'No detecta segundo monitor', steps: ['Comprobar cable DisplayPort/HDMI', 'Actualizar driver gráfico Intel', 'Forzar detección en Configuración > Pantalla', 'Probar puerto de vídeo alternativo'] },
    ],
    notes: ['Equipo asignado a puestos de nueva incorporación'],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F11 al arrancar > Troubleshoot > Reset this PC',
    },
    history: [{ date: '2026-03-10', event: 'Despliegue inicial e imagen corporativa' }],
  },
  {
    id: 'hp-elite-600-g9',
    brand: 'HP',
    model: 'Elite 600 G9',
    category: 'sobremesas',
    description: 'Sobremesa compacto de última generación orientado a eficiencia energética y rendimiento.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-13500T' },
      { label: 'RAM', value: '16 GB DDR5' },
      { label: 'Almacenamiento', value: '512 GB SSD NVMe' },
      { label: 'Factor de forma', value: 'Small Form Factor' },
      { label: 'SO', value: 'Windows 11 Pro' },
    ],
    drivers: hpDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' }],
    links: hpLinks,
    bios: hpBios,
    shortcuts: hpShortcuts,
    troubleshooting: [
      { title: 'No arranca tras corte de luz', steps: ['Comprobar regleta/SAI', 'Retirar pila CMOS 30 segundos', 'Comprobar ajuste "After Power Loss" en BIOS'] },
    ],
    notes: ['Bajo consumo, recomendado para salas sin climatizar'],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F11 al arrancar > Troubleshoot > Reset this PC',
    },
  },
  {
    id: 'hp-engage-aio-one-pro',
    brand: 'HP',
    model: 'Engage AIO One Pro',
    category: 'sobremesas',
    description: 'Todo en uno corporativo con pantalla táctil, usado en mostradores de admisión y puestos de atención.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-8500T' },
      { label: 'RAM', value: '8 GB DDR4' },
      { label: 'Almacenamiento', value: '256 GB SSD' },
      { label: 'Pantalla', value: '21.5" Full HD táctil' },
      { label: 'SO', value: 'Windows 10 Pro' },
    ],
    drivers: hpDrivers,
    manuals: [
      { name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' },
      { name: 'Guía de calibración táctil', url: 'https://support.hp.com', type: 'PDF' },
    ],
    links: hpLinks,
    bios: hpBios,
    shortcuts: hpShortcuts,
    troubleshooting: [
      { title: 'Pantalla táctil desalineada', steps: ['Abrir "Configurar Tablet PC" en Windows', 'Ejecutar calibración táctil', 'Actualizar driver del panel táctil', 'Reiniciar equipo tras calibrar'] },
    ],
    notes: ['Ubicado en mostrador de admisión'],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F11 al arrancar > Troubleshoot > Reset this PC',
    },
    history: [{ date: '2025-09-22', event: 'Recalibración de pantalla táctil' }],
  },
  {
    id: 'hp-engage-one-pro-vesa-5a',
    brand: 'HP',
    model: 'Engage One Pro Healthcare VESA+5A',
    category: 'sobremesas',
    description: 'Todo en uno sanitario con montaje VESA, instalado en quirófanos del hospital.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-8500T' },
      { label: 'RAM', value: '8 GB DDR4' },
      { label: 'Almacenamiento', value: '256 GB SSD' },
      { label: 'Pantalla', value: '21.5" Full HD táctil' },
      { label: 'SO', value: 'Windows 10 Pro' },
    ],
    drivers: hpDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' }],
    links: hpLinks,
    bios: hpBios,
    shortcuts: hpShortcuts,
    troubleshooting: [
      { title: 'Pantalla táctil desalineada', steps: ['Abrir "Configurar Tablet PC" en Windows', 'Ejecutar calibración táctil', 'Actualizar driver del panel táctil', 'Reiniciar equipo tras calibrar'] },
    ],
    notes: ['Instalado en quirófanos (montaje VESA), distribuidos entre quirófanos 1 a 13'],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F11 al arrancar > Troubleshoot > Reset this PC',
    },
  },
  {
    id: 'hp-engage-one-pro-5a',
    brand: 'HP',
    model: 'Engage One Pro Healthcare +5A',
    category: 'sobremesas',
    description: 'Todo en uno sanitario compacto, instalado en quirófanos del hospital.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-8500T' },
      { label: 'RAM', value: '8 GB DDR4' },
      { label: 'Almacenamiento', value: '256 GB SSD' },
      { label: 'Pantalla', value: '21.5" Full HD táctil' },
      { label: 'SO', value: 'Windows 10 Pro' },
    ],
    drivers: hpDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' }],
    links: hpLinks,
    bios: hpBios,
    shortcuts: hpShortcuts,
    troubleshooting: [
      { title: 'Pantalla táctil desalineada', steps: ['Abrir "Configurar Tablet PC" en Windows', 'Ejecutar calibración táctil', 'Actualizar driver del panel táctil', 'Reiniciar equipo tras calibrar'] },
    ],
    notes: ['Instalado en quirófanos, distribuidos entre quirófanos 1 a 13'],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F11 al arrancar > Troubleshoot > Reset this PC',
    },
  },
  {
    id: 'hp-prodesk-600-sff-4gb',
    brand: 'HP',
    model: 'ProDesk 600 SFF 4GB',
    category: 'sobremesas',
    description: 'Sobremesa de gama media SFF, uso general en administración e histórico del inventario.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5' },
      { label: 'RAM', value: '4 GB DDR4' },
      { label: 'Almacenamiento', value: '256 GB SSD' },
      { label: 'Factor de forma', value: 'Small Form Factor' },
      { label: 'SO', value: 'Windows 10 Pro' },
    ],
    drivers: hpDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' }],
    links: hpLinks,
    bios: hpBios,
    shortcuts: hpShortcuts,
    troubleshooting: [
      { title: 'Ventilador ruidoso', steps: ['Limpiar polvo con aire comprimido', 'Comprobar curva de ventilación en BIOS', 'Sustituir ventilador si el ruido persiste'] },
    ],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F11 al arrancar > Troubleshoot > Reset this PC',
    },
  },
  {
    id: 'lenovo-thinkcentre-m70q',
    brand: 'Lenovo',
    model: 'ThinkCentre M70q',
    category: 'sobremesas',
    description: 'Mini PC ThinkCentre de formato ultra reducido, ideal para puestos con poco espacio disponible.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-10500T' },
      { label: 'RAM', value: '8 GB DDR4' },
      { label: 'Almacenamiento', value: '256 GB SSD NVMe' },
      { label: 'Factor de forma', value: 'Tiny' },
      { label: 'SO', value: 'Windows 10 Pro' },
    ],
    drivers: lenovoDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://pcsupport.lenovo.com', type: 'PDF' }],
    links: lenovoLinks,
    bios: lenovoBios,
    shortcuts: lenovoShortcuts,
    troubleshooting: [
      { title: 'No detecta el soporte VESA', steps: ['Comprobar que el conector trasero está bien asentado', 'Revisar tornillería del soporte', 'Probar el equipo fuera del soporte'] },
    ],
    notes: ['Montado en soporte VESA tras el monitor'],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'Novo Button > System Recovery',
    },
  },
  {
    id: 'lenovo-thinkcentre-m90q',
    brand: 'Lenovo',
    model: 'ThinkCentre M90q',
    category: 'sobremesas',
    description: 'Mini PC ThinkCentre de gama alta con más capacidad de RAM y almacenamiento para puestos exigentes.',
    specs: [
      { label: 'CPU', value: 'Intel Core i7-10700T' },
      { label: 'RAM', value: '16 GB DDR4' },
      { label: 'Almacenamiento', value: '512 GB SSD NVMe' },
      { label: 'Factor de forma', value: 'Tiny' },
      { label: 'SO', value: 'Windows 10/11 Pro' },
    ],
    drivers: lenovoDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://pcsupport.lenovo.com', type: 'PDF' }],
    links: lenovoLinks,
    bios: lenovoBios,
    shortcuts: lenovoShortcuts,
    troubleshooting: [
      { title: 'Rendimiento bajo con varios monitores', steps: ['Comprobar ajustes de gráficos integrados', 'Actualizar driver Intel Iris Xe', 'Reducir resolución de salida si es necesario'] },
    ],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'Novo Button > System Recovery',
    },
    history: [{ date: '2026-02-18', event: 'Ampliación de RAM a 16 GB' }],
  },
  {
    id: 'lenovo-thinkcentre-m75q',
    brand: 'Lenovo',
    model: 'ThinkCentre M75q',
    category: 'sobremesas',
    description: 'Mini PC ThinkCentre con procesador AMD Ryzen PRO, alternativa de buen rendimiento gráfico integrado.',
    specs: [
      { label: 'CPU', value: 'AMD Ryzen 5 PRO 4650GE' },
      { label: 'RAM', value: '8 GB DDR4' },
      { label: 'Almacenamiento', value: '256 GB SSD NVMe' },
      { label: 'Factor de forma', value: 'Tiny' },
      { label: 'SO', value: 'Windows 10 Pro' },
    ],
    drivers: lenovoDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://pcsupport.lenovo.com', type: 'PDF' }],
    links: lenovoLinks,
    bios: lenovoBios,
    shortcuts: lenovoShortcuts,
    troubleshooting: [
      { title: 'No arranca tras actualización de BIOS', steps: ['Retirar pila CMOS 30 segundos', 'Reflashear BIOS con USB de recuperación Lenovo', 'Contactar soporte Lenovo si persiste'] },
    ],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'Novo Button > System Recovery',
    },
  },
  {
    id: 'lenovo-thinkcentre-m800-sff-4gb',
    brand: 'Lenovo',
    model: 'ThinkCentre M800 SFF 4GB',
    category: 'sobremesas',
    description: 'Sobremesa ThinkCentre de factor reducido, presente en el histórico de inventario del hospital.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-6500' },
      { label: 'RAM', value: '4 GB DDR4' },
      { label: 'Almacenamiento', value: '256 GB SSD' },
      { label: 'Factor de forma', value: 'Small Form Factor' },
      { label: 'SO', value: 'Windows 10 Pro' },
    ],
    drivers: lenovoDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://pcsupport.lenovo.com', type: 'PDF' }],
    links: lenovoLinks,
    bios: lenovoBios,
    shortcuts: lenovoShortcuts,
    troubleshooting: [
      { title: 'Reloj del sistema se desincroniza', steps: ['Sustituir pila CMOS (CR2032)', 'Sincronizar hora con servidor NTP', 'Comprobar zona horaria en Windows'] },
    ],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'Novo Button > System Recovery',
    },
  },
  {
    id: 'dell-optiplex-7080',
    brand: 'Dell',
    model: 'OptiPlex 7080',
    category: 'sobremesas',
    description: 'Sobremesa Micro de gama alta con Intel 10ª generación, orientado a puestos de trabajo intensivo.',
    specs: [
      { label: 'CPU', value: 'Intel Core i7-10700' },
      { label: 'RAM', value: '16 GB DDR4' },
      { label: 'Almacenamiento', value: '512 GB SSD NVMe' },
      { label: 'Factor de forma', value: 'Micro' },
      { label: 'SO', value: 'Windows 10 Pro' },
    ],
    drivers: dellDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://www.dell.com/support', type: 'PDF' }],
    links: dellLinks,
    bios: dellBios,
    shortcuts: dellShortcuts,
    troubleshooting: [
      { title: 'Detección de fallo de hardware', steps: ['Ejecutar Dell SupportAssist', 'Lanzar diagnóstico ePSA con F12', 'Anotar código de error para soporte Dell'] },
    ],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F8 al arrancar > SupportAssist Recovery',
    },
  },
  {
    id: 'dell-optiplex-7000',
    brand: 'Dell',
    model: 'OptiPlex 7000',
    category: 'sobremesas',
    description: 'Sobremesa Micro de nueva generación con Intel 12ª generación y mayor eficiencia energética.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-12500' },
      { label: 'RAM', value: '16 GB DDR4' },
      { label: 'Almacenamiento', value: '512 GB SSD NVMe' },
      { label: 'Factor de forma', value: 'Micro' },
      { label: 'SO', value: 'Windows 11 Pro' },
    ],
    drivers: dellDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://www.dell.com/support', type: 'PDF' }],
    links: dellLinks,
    bios: dellBios,
    shortcuts: dellShortcuts,
    troubleshooting: [
      { title: 'Pantalla azul intermitente', steps: ['Revisar archivo de minivolcado en Visor de eventos', 'Actualizar drivers de chipset y gráficos', 'Ejecutar memtest86 para descartar RAM defectuosa'] },
    ],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F8 al arrancar > SupportAssist Recovery',
    },
    history: [{ date: '2026-04-02', event: 'Sustitución de módulo de RAM defectuoso' }],
  },
  {
    id: 'lenovo-thinkcentre-m920q',
    brand: 'Lenovo',
    model: 'ThinkCentre M920q',
    category: 'sobremesas',
    description: 'Mini PC ThinkCentre de gama alta con Intel 8ª generación, usado en puestos con doble monitor.',
    specs: [
      { label: 'CPU', value: 'Intel Core i7-8700T' },
      { label: 'RAM', value: '16 GB DDR4' },
      { label: 'Almacenamiento', value: '512 GB SSD NVMe' },
      { label: 'Factor de forma', value: 'Tiny' },
      { label: 'SO', value: 'Windows 10 Pro' },
    ],
    drivers: lenovoDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://pcsupport.lenovo.com', type: 'PDF' }],
    links: lenovoLinks,
    bios: lenovoBios,
    shortcuts: lenovoShortcuts,
    troubleshooting: [
      { title: 'Puerto USB-C no carga periféricos', steps: ['Comprobar límite de potencia en BIOS', 'Probar con otro cable USB-C', 'Actualizar firmware del equipo'] },
    ],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'Novo Button > System Recovery',
    },
  },
  {
    id: 'dell-optiplex-5090',
    brand: 'Dell',
    model: 'OptiPlex 5090',
    category: 'sobremesas',
    description: 'Sobremesa Micro de gama media con Intel 10ª generación, uso estándar en puestos administrativos.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-10505' },
      { label: 'RAM', value: '8 GB DDR4' },
      { label: 'Almacenamiento', value: '256 GB SSD NVMe' },
      { label: 'Factor de forma', value: 'Micro' },
      { label: 'SO', value: 'Windows 10 Pro' },
    ],
    drivers: dellDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://www.dell.com/support', type: 'PDF' }],
    links: dellLinks,
    bios: dellBios,
    shortcuts: dellShortcuts,
    troubleshooting: [
      { title: 'No reconoce unidad de red', steps: ['Comprobar credenciales de dominio', 'Volver a mapear la unidad de red', 'Verificar conectividad con ping al servidor'] },
    ],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F8 al arrancar > SupportAssist Recovery',
    },
  },
  // --- Portátiles ---
  {
    id: 'hp-elitebook-640',
    brand: 'HP',
    model: 'EliteBook 640 G9',
    category: 'portatiles',
    description: 'Portátil corporativo de 14 pulgadas con Intel 12ª generación, orientado a movilidad ligera.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-1235U' },
      { label: 'RAM', value: '8 GB DDR4' },
      { label: 'Almacenamiento', value: '256 GB SSD NVMe' },
      { label: 'Pantalla', value: '14" FHD IPS' },
      { label: 'SO', value: 'Windows 11 Pro' },
    ],
    drivers: hpDrivers,
    manuals: [
      { name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' },
      { name: 'Guía de reparación', url: 'https://support.hp.com', type: 'PDF' },
    ],
    links: hpLinks,
    bios: hpBios,
    shortcuts: hpShortcuts,
    troubleshooting: [
      { title: 'Pantalla parpadea', steps: ['Actualizar driver de gráficos Intel', 'Comprobar tasa de refresco en Windows', 'Probar con monitor externo para descartar panel'] },
    ],
    notes: ['Portátil estándar de movilidad ligera'],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F11 al arrancar > Troubleshoot > Reset this PC',
    },
  },
  {
    id: 'hp-elitebook-840-g6',
    brand: 'HP',
    model: 'EliteBook 840 G6 Notebook PC',
    category: 'portatiles',
    description: 'Portátil corporativo de 14 pulgadas con Intel 8ª generación, chasis de aluminio y buena autonomía.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-8365U' },
      { label: 'RAM', value: '8 GB DDR4' },
      { label: 'Almacenamiento', value: '256 GB SSD NVMe' },
      { label: 'Pantalla', value: '14" FHD IPS' },
      { label: 'SO', value: 'Windows 10 Pro' },
    ],
    drivers: hpDrivers,
    manuals: [
      { name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' },
      { name: 'Guía de reparación', url: 'https://support.hp.com', type: 'PDF' },
    ],
    links: hpLinks,
    bios: hpBios,
    shortcuts: hpShortcuts,
    troubleshooting: [
      { title: 'Batería se agota rápido', steps: ['Comprobar estado de salud en HP Support Assistant', 'Recalibrar batería (descarga completa + carga)', 'Sustituir batería si el desgaste supera el 40%'] },
      { title: 'Bisagra suelta', steps: ['Revisar apriete de tornillería de bisagras', 'Comprobar cableado de pantalla en la bisagra', 'Enviar a taller si hay rotura de plástico'] },
    ],
    notes: ['Modelo con varias unidades en inventario de préstamo'],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F11 al arrancar > Troubleshoot > Reset this PC',
    },
    history: [{ date: '2025-10-12', event: 'Sustitución de batería' }],
  },
  {
    id: 'hp-elitebook-840-g7',
    brand: 'HP',
    model: 'EliteBook 840 G7 Notebook PC',
    category: 'portatiles',
    description: 'Portátil ultraligero corporativo de 14 pulgadas con Intel 10ª generación y chasis de aluminio.',
    specs: [
      { label: 'CPU', value: 'Intel Core i7-10610U' },
      { label: 'RAM', value: '16 GB DDR4' },
      { label: 'Almacenamiento', value: '512 GB SSD NVMe' },
      { label: 'Pantalla', value: '14" FHD IPS 400 nits' },
      { label: 'SO', value: 'Windows 10 Pro' },
    ],
    drivers: hpDrivers,
    manuals: [
      { name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' },
      { name: 'Guía de reparación', url: 'https://support.hp.com', type: 'PDF' },
    ],
    links: hpLinks,
    bios: hpBios,
    shortcuts: hpShortcuts,
    troubleshooting: [
      { title: 'Batería no carga', steps: ['Verificar cargador 65W', 'Comprobar conector USB-C', 'Actualizar firmware de batería', 'Recalibrar batería'] },
      { title: 'Wi-Fi no detecta redes', steps: ['Verificar interruptor Wi-Fi', 'Reinstalar driver AX201', 'Reset Winsock: netsh winsock reset', 'Actualizar BIOS'] },
    ],
    notes: ['Portátil asignado a dirección', 'Teclado con retroiluminación'],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC > Quitar todo',
      buttons: 'Pulsar F11 al arrancar > Troubleshoot > Reset this PC',
    },
    history: [{ date: '2026-02-01', event: 'Limpieza interna y cambio de pasta térmica' }],
  },
  {
    id: 'hp-elitebook-840-g8',
    brand: 'HP',
    model: 'EliteBook 840 G8 Notebook PC',
    category: 'portatiles',
    description: 'Portátil corporativo de 14 pulgadas con Intel 11ª generación, mejora de cámara y micrófonos.',
    specs: [
      { label: 'CPU', value: 'Intel Core i7-1165G7' },
      { label: 'RAM', value: '16 GB DDR4' },
      { label: 'Almacenamiento', value: '512 GB SSD NVMe' },
      { label: 'Pantalla', value: '14" FHD IPS antirreflejo' },
      { label: 'SO', value: 'Windows 10/11 Pro' },
    ],
    drivers: hpDrivers,
    manuals: [
      { name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' },
      { name: 'Guía de reparación', url: 'https://support.hp.com', type: 'PDF' },
    ],
    links: hpLinks,
    bios: hpBios,
    shortcuts: hpShortcuts,
    troubleshooting: [
      { title: 'Cámara no funciona en videollamadas', steps: ['Comprobar interruptor físico de privacidad de cámara', 'Revisar permisos de cámara en Windows', 'Actualizar driver de la webcam integrada'] },
    ],
    notes: ['Muy usado en teletrabajo y videoconsulta'],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F11 al arrancar > Troubleshoot > Reset this PC',
    },
  },
  {
    id: 'hp-elitebook-840-g9',
    brand: 'HP',
    model: 'EliteBook 840 G9 Notebook PC',
    category: 'portatiles',
    description: 'Portátil corporativo de 14 pulgadas con Intel 12ª generación y mayor rendimiento gráfico integrado.',
    specs: [
      { label: 'CPU', value: 'Intel Core i7-1255U' },
      { label: 'RAM', value: '16 GB DDR5' },
      { label: 'Almacenamiento', value: '512 GB SSD NVMe' },
      { label: 'Pantalla', value: '14" WUXGA IPS' },
      { label: 'SO', value: 'Windows 11 Pro' },
    ],
    drivers: hpDrivers,
    manuals: [
      { name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' },
      { name: 'Guía de reparación', url: 'https://support.hp.com', type: 'PDF' },
    ],
    links: hpLinks,
    bios: hpBios,
    shortcuts: hpShortcuts,
    troubleshooting: [
      { title: 'Ventilador a máxima velocidad constante', steps: ['Actualizar BIOS y HP Support Assistant', 'Revisar procesos en segundo plano con alto consumo de CPU', 'Limpiar rejillas de ventilación'] },
    ],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F11 al arrancar > Troubleshoot > Reset this PC',
    },
    history: [{ date: '2026-01-20', event: 'Actualización de BIOS' }],
  },
  {
    id: 'hp-elitebook-840-g9-14',
    brand: 'HP',
    model: 'EliteBook 840 G9 14" (variante RAM ampliada)',
    category: 'portatiles',
    description: 'Variante del EliteBook 840 G9 con mayor RAM y almacenamiento, asignada a perfiles técnicos.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-1245U' },
      { label: 'RAM', value: '32 GB DDR5' },
      { label: 'Almacenamiento', value: '1 TB SSD NVMe' },
      { label: 'Pantalla', value: '14" WUXGA IPS' },
      { label: 'SO', value: 'Windows 11 Pro' },
    ],
    drivers: hpDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' }],
    links: hpLinks,
    bios: hpBios,
    shortcuts: hpShortcuts,
    troubleshooting: [
      { title: 'Windows Hello no reconoce huella', steps: ['Reinstalar driver del lector de huellas', 'Volver a registrar huella en Configuración > Cuentas', 'Actualizar BIOS si el lector no aparece en Administrador de dispositivos'] },
    ],
    notes: ['Configuración ampliada para uso técnico'],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F11 al arrancar > Troubleshoot > Reset this PC',
    },
  },
  {
    id: 'hp-elitebook-840-g10',
    brand: 'HP',
    model: 'EliteBook 840 G10 Notebook PC',
    category: 'portatiles',
    description: 'Última generación del EliteBook 840, con Intel 13ª generación y mejoras en eficiencia térmica.',
    specs: [
      { label: 'CPU', value: 'Intel Core i7-1355U' },
      { label: 'RAM', value: '16 GB DDR5' },
      { label: 'Almacenamiento', value: '512 GB SSD NVMe' },
      { label: 'Pantalla', value: '14" WUXGA IPS 300 nits' },
      { label: 'SO', value: 'Windows 11 Pro' },
    ],
    drivers: hpDrivers,
    manuals: [
      { name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' },
      { name: 'Guía de reparación', url: 'https://support.hp.com', type: 'PDF' },
    ],
    links: hpLinks,
    bios: hpBios,
    shortcuts: hpShortcuts,
    troubleshooting: [
      { title: 'No sale imagen por USB-C/Thunderbolt', steps: ['Comprobar que el cable soporta DisplayPort Alt Mode', 'Actualizar driver de gráficos', 'Probar con el adaptador HP oficial'] },
    ],
    notes: ['Última remesa entregada a dirección médica'],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F11 al arrancar > Troubleshoot > Reset this PC',
    },
    history: [{ date: '2026-05-06', event: 'Alta en inventario y despliegue de imagen' }],
  },
  {
    id: 'hp-zbook-firefly',
    brand: 'HP',
    model: 'ZBook Firefly 14 G9',
    category: 'portatiles',
    description: 'Estación de trabajo móvil ligera con gráfica dedicada NVIDIA, usada para radiología y edición de imagen.',
    specs: [
      { label: 'CPU', value: 'Intel Core i7-1265U' },
      { label: 'GPU', value: 'NVIDIA T550 4 GB' },
      { label: 'RAM', value: '32 GB DDR5' },
      { label: 'Almacenamiento', value: '1 TB SSD NVMe' },
      { label: 'Pantalla', value: '14" FHD IPS' },
      { label: 'SO', value: 'Windows 11 Pro' },
    ],
    drivers: hpDrivers,
    manuals: [
      { name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' },
      { name: 'Guía de reparación', url: 'https://support.hp.com', type: 'PDF' },
    ],
    links: hpLinks,
    bios: hpBios,
    shortcuts: hpShortcuts,
    troubleshooting: [
      { title: 'Errores gráficos en visor DICOM', steps: ['Actualizar driver NVIDIA a la versión certificada', 'Comprobar perfil de color del monitor', 'Ejecutar diagnóstico de GPU con HP PC Hardware Diagnostics'] },
    ],
    notes: ['Estación de trabajo móvil para diagnóstico por imagen', 'Requiere driver NVIDIA certificado, no usar GeForce genérico'],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F11 al arrancar > Troubleshoot > Reset this PC',
    },
  },
  {
    id: 'lenovo-thinkpad-t14-gen3',
    brand: 'Lenovo',
    model: 'ThinkPad T14 Gen 3',
    category: 'portatiles',
    description: 'Portátil corporativo robusto de 14 pulgadas con Intel 12ª generación, teclado ThinkPad clásico.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-1240P' },
      { label: 'RAM', value: '16 GB DDR4' },
      { label: 'Almacenamiento', value: '512 GB SSD NVMe' },
      { label: 'Pantalla', value: '14" FHD IPS' },
      { label: 'SO', value: 'Windows 11 Pro' },
    ],
    drivers: lenovoDrivers,
    manuals: [
      { name: 'Manual de usuario', url: 'https://pcsupport.lenovo.com', type: 'PDF' },
      { name: 'Guía de mantenimiento', url: 'https://pcsupport.lenovo.com', type: 'PDF' },
    ],
    links: lenovoLinks,
    bios: lenovoBios,
    shortcuts: lenovoShortcuts,
    troubleshooting: [
      { title: 'TrackPoint no responde', steps: ['Comprobar en Lenovo Vantage que el driver está instalado', 'Limpiar el capuchón del TrackPoint', 'Reiniciar el servicio de sinapticos/ELAN'] },
    ],
    notes: ['Muy resistente, apto para uso intensivo'],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'Novo Button > System Recovery',
    },
  },
  {
    id: 'lenovo-thinkpad-x1-carbon-gen10',
    brand: 'Lenovo',
    model: 'ThinkPad X1 Carbon Gen 10',
    category: 'portatiles',
    description: 'Portátil ultraligero premium de fibra de carbono con Intel 12ª generación, asignado a perfiles directivos.',
    specs: [
      { label: 'CPU', value: 'Intel Core i7-1260P' },
      { label: 'RAM', value: '16 GB LPDDR5' },
      { label: 'Almacenamiento', value: '1 TB SSD NVMe' },
      { label: 'Pantalla', value: '14" WUXGA IPS' },
      { label: 'Peso', value: '1.12 kg' },
      { label: 'SO', value: 'Windows 11 Pro' },
    ],
    drivers: lenovoDrivers,
    manuals: [
      { name: 'Manual de usuario', url: 'https://pcsupport.lenovo.com', type: 'PDF' },
      { name: 'Guía de reparación', url: 'https://pcsupport.lenovo.com', type: 'PDF' },
    ],
    links: lenovoLinks,
    bios: lenovoBios,
    shortcuts: lenovoShortcuts,
    troubleshooting: [
      { title: 'Se calienta en la base', steps: ['Actualizar BIOS y Lenovo Vantage', 'Limpiar salidas de ventilación', 'Comprobar modo de rendimiento en Lenovo Vantage'] },
    ],
    notes: ['Asignado a dirección médica', 'Extremadamente ligero, manipular con cuidado'],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'Novo Button > System Recovery',
    },
    history: [{ date: '2025-12-05', event: 'Entrega inicial con imagen corporativa' }],
  },
  {
    id: 'lenovo-thinkpad-e14',
    brand: 'Lenovo',
    model: 'ThinkPad E14 Gen 4',
    category: 'portatiles',
    description: 'Portátil corporativo de gama media con procesador AMD, buena relación prestaciones/precio.',
    specs: [
      { label: 'CPU', value: 'AMD Ryzen 5 5625U' },
      { label: 'RAM', value: '8 GB DDR4' },
      { label: 'Almacenamiento', value: '256 GB SSD NVMe' },
      { label: 'Pantalla', value: '14" FHD IPS' },
      { label: 'SO', value: 'Windows 10/11 Pro' },
    ],
    drivers: lenovoDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://pcsupport.lenovo.com', type: 'PDF' }],
    links: lenovoLinks,
    bios: lenovoBios,
    shortcuts: lenovoShortcuts,
    troubleshooting: [
      { title: 'Se apaga bajo carga', steps: ['Comprobar temperaturas con HWMonitor', 'Verificar estado de la batería', 'Actualizar BIOS'] },
    ],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'Novo Button > System Recovery',
    },
  },
  {
    id: 'toshiba-tecra-a50',
    brand: 'Toshiba',
    model: 'Tecra A50-E',
    category: 'portatiles',
    description: 'Portátil corporativo de 15.6 pulgadas, modelo legado con buena robustez de teclado y chasis.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-8250U' },
      { label: 'RAM', value: '8 GB DDR4' },
      { label: 'Almacenamiento', value: '256 GB SSD' },
      { label: 'Pantalla', value: '15.6" FHD' },
      { label: 'SO', value: 'Windows 10 Pro' },
    ],
    drivers: toshibaDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://dynabook.com/support', type: 'PDF' }],
    links: toshibaLinks,
    bios: toshibaBios,
    shortcuts: toshibaShortcuts,
    troubleshooting: [
      { title: 'Bisagra de pantalla floja', steps: ['Revisar apriete de tornillos de bisagra', 'Comprobar desgaste de plástico de anclaje', 'Enviar a taller si hay holgura excesiva'] },
      { title: 'Puerto USB no reconoce dispositivos', steps: ['Probar en otro puerto USB', 'Actualizar drivers de chipset', 'Comprobar en Administrador de dispositivos si aparece con error'] },
    ],
    notes: ['Modelo en fase final de vida útil'],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F8 al arrancar > Toshiba Recovery',
    },
  },
  {
    id: 'toshiba-satellite-a40-c',
    brand: 'Toshiba',
    model: 'Satellite Pro A40-C',
    category: 'portatiles',
    description: 'Portátil corporativo de 14 pulgadas, modelo robusto orientado a usuarios móviles.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-6200U' },
      { label: 'RAM', value: '8 GB DDR4' },
      { label: 'Almacenamiento', value: '256 GB SSD' },
      { label: 'Pantalla', value: '14" FHD' },
      { label: 'SO', value: 'Windows 7/10 Pro' },
    ],
    drivers: toshibaDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://dynabook.com/support', type: 'PDF' }],
    links: toshibaLinks,
    bios: toshibaBios,
    shortcuts: toshibaShortcuts,
    troubleshooting: [
      { title: 'No conecta a WiFi', steps: ['Actualizar drivers de red Realtek', 'Comprobar que WiFi está habilitado (botón Fn)', 'Reiniciar el adaptador en Administrador de dispositivos'] },
    ],
    notes: ['Fecha Fin Garantía SAP: 31/07/2021', 'Modelo en fase final de vida útil'],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F8 al arrancar > Toshiba Recovery',
    },
  },
  {
    id: 'fujitsu-lifebook-e559',
    brand: 'Fujitsu-Siemens',
    model: 'LifeBook E5510 / E559',
    category: 'portatiles',
    description: 'Portátil corporativo de 15.6 pulgadas orientado a puestos administrativos con uso moderado.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-8265U' },
      { label: 'RAM', value: '8 GB DDR4' },
      { label: 'Almacenamiento', value: '256 GB SSD' },
      { label: 'Pantalla', value: '15.6" FHD' },
      { label: 'SO', value: 'Windows 10 Pro' },
    ],
    drivers: fujitsuDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://support.ts.fujitsu.com', type: 'PDF' }],
    links: fujitsuLinks,
    bios: fujitsuBios,
    shortcuts: fujitsuShortcuts,
    troubleshooting: [
      { title: 'No arranca desde USB', steps: ['Comprobar orden de arranque en BIOS', 'Deshabilitar Secure Boot temporalmente', 'Formatear USB en FAT32 con etiqueta de arranque'] },
    ],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F8 al arrancar > Windows Recovery',
    },
  },
  {
    id: 'hp-elitebook-850-g7',
    brand: 'HP',
    model: 'EliteBook 850 G7 Notebook PC',
    category: 'portatiles',
    description: 'Portátil corporativo de 15.6 pulgadas con Intel 10ª generación, versión ampliada del 840 G7.',
    specs: [
      { label: 'CPU', value: 'Intel Core i7-10510U' },
      { label: 'RAM', value: '16 GB DDR4' },
      { label: 'Almacenamiento', value: '512 GB SSD NVMe' },
      { label: 'Pantalla', value: '15.6" FHD IPS' },
      { label: 'SO', value: 'Windows 10 Pro' },
    ],
    drivers: hpDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' }],
    links: hpLinks,
    bios: hpBios,
    shortcuts: hpShortcuts,
    troubleshooting: [
      { title: 'Teclado numérico no funciona', steps: ['Comprobar tecla Bloq Num', 'Reinstalar driver de teclado', 'Probar teclado externo para descartar fallo de hardware'] },
    ],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F11 al arrancar > Troubleshoot > Reset this PC',
    },
  },
  {
    id: 'lenovo-thinkpad-l14',
    brand: 'Lenovo',
    model: 'ThinkPad L14 Gen 2',
    category: 'portatiles',
    description: 'Portátil corporativo de gama media-alta de 14 pulgadas, buen equilibrio de robustez y peso.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-1135G7' },
      { label: 'RAM', value: '8 GB DDR4' },
      { label: 'Almacenamiento', value: '256 GB SSD NVMe' },
      { label: 'Pantalla', value: '14" FHD IPS' },
      { label: 'SO', value: 'Windows 10/11 Pro' },
    ],
    drivers: lenovoDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://pcsupport.lenovo.com', type: 'PDF' }],
    links: lenovoLinks,
    bios: lenovoBios,
    shortcuts: lenovoShortcuts,
    troubleshooting: [
      { title: 'Altavoces sin sonido', steps: ['Comprobar dispositivo de reproducción predeterminado', 'Reinstalar driver de audio Realtek', 'Actualizar BIOS'] },
    ],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'Novo Button > System Recovery',
    },
  },
  {
    id: 'dell-latitude-5420',
    brand: 'Dell',
    model: 'Latitude 5420',
    category: 'portatiles',
    description: 'Portátil corporativo de 14 pulgadas con Intel 11ª generación, chasis reforzado MIL-STD.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-1135G7' },
      { label: 'RAM', value: '16 GB DDR4' },
      { label: 'Almacenamiento', value: '256 GB SSD NVMe' },
      { label: 'Pantalla', value: '14" FHD IPS' },
      { label: 'SO', value: 'Windows 10/11 Pro' },
    ],
    drivers: dellDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://www.dell.com/support', type: 'PDF' }],
    links: dellLinks,
    bios: dellBios,
    shortcuts: dellShortcuts,
    troubleshooting: [
      { title: 'Batería no llega al 100%', steps: ['Ejecutar Dell SupportAssist > Battery Check', 'Recalibrar batería en BIOS', 'Sustituir batería si la capacidad es inferior al 60%'] },
    ],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F8 al arrancar > SupportAssist Recovery',
    },
    history: [{ date: '2025-08-30', event: 'Recalibración de batería' }],
  },
  // --- Impresoras ---
  {
    id: 'hp-laserjet-m404dn',
    brand: 'HP',
    model: 'LaserJet M404DN',
    category: 'impresoras',
    description: 'Impresora láser monocromo de red, uso departamental de alto volumen.',
    specs: [
      { label: 'Tipo', value: 'Láser monocromo' },
      { label: 'Velocidad', value: '38 ppm' },
      { label: 'Conectividad', value: 'Ethernet, USB' },
      { label: 'Ciclo de trabajo', value: 'Hasta 80.000 páginas/mes' },
      { label: 'Dúplex', value: 'Automático' },
    ],
    drivers: [
      { name: 'Driver universal PCL6', url: 'https://support.hp.com', os: 'Windows 10/11 64-bit', version: '7.2.0' },
      { name: 'HP Smart App', url: 'https://support.hp.com', os: 'Windows/macOS', version: '2024.1' },
    ],
    manuals: [
      { name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' },
      { name: 'Guía de instalación de tóner', url: 'https://support.hp.com', type: 'PDF' },
    ],
    links: hpLinks,
    troubleshooting: [
      { title: 'Atasco de papel recurrente', steps: ['Retirar papel siguiendo dirección de salida', 'Limpiar rodillos con paño sin pelusa', 'Comprobar que el papel no está húmedo', 'Revisar bandeja de entrada por desalineación'] },
      { title: 'Rayas verticales en la impresión', steps: ['Sustituir cartucho de tóner', 'Limpiar la unidad de fusor', 'Ejecutar página de limpieza desde el panel'] },
    ],
    printerInfo: {
      ip: '192.168.1.40',
      dhcp: true,
      firmware: '20240115',
      maintenance: ['Sustituir tóner cada ~9000 páginas', 'Limpiar rodillos de alimentación cada 6 meses'],
      testPage: 'Panel > Informes > Página de configuración',
      cleaning: ['Ejecutar limpieza de fusor desde el panel de control', 'Usar hoja de limpieza específica HP'],
      consumables: [{ name: 'Cartucho de tóner 59A', code: 'CF259A', yield: '3000 páginas' }],
    },
    notes: ['Impresora departamental compartida en red'],
    factoryReset: {
      software: 'Panel de control > Configuración > Restablecer > Restaurar valores de fábrica',
      buttons: 'Mantener botón de cancelar 20 segundos durante el encendido',
    },
  },
  {
    id: 'brother-hl-5250',
    brand: 'Brother',
    model: 'HL-5250DN',
    category: 'impresoras',
    description: 'Impresora láser monocromo de red compacta, uso en despachos y consultas.',
    specs: [
      { label: 'Tipo', value: 'Láser monocromo' },
      { label: 'Velocidad', value: '30 ppm' },
      { label: 'Conectividad', value: 'Ethernet, USB' },
      { label: 'Dúplex', value: 'Manual' },
    ],
    drivers: [{ name: 'Driver de impresora', url: 'https://support.brother.com', os: 'Windows 10/11 64-bit', version: '1.4.2' }],
    manuals: [{ name: 'Manual de usuario', url: 'https://support.brother.com', type: 'PDF' }],
    links: [{ name: 'Soporte Brother', url: 'https://support.brother.com' }],
    troubleshooting: [
      { title: 'No conecta por red', steps: ['Imprimir configuración de red desde el panel', 'Comprobar cable Ethernet y switch', 'Reiniciar impresora'] },
    ],
    printerInfo: {
      ip: '192.168.1.42',
      dhcp: true,
      maintenance: ['Sustituir tóner cuando se indique en pantalla'],
      testPage: 'Mantener pulsado Go 4 veces para imprimir configuración de red',
      cleaning: ['Limpiar el tambor con la herramienta incluida'],
      consumables: [{ name: 'Tóner TN-3170', code: 'TN3170', yield: '7000 páginas' }],
    },
    factoryReset: {
      software: 'Panel > Ajustes > Todos los ajustes > Config. inicial > Restablecer',
      buttons: 'Mantener pulsado Go durante el encendido',
    },
  },
  {
    id: 'brother-5215dw',
    brand: 'Brother',
    model: '5215DW',
    category: 'impresoras',
    description: 'Impresora láser monocromo compacta con dúplex e inalámbrica, uso en despachos pequeños.',
    specs: [
      { label: 'Tipo', value: 'Láser monocromo' },
      { label: 'Velocidad', value: '32 ppm' },
      { label: 'Conectividad', value: 'WiFi, Ethernet, USB' },
      { label: 'Dúplex', value: 'Automático' },
    ],
    drivers: [{ name: 'Driver de impresora', url: 'https://support.brother.com', os: 'Windows 10/11 64-bit', version: '1.4.2' }],
    manuals: [{ name: 'Manual de usuario', url: 'https://support.brother.com', type: 'PDF' }],
    links: [{ name: 'Soporte Brother', url: 'https://support.brother.com' }],
    troubleshooting: [
      { title: 'No conecta por WiFi', steps: ['Ejecutar informe de red desde el panel', 'Volver a introducir contraseña WiFi', 'Reiniciar router e impresora'] },
    ],
    printerInfo: {
      ip: '192.168.1.43',
      dhcp: true,
      maintenance: ['Sustituir tóner cuando se indique en pantalla'],
      testPage: 'Mantener pulsado Go 4 veces para imprimir configuración de red',
      cleaning: ['Limpiar el tambor con la herramienta incluida'],
      consumables: [{ name: 'Tóner TN-2420', code: 'TN2420', yield: '3000 páginas' }],
    },
    factoryReset: {
      software: 'Panel > Ajustes > Todos los ajustes > Config. inicial > Restablecer',
      buttons: 'Mantener pulsado Cancel durante el encendido',
    },
  },
  {
    id: 'canon-252',
    brand: 'Canon',
    model: 'imageRUNNER 252',
    category: 'impresoras',
    description: 'Multifunción láser monocromo departamental con acabados y gran capacidad de papel.',
    specs: [
      { label: 'Tipo', value: 'Láser monocromo multifunción' },
      { label: 'Velocidad', value: '25 ppm' },
      { label: 'Conectividad', value: 'Ethernet, USB' },
      { label: 'Escáner', value: 'ADF dúplex' },
    ],
    drivers: [{ name: 'Generic Plus PCL6', url: 'https://www.canon.es/support', os: 'Windows 10/11 64-bit', version: '3.11' }],
    manuals: [{ name: 'Manual de usuario', url: 'https://www.canon.es/support', type: 'PDF' }],
    links: [{ name: 'Soporte Canon', url: 'https://www.canon.es/support' }],
    troubleshooting: [
      { title: 'Copias con sombras', steps: ['Limpiar cristal de exposición', 'Comprobar ajuste de densidad de copia', 'Limpiar unidad de exposición interna'] },
    ],
    printerInfo: {
      ip: '192.168.1.44',
      dhcp: false,
      maintenance: ['Contrato de renting con mantenimiento incluido'],
      testPage: 'Panel > Contador > Imprimir lista de datos de usuario',
      cleaning: ['Limpieza de cristal y ADF diaria'],
      consumables: [{ name: 'Tóner NPG-59', code: 'NPG59', yield: '15000 páginas' }],
    },
    notes: ['Equipo en renting, contactar proveedor para averías mayores'],
    factoryReset: {
      software: 'Panel > Ajustes de dispositivo > Gestión > Restaurar ajustes predeterminados',
      buttons: 'No disponible por botón físico',
    },
  },
  {
    id: 'canon-6650',
    brand: 'Canon',
    model: 'imageRUNNER ADVANCE 6650',
    category: 'impresoras',
    description: 'Multifunción láser monocromo departamental de gran volumen, con acabados y bandejas de gran capacidad.',
    specs: [
      { label: 'Tipo', value: 'Láser monocromo multifunción' },
      { label: 'Velocidad', value: '65 ppm' },
      { label: 'Conectividad', value: 'Ethernet' },
      { label: 'Escáner', value: 'ADF dúplex' },
    ],
    drivers: [{ name: 'Generic Plus PCL6', url: 'https://www.canon.es/support', os: 'Windows 10/11 64-bit', version: '3.11' }],
    manuals: [{ name: 'Manual de usuario', url: 'https://www.canon.es/support', type: 'PDF' }],
    links: [{ name: 'Soporte Canon', url: 'https://www.canon.es/support' }],
    troubleshooting: [
      { title: 'Cola de impresión bloqueada', steps: ['Reiniciar servicio de cola de impresión en el servidor', 'Eliminar trabajos atascados en el spooler', 'Reiniciar la impresora'] },
    ],
    printerInfo: {
      ip: '192.168.1.45',
      dhcp: false,
      maintenance: ['Contrato de renting con mantenimiento incluido'],
      testPage: 'Panel > Contador > Imprimir lista de datos de usuario',
      cleaning: ['Limpieza de cristal y ADF diaria'],
      consumables: [{ name: 'Tóner C-EXV', code: 'CEXV', yield: '36000 páginas' }],
    },
    notes: ['Equipo en renting, contactar proveedor para averías mayores'],
    factoryReset: {
      software: 'Panel > Ajustes de dispositivo > Gestión > Restaurar ajustes predeterminados',
      buttons: 'No disponible por botón físico',
    },
  },
  {
    id: 'canon-6670',
    brand: 'Canon',
    model: 'imageRUNNER ADVANCE 6670',
    category: 'impresoras',
    description: 'Multifunción láser monocromo departamental de muy alto volumen, con acabados y bandejas de gran capacidad.',
    specs: [
      { label: 'Tipo', value: 'Láser monocromo multifunción' },
      { label: 'Velocidad', value: '70 ppm' },
      { label: 'Conectividad', value: 'Ethernet' },
      { label: 'Escáner', value: 'ADF dúplex' },
    ],
    drivers: [{ name: 'Generic Plus PCL6', url: 'https://www.canon.es/support', os: 'Windows 10/11 64-bit', version: '3.11' }],
    manuals: [{ name: 'Manual de usuario', url: 'https://www.canon.es/support', type: 'PDF' }],
    links: [{ name: 'Soporte Canon', url: 'https://www.canon.es/support' }],
    troubleshooting: [
      { title: 'Cola de impresión bloqueada', steps: ['Reiniciar servicio de cola de impresión en el servidor', 'Eliminar trabajos atascados en el spooler', 'Reiniciar la impresora'] },
    ],
    printerInfo: {
      ip: '192.168.1.46',
      dhcp: false,
      maintenance: ['Contrato de renting con mantenimiento incluido'],
      testPage: 'Panel > Contador > Imprimir lista de datos de usuario',
      cleaning: ['Limpieza de cristal y ADF diaria'],
      consumables: [{ name: 'Tóner C-EXV', code: 'CEXV', yield: '36000 páginas' }],
    },
    notes: ['Equipo en renting, contactar proveedor para averías mayores'],
    factoryReset: {
      software: 'Panel > Ajustes de dispositivo > Gestión > Restaurar ajustes predeterminados',
      buttons: 'No disponible por botón físico',
    },
  },
  {
    id: 'ricoh-im-c3000',
    brand: 'Ricoh',
    model: 'IM C3000',
    category: 'impresoras',
    description: 'Multifunción color departamental de gran volumen, con acabados y bandejas de gran capacidad.',
    specs: [
      { label: 'Tipo', value: 'Láser color multifunción' },
      { label: 'Velocidad', value: '30 ppm' },
      { label: 'Conectividad', value: 'Ethernet, WiFi opcional' },
      { label: 'Panel', value: 'Táctil 10.1"' },
    ],
    drivers: [{ name: 'Driver universal PCL6', url: 'https://www.ricoh.es/support', os: 'Windows 10/11 64-bit', version: '4.2' }],
    manuals: [{ name: 'Manual de usuario', url: 'https://www.ricoh.es/support', type: 'PDF' }],
    links: [{ name: 'Soporte Ricoh', url: 'https://www.ricoh.es/support' }],
    troubleshooting: [
      { title: 'Grapadora no funciona', steps: ['Comprobar cartucho de grapas', 'Retirar atasco en unidad de acabado', 'Reiniciar unidad de acabado desde el panel'] },
    ],
    printerInfo: {
      ip: '192.168.1.45',
      dhcp: false,
      maintenance: ['Contrato de mantenimiento con proveedor externo, avisar a compras ante consumibles bajos'],
      testPage: 'Panel > Herramientas de usuario > Lista de configuración',
      cleaning: ['Limpieza de cristal de exposición diaria'],
      consumables: [{ name: 'Tóner color (CMYK)', code: 'IMC3000-TN', yield: '26000 páginas' }],
    },
    notes: ['Impresora departamental de alto volumen, contrato con proveedor externo'],
    factoryReset: {
      software: 'Herramientas de usuario > Ajustes del sistema > Restaurar valores predeterminados',
      buttons: 'No accesible por botón físico',
    },
  },
  {
    id: 'kyocera-ecosys-p3045dn',
    brand: 'Kyocera',
    model: 'ECOSYS P3045DN',
    category: 'impresoras',
    description: 'Impresora láser monocromo de red, el modelo Kyocera más extendido en el hospital, con numerosas unidades desplegadas en distintos servicios.',
    specs: [
      { label: 'Tipo', value: 'Láser monocromo' },
      { label: 'Velocidad', value: '45 ppm' },
      { label: 'Conectividad', value: 'Ethernet, USB' },
      { label: 'Dúplex', value: 'Automático' },
    ],
    drivers: [{ name: 'Driver KX', url: 'https://www.kyoceradocumentsolutions.es', os: 'Windows 10/11 64-bit', version: '9.3' }],
    manuals: [{ name: 'Manual de usuario', url: 'https://www.kyoceradocumentsolutions.es', type: 'PDF' }],
    links: [{ name: 'Soporte Kyocera', url: 'https://www.kyoceradocumentsolutions.es' }],
    troubleshooting: [
      { title: 'Impresión muy tenue', steps: ['Comprobar nivel de tóner', 'Agitar el cartucho de tóner', 'Limpiar unidad de carga'] },
    ],
    printerInfo: {
      ip: '192.168.1.47',
      dhcp: true,
      maintenance: ['Sustituir tóner según indicador de panel'],
      testPage: 'Panel > Imprimir informe > Página de estado',
      cleaning: ['Limpiar rodillos de alimentación cada 6 meses'],
      consumables: [{ name: 'Tóner TK-3190', code: 'TK3190', yield: '25000 páginas' }],
    },
    notes: ['Modelo con más unidades en el hospital; varias dadas de baja por obsolescencia o desgaste (SAP 697617, 697919, 697933, 697940, etc.)'],
    factoryReset: {
      software: 'Menú de sistema > Restablecer > Inicializar sistema',
      buttons: 'No accesible por botón físico',
    },
  },
  {
    id: 'epson-ecotank-et-m1170',
    brand: 'Epson',
    model: 'EcoTank ET-M1170',
    category: 'impresoras',
    description: 'Impresora de inyección de tinta monocromo con depósito recargable, bajo coste por página.',
    specs: [
      { label: 'Tipo', value: 'Inyección de tinta monocromo' },
      { label: 'Velocidad', value: '20 ppm' },
      { label: 'Conectividad', value: 'Ethernet, WiFi, USB' },
      { label: 'Depósito', value: 'Tinta recargable EcoTank' },
    ],
    drivers: [{ name: 'Driver de impresora Epson', url: 'https://www.epson.es/support', os: 'Windows 10/11 64-bit', version: '3.7' }],
    manuals: [{ name: 'Manual de usuario', url: 'https://www.epson.es/support', type: 'PDF' }],
    links: [{ name: 'Soporte Epson', url: 'https://www.epson.es/support' }],
    troubleshooting: [
      { title: 'Cabezal obstruido', steps: ['Ejecutar limpieza de cabezales desde el panel', 'Ejecutar patrón de comprobación de inyectores', 'Repetir limpieza si persisten líneas blancas'] },
    ],
    printerInfo: {
      ip: '192.168.1.48',
      dhcp: true,
      maintenance: ['Rellenar depósito de tinta cuando el nivel sea bajo', 'Sustituir almohadillas de mantenimiento cada ~2 años'],
      testPage: 'Panel > Configuración > Imprimir hoja de estado',
      cleaning: ['Ejecutar limpieza automática de cabezales desde el panel'],
      consumables: [{ name: 'Botella de tinta negra 001', code: 'T03Y1', yield: '6000 páginas' }],
    },
    factoryReset: {
      software: 'Panel > Configuración > Restaurar ajustes predeterminados',
      buttons: 'No accesible por botón físico',
    },
  },
  {
    id: 'zebra-zd420',
    brand: 'Zebra',
    model: 'ZD420',
    category: 'impresoras',
    description: 'Impresora térmica de etiquetas conectividad USB y Bluetooth.',
    specs: [
      { label: 'Tipo', value: 'Transferencia térmica directa' },
      { label: 'Resolución', value: '203 dpi (8 dots/mm)' },
      { label: 'Ancho impresión', value: '168 mm (4 pulg)' },
      { label: 'Conectividad', value: 'USB, Bluetooth, WiFi (opcional)' },
    ],
    drivers: zebraDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://www.zebra.com/support', type: 'PDF' }],
    links: zebraLinks,
    shortcuts: [
      'Pause + Cancel (2s) - Calibración',
      'Cancel (2s) - Imprimir configuración',
      'Pause + Feed (5s) - Factory Reset',
      'Feed + Cancel - Modo de diagnóstico',
    ],
    troubleshooting: [
      { title: 'No imprime', steps: ['Verificar conexión USB', 'Comprobar que el driver ZDesigner está instalado', 'Calibrar sensores'] },
      { title: 'Calidad de impresión baja', steps: ['Limpiar cabezal con alcohol isopropílico', 'Verificar tipo de etiqueta', 'Ajustar oscuridad en driver'] },
    ],
    zebraInfo: zebraInfo(),
    printerInfo: zebraPrinterInfo('192.168.1.60'),
    factoryReset: {
      software: 'Zebra Setup Utilities > Manage > Restore Factory Defaults',
      buttons: 'Apagar, mantener Pause + Feed, encender y mantener 5 segundos, soltar',
    },
    notes: ['Impresora térmica de etiquetas', 'Usar solo etiquetas certificadas'],
  },
  {
    id: 'zebra-gk420t',
    brand: 'Zebra',
    model: 'GK420t',
    category: 'impresoras',
    description: 'Impresora térmica de etiquetas de gama de entrada, modelo legado muy extendido en el hospital.',
    specs: [
      { label: 'Tipo', value: 'Transferencia térmica directa/transferencia' },
      { label: 'Resolución', value: '203 dpi' },
      { label: 'Ancho impresión', value: '104 mm' },
      { label: 'Conectividad', value: 'USB, Serie, Paralelo' },
    ],
    drivers: zebraDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://www.zebra.com/support', type: 'PDF' }],
    links: zebraLinks,
    shortcuts: [
      'Pause + Feed (5s) - Factory Reset',
      'Feed - Avanzar etiqueta',
    ],
    troubleshooting: [
      { title: 'LED parpadea en rojo', steps: ['Comprobar que la tapa está bien cerrada', 'Verificar que no falta cinta/ribbon', 'Revisar si hay atasco de etiquetas'] },
    ],
    zebraInfo: zebraInfo(),
    printerInfo: zebraPrinterInfo(undefined, false, 'v53.17.13Z'),
    factoryReset: {
      software: 'Zebra Setup Utilities > Manage > Restore Factory Defaults',
      buttons: 'Apagar, mantener Pause + Feed, encender y mantener 5 segundos, soltar',
    },
    notes: ['Modelo legado, en sustitución progresiva por ZD420'],
  },
  {
    id: 'tsc-te200',
    brand: 'TSC',
    model: 'TE200',
    category: 'impresoras',
    description: 'Impresora térmica de etiquetas de entrada, usada como alternativa económica a Zebra.',
    specs: [
      { label: 'Tipo', value: 'Transferencia térmica directa/transferencia' },
      { label: 'Resolución', value: '203 dpi' },
      { label: 'Ancho impresión', value: '108 mm' },
      { label: 'Conectividad', value: 'USB, Serie' },
    ],
    drivers: [{ name: 'Driver Seagull/TSC', url: 'https://www.tscprinters.com/support', os: 'Windows 10/11', version: '2023.06' }],
    manuals: [{ name: 'Manual de usuario', url: 'https://www.tscprinters.com/support', type: 'PDF' }],
    links: [{ name: 'Soporte TSC', url: 'https://www.tscprinters.com/support' }],
    shortcuts: [
      'Feed (2s) durante encendido - Calibración de sensor',
      'Feed + Power - Restaurar valores de fábrica',
    ],
    troubleshooting: [
      { title: 'No calibra correctamente', steps: ['Verificar tipo de sensor (gap/black mark) en el driver', 'Limpiar sensor de etiqueta con aire comprimido', 'Repetir calibración con el rollo correcto instalado'] },
    ],
    zebraInfo: {
      calibration: ['Apagar la impresora', 'Mantener pulsado Feed', 'Encender manteniendo Feed 2 segundos', 'Soltar al detectar la etiqueta'],
      feed: 'Pulsación corta de Feed - Avanza una etiqueta',
      pause: 'No dispone de botón de pausa dedicado',
      sensor: 'Sensor de brecha (gap) configurable por software',
      configLabel: 'Mantener Feed 10 segundos - Imprime etiqueta de autoprueba',
      reset: ['Apagar la impresora', 'Mantener pulsado Feed', 'Encender manteniendo Feed 10 segundos', 'Soltar cuando el LED parpadee rápido'],
      combinations: ['Feed (2s) - Calibración', 'Feed (10s) - Reset de fábrica'],
    },
    printerInfo: {
      dhcp: false,
      firmware: 'V1.02',
      maintenance: ['Limpiar cabezal cada 300m de etiquetas'],
      testPage: 'Mantener pulsado Feed 10 segundos durante el encendido',
      cleaning: ['Usar alcohol isopropílico en cabezal y rodillo'],
      consumables: [{ name: 'Etiquetas térmicas 4x6"', code: 'TSC-ECO', yield: '1000 etiquetas/rollo' }],
    },
    factoryReset: {
      software: 'TSC Console > Printer Configuration > Factory Default',
      buttons: 'Mantener Feed 10 segundos durante el encendido',
    },
    notes: ['Alternativa económica para etiquetado de bajo volumen'],
  },
  // --- Monitores ---
  {
    id: 'hp-e24-g5',
    brand: 'HP',
    model: 'E24 G5',
    category: 'monitores',
    description: 'Monitor corporativo de 24 pulgadas Full HD con panel IPS, uso general en puestos de oficina.',
    specs: [
      { label: 'Tamaño', value: '23.8"' },
      { label: 'Resolución', value: '1920x1080' },
      { label: 'Panel', value: 'IPS' },
      { label: 'Conectividad', value: 'HDMI, DisplayPort, VGA' },
      { label: 'VESA', value: '100x100 mm' },
    ],
    drivers: [],
    manuals: [{ name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' }],
    links: hpLinks,
    monitorInfo: {
      reset: 'Menú OSD > Gestión > Restablecer valores de fábrica',
      osd: 'Botón central del joystick OSD (parte inferior derecha)',
      serviceMode: 'No aplica en este modelo',
      factoryMode: 'Menú OSD > Gestión > Restablecer',
      osdUnlock: 'Mantener pulsado el botón de menú 10 segundos si el OSD está bloqueado',
      buttonCombos: ['Mantener Menú 10s - Bloquear/desbloquear OSD', 'Menú > Gestión > Restablecer - Reset de fábrica'],
      calibration: 'Ajustar brillo/contraste desde el OSD; para color exacto usar HP Display Assistant',
    },
    troubleshooting: [
      { title: 'Sin señal', steps: ['Comprobar cable de vídeo bien conectado', 'Probar otro puerto (HDMI/DP)', 'Comprobar que el PC está encendido y no en suspensión'] },
    ],
    notes: ['Monitor estándar en puestos de oficina'],
  },
  {
    id: 'hp-e27-g5',
    brand: 'HP',
    model: 'E27 G5',
    category: 'monitores',
    description: 'Monitor corporativo de 27 pulgadas Full HD con panel IPS y ajuste de altura.',
    specs: [
      { label: 'Tamaño', value: '27"' },
      { label: 'Resolución', value: '1920x1080' },
      { label: 'Panel', value: 'IPS' },
      { label: 'Conectividad', value: 'HDMI, DisplayPort, USB-C' },
      { label: 'Ajuste', value: 'Altura, inclinación, giro' },
    ],
    drivers: [],
    manuals: [{ name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' }],
    links: hpLinks,
    monitorInfo: {
      reset: 'Menú OSD > Gestión > Restablecer valores de fábrica',
      osd: 'Botón central del joystick OSD',
      buttonCombos: ['Mantener Menú 10s - Bloquear/desbloquear OSD', 'Menú > Gestión > Restablecer - Reset de fábrica'],
      calibration: 'Usar HP Display Assistant para perfil de color ICC',
    },
    troubleshooting: [
      { title: 'Parpadeo intermitente', steps: ['Comprobar cable DisplayPort/HDMI en ambos extremos', 'Probar con otro cable', 'Actualizar driver gráfico del equipo conectado'] },
    ],
  },
  {
    id: 'hp-m27fw',
    brand: 'HP',
    model: 'M27fw',
    category: 'monitores',
    description: 'Monitor doméstico/oficina de 27 pulgadas Full HD con altavoces integrados.',
    specs: [
      { label: 'Tamaño', value: '27"' },
      { label: 'Resolución', value: '1920x1080' },
      { label: 'Panel', value: 'IPS' },
      { label: 'Conectividad', value: 'HDMI x2' },
      { label: 'Audio', value: 'Altavoces integrados' },
    ],
    drivers: [],
    manuals: [{ name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' }],
    links: hpLinks,
    monitorInfo: {
      reset: 'Menú OSD > Restablecer',
      osd: 'Botón de joystick inferior',
      buttonCombos: ['Mantener botón de encendido 4s - Apagado forzado', 'Menú > Restablecer - Reset de fábrica'],
      calibration: 'Ajuste manual desde el menú OSD, sin software dedicado',
    },
    troubleshooting: [
      { title: 'Sin sonido por altavoces integrados', steps: ['Comprobar que el cable HDMI transporta audio', 'Seleccionar el monitor como dispositivo de salida en Windows', 'Subir volumen desde el OSD'] },
    ],
  },
  {
    id: 'lenovo-thinkvision-t24i',
    brand: 'Lenovo',
    model: 'ThinkVision T24i-20',
    category: 'monitores',
    description: 'Monitor corporativo de 23.8 pulgadas Full HD, estándar en puestos ThinkCentre.',
    specs: [
      { label: 'Tamaño', value: '23.8"' },
      { label: 'Resolución', value: '1920x1080' },
      { label: 'Panel', value: 'IPS' },
      { label: 'Conectividad', value: 'HDMI, DisplayPort, VGA' },
    ],
    drivers: [],
    manuals: [{ name: 'Manual de usuario', url: 'https://pcsupport.lenovo.com', type: 'PDF' }],
    links: lenovoLinks,
    monitorInfo: {
      reset: 'Menú OSD > Reset > Factory Reset',
      osd: 'Botones físicos frontales o joystick según revisión',
      buttonCombos: ['Menú > Reset > Factory Reset - Restaurar valores', 'Mantener Menú 5s - Bloquear OSD'],
      calibration: 'Ajuste manual desde OSD',
    },
    troubleshooting: [
      { title: 'Colores desvaídos', steps: ['Restablecer valores de fábrica desde el OSD', 'Comprobar modo de color seleccionado', 'Probar con otro cable de vídeo'] },
    ],
  },
  {
    id: 'lenovo-thinkvision-t27i',
    brand: 'Lenovo',
    model: 'ThinkVision T27i-20',
    category: 'monitores',
    description: 'Monitor corporativo de 27 pulgadas Full HD con hub USB integrado.',
    specs: [
      { label: 'Tamaño', value: '27"' },
      { label: 'Resolución', value: '1920x1080' },
      { label: 'Panel', value: 'IPS' },
      { label: 'Conectividad', value: 'HDMI, DisplayPort, USB hub' },
    ],
    drivers: [],
    manuals: [{ name: 'Manual de usuario', url: 'https://pcsupport.lenovo.com', type: 'PDF' }],
    links: lenovoLinks,
    monitorInfo: {
      reset: 'Menú OSD > Reset > Factory Reset',
      osd: 'Joystick frontal inferior derecho',
      buttonCombos: ['Menú > Reset > Factory Reset - Restaurar valores', 'Mantener Menú 5s - Bloquear OSD'],
      calibration: 'Ajuste manual desde OSD',
    },
    troubleshooting: [
      { title: 'Hub USB no reconoce dispositivos', steps: ['Comprobar cable USB upstream conectado al PC', 'Probar puerto USB distinto en el PC', 'Reiniciar el monitor desengancharlo de corriente'] },
    ],
  },
  {
    id: 'lenovo-thinkvision-p27u',
    brand: 'Lenovo',
    model: 'ThinkVision P27u-20',
    category: 'monitores',
    description: 'Monitor profesional 4K de 27 pulgadas con amplio gamut de color, usado en diseño e imagen médica.',
    specs: [
      { label: 'Tamaño', value: '27"' },
      { label: 'Resolución', value: '3840x2160 (4K UHD)' },
      { label: 'Panel', value: 'IPS 99% sRGB' },
      { label: 'Conectividad', value: 'USB-C 90W, DisplayPort, HDMI' },
    ],
    drivers: [],
    manuals: [{ name: 'Manual de usuario', url: 'https://pcsupport.lenovo.com', type: 'PDF' }],
    links: lenovoLinks,
    monitorInfo: {
      reset: 'Menú OSD > Reset > Factory Reset',
      osd: 'Joystick frontal inferior derecho',
      serviceMode: 'Menú OSD > Input > Modo experto (para técnicos)',
      buttonCombos: ['Menú > Reset > Factory Reset - Restaurar valores', 'Mantener Menú 5s - Bloquear OSD'],
      calibration: 'Compatible con calibración por hardware mediante Lenovo Display Utility',
    },
    troubleshooting: [
      { title: 'No carga el portátil por USB-C', steps: ['Comprobar que el cable soporta Power Delivery', 'Verificar que el puerto usado es el de carga (90W)', 'Actualizar firmware del monitor'] },
    ],
    notes: ['Usado en puestos de diagnóstico por imagen'],
  },
  {
    id: 'dell-p2422h',
    brand: 'Dell',
    model: 'P2422H',
    category: 'monitores',
    description: 'Monitor corporativo de 24 pulgadas Full HD con soporte ergonómico ajustable.',
    specs: [
      { label: 'Tamaño', value: '23.8"' },
      { label: 'Resolución', value: '1920x1080' },
      { label: 'Panel', value: 'IPS' },
      { label: 'Conectividad', value: 'HDMI, DisplayPort, VGA' },
    ],
    drivers: [],
    manuals: [{ name: 'Manual de usuario', url: 'https://www.dell.com/support', type: 'PDF' }],
    links: dellLinks,
    monitorInfo: {
      reset: 'Menú OSD > Otros > Restaurar ajustes de fábrica',
      osd: 'Botones táctiles frontales',
      buttonCombos: ['Mantener botón de Menú 4s - Bloquear/desbloquear OSD', 'Menú > Otros > Factory Reset'],
      calibration: 'Perfiles ICC disponibles en Dell Display Manager',
    },
    troubleshooting: [
      { title: 'Botones OSD no responden', steps: ['Comprobar si el OSD está bloqueado (mantener botón Menú 4s)', 'Desconectar y reconectar alimentación', 'Contactar soporte Dell si persiste'] },
    ],
  },
  {
    id: 'dell-u2422h',
    brand: 'Dell',
    model: 'U2422H',
    category: 'monitores',
    description: 'Monitor profesional UltraSharp de 24 pulgadas con hub USB-C y alta fidelidad de color.',
    specs: [
      { label: 'Tamaño', value: '23.8"' },
      { label: 'Resolución', value: '1920x1080' },
      { label: 'Panel', value: 'IPS 99% sRGB' },
      { label: 'Conectividad', value: 'USB-C 65W, HDMI, DisplayPort' },
    ],
    drivers: [],
    manuals: [{ name: 'Manual de usuario', url: 'https://www.dell.com/support', type: 'PDF' }],
    links: dellLinks,
    monitorInfo: {
      reset: 'Menú OSD > Otros > Restaurar ajustes de fábrica',
      osd: 'Botones táctiles frontales',
      buttonCombos: ['Mantener botón de Menú 4s - Bloquear/desbloquear OSD', 'Menú > Otros > Factory Reset'],
      calibration: 'Compatible con Dell Display Manager y perfiles ICC UltraSharp',
    },
    troubleshooting: [
      { title: 'Carga USB-C intermitente', steps: ['Comprobar potencia del portátil conectado (máx 65W)', 'Probar con otro cable USB-C certificado', 'Actualizar firmware del monitor con Dell Display Manager'] },
    ],
    notes: ['Usado en puestos de diseño de material informativo'],
  },
  {
    id: 'dell-p2722h',
    brand: 'Dell',
    model: 'P2722H',
    category: 'monitores',
    description: 'Monitor corporativo de 27 pulgadas Full HD, ampliación del P2422H para más espacio de trabajo.',
    specs: [
      { label: 'Tamaño', value: '27"' },
      { label: 'Resolución', value: '1920x1080' },
      { label: 'Panel', value: 'IPS' },
      { label: 'Conectividad', value: 'HDMI, DisplayPort, VGA' },
    ],
    drivers: [],
    manuals: [{ name: 'Manual de usuario', url: 'https://www.dell.com/support', type: 'PDF' }],
    links: dellLinks,
    monitorInfo: {
      reset: 'Menú OSD > Otros > Restaurar ajustes de fábrica',
      osd: 'Botones táctiles frontales',
      buttonCombos: ['Mantener botón de Menú 4s - Bloquear/desbloquear OSD', 'Menú > Otros > Factory Reset'],
      calibration: 'Perfiles ICC disponibles en Dell Display Manager',
    },
    troubleshooting: [
      { title: 'Imagen con bordes recortados', steps: ['Ajustar escalado en Configuración de pantalla de Windows', 'Comprobar resolución nativa seleccionada (1920x1080)', 'Probar con otro cable HDMI/DP'] },
    ],
  },
  {
    id: 'samsung-s24r650',
    brand: 'Samsung',
    model: 'S24R650',
    category: 'monitores',
    description: 'Monitor corporativo de 24 pulgadas con panel PLS y diseño de bisel fino.',
    specs: [
      { label: 'Tamaño', value: '23.8"' },
      { label: 'Resolución', value: '1920x1080' },
      { label: 'Panel', value: 'PLS' },
      { label: 'Conectividad', value: 'HDMI, DisplayPort' },
    ],
    drivers: [],
    manuals: [{ name: 'Manual de usuario', url: 'https://www.samsung.com/es/support', type: 'PDF' }],
    links: [{ name: 'Soporte Samsung', url: 'https://www.samsung.com/es/support' }],
    monitorInfo: {
      reset: 'Menú OSD > Sistema > Restablecer todo',
      osd: 'Joystick central inferior',
      buttonCombos: ['Menú > Sistema > Restablecer todo - Reset de fábrica', 'Pulsación larga del joystick - Apagar pantalla'],
      calibration: 'Ajuste manual desde OSD, sin software de calibración dedicado',
    },
    troubleshooting: [
      { title: 'Imagen con tinte de color', steps: ['Restablecer valores de fábrica desde el OSD', 'Comprobar modo de imagen seleccionado (Estándar/Cine)', 'Probar con otro cable de vídeo'] },
    ],
  },
  {
    id: 'hp-e22-g4',
    brand: 'HP',
    model: 'E22 G4',
    category: 'monitores',
    description: 'Monitor corporativo de 21.5 pulgadas Full HD, opción de entrada para puestos básicos.',
    specs: [
      { label: 'Tamaño', value: '21.5"' },
      { label: 'Resolución', value: '1920x1080' },
      { label: 'Panel', value: 'IPS' },
      { label: 'Conectividad', value: 'HDMI, VGA, DisplayPort' },
    ],
    drivers: [],
    manuals: [{ name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' }],
    links: hpLinks,
    monitorInfo: {
      reset: 'Menú OSD > Gestión > Restablecer valores de fábrica',
      osd: 'Botón central del joystick OSD',
      buttonCombos: ['Menú > Gestión > Restablecer - Reset de fábrica'],
      calibration: 'Ajuste manual desde el OSD',
    },
    troubleshooting: [
      { title: 'Imagen borrosa', steps: ['Comprobar resolución nativa 1920x1080', 'Ajustar reloj/fase si se usa entrada VGA', 'Probar con conexión digital (HDMI/DP) en lugar de VGA'] },
    ],
  },
  {
    id: 'dell-e2216h',
    brand: 'Dell',
    model: 'E2216H',
    category: 'monitores',
    description: 'Monitor de entrada de 22 pulgadas, modelo legado ampliamente desplegado en consultas.',
    specs: [
      { label: 'Tamaño', value: '21.5"' },
      { label: 'Resolución', value: '1920x1080' },
      { label: 'Panel', value: 'TN' },
      { label: 'Conectividad', value: 'HDMI, VGA' },
    ],
    drivers: [],
    manuals: [{ name: 'Manual de usuario', url: 'https://www.dell.com/support', type: 'PDF' }],
    links: dellLinks,
    monitorInfo: {
      reset: 'Menú OSD > Otros > Restaurar ajustes de fábrica',
      osd: 'Botones físicos frontales',
      buttonCombos: ['Mantener botón de Menú 4s - Bloquear/desbloquear OSD'],
      calibration: 'Ajuste manual desde el OSD, sin gestión de color avanzada',
    },
    troubleshooting: [
      { title: 'Parpadeo al iniciar Windows', steps: ['Comprobar cable VGA bien atornillado', 'Cambiar a conexión HDMI si está disponible', 'Sustituir cable de vídeo'] },
    ],
    notes: ['Modelo legado en proceso de sustitución'],
  },
  // --- Periféricos ---
  {
    id: 'hp-mouse-inalambrico',
    brand: 'HP',
    model: 'Mouse inalámbrico 220',
    category: 'perifericos',
    description: 'Ratón inalámbrico básico con receptor USB, uso general en puestos de oficina.',
    specs: [
      { label: 'Conectividad', value: 'USB 2.4 GHz (dongle)' },
      { label: 'DPI', value: '1600' },
      { label: 'Batería', value: '1x AA, hasta 12 meses' },
      { label: 'Botones', value: '3 (izq, der, rueda)' },
    ],
    drivers: [],
    manuals: [{ name: 'Guía rápida', url: 'https://support.hp.com', type: 'PDF' }],
    links: hpLinks,
    troubleshooting: [
      { title: 'No responde', steps: ['Sustituir la pila AA', 'Reconectar el dongle USB en otro puerto', 'Volver a emparejar con el botón de conexión inferior'] },
    ],
    notes: ['Periférico de bajo coste, reposición habitual en almacén'],
  },
  {
    id: 'hp-teclado-usb',
    brand: 'HP',
    model: 'Teclado USB estándar',
    category: 'perifericos',
    description: 'Teclado con cable USB de distribución español, estándar en la mayoría de puestos.',
    specs: [
      { label: 'Conectividad', value: 'USB con cable' },
      { label: 'Distribución', value: 'Español (ISO)' },
      { label: 'Teclado numérico', value: 'Sí' },
    ],
    drivers: [],
    manuals: [{ name: 'Guía rápida', url: 'https://support.hp.com', type: 'PDF' }],
    links: hpLinks,
    troubleshooting: [
      { title: 'Algunas teclas no responden', steps: ['Limpiar teclado con aire comprimido', 'Probar en otro puerto USB', 'Sustituir el teclado si el fallo es de hardware'] },
    ],
    notes: ['Reposición habitual en almacén'],
  },
  {
    id: 'logitech-mx-master-3',
    brand: 'Logitech',
    model: 'MX Master 3',
    category: 'perifericos',
    description: 'Ratón inalámbrico avanzado con múltiples botones programables, asignado a perfiles técnicos.',
    specs: [
      { label: 'Conectividad', value: 'Bluetooth / USB (Logi Bolt)' },
      { label: 'DPI', value: 'Hasta 4000' },
      { label: 'Batería', value: 'Recargable, hasta 70 días' },
      { label: 'Botones', value: '7 programables' },
    ],
    drivers: [{ name: 'Logitech Options+', url: 'https://www.logitech.com/es-es/software/logi-options-plus.html', os: 'Windows/macOS', version: '1.60' }],
    manuals: [{ name: 'Guía rápida', url: 'https://www.logitech.com/es-es/support', type: 'PDF' }],
    links: [{ name: 'Soporte Logitech', url: 'https://www.logitech.com/es-es/support' }],
    troubleshooting: [
      { title: 'Desconexiones intermitentes', steps: ['Comprobar carga de la batería', 'Actualizar Logitech Options+', 'Cambiar de Bluetooth al receptor Logi Bolt'] },
    ],
    notes: ['Asignado a perfiles con necesidades de productividad avanzada'],
  },
  {
    id: 'logitech-mx-keys',
    brand: 'Logitech',
    model: 'MX Keys',
    category: 'perifericos',
    description: 'Teclado inalámbrico retroiluminado de gama alta, asignado junto al MX Master 3.',
    specs: [
      { label: 'Conectividad', value: 'Bluetooth / USB (Logi Bolt)' },
      { label: 'Retroiluminación', value: 'Sí, con sensor de proximidad' },
      { label: 'Batería', value: 'Recargable, hasta 10 días con luz' },
    ],
    drivers: [{ name: 'Logitech Options+', url: 'https://www.logitech.com/es-es/software/logi-options-plus.html', os: 'Windows/macOS', version: '1.60' }],
    manuals: [{ name: 'Guía rápida', url: 'https://www.logitech.com/es-es/support', type: 'PDF' }],
    links: [{ name: 'Soporte Logitech', url: 'https://www.logitech.com/es-es/support' }],
    troubleshooting: [
      { title: 'No empareja por Bluetooth', steps: ['Mantener pulsado el botón de emparejamiento del teclado', 'Eliminar el dispositivo antiguo en Windows y volver a emparejar', 'Probar con el receptor Logi Bolt como alternativa'] },
    ],
  },
  {
    id: 'epson-scanner-ds-530',
    brand: 'Epson',
    model: 'DS-530',
    category: 'perifericos',
    description: 'Escáner de sobremesa con alimentador automático, usado para digitalización de documentación clínica.',
    specs: [
      { label: 'Tipo', value: 'Escáner de documentos ADF' },
      { label: 'Velocidad', value: '35 ppm / 70 ipm' },
      { label: 'Conectividad', value: 'USB 3.0' },
      { label: 'Capacidad ADF', value: '50 hojas' },
    ],
    drivers: [{ name: 'Epson Scan 2', url: 'https://www.epson.es/support', os: 'Windows 10/11', version: '6.7.5' }],
    manuals: [{ name: 'Manual de usuario', url: 'https://www.epson.es/support', type: 'PDF' }],
    links: [{ name: 'Soporte Epson', url: 'https://www.epson.es/support' }],
    troubleshooting: [
      { title: 'Atasco de papel en el ADF', steps: ['Abrir la tapa del ADF y retirar el papel con cuidado', 'Limpiar los rodillos con paño húmedo', 'Comprobar que no se mezclan tamaños de papel distintos'] },
      { title: 'Líneas verticales en el escaneo', steps: ['Limpiar el cristal y los rodillos con el kit de limpieza', 'Ejecutar la utilidad de limpieza desde Epson Scan 2', 'Sustituir rodillos si persisten tras la limpieza'] },
    ],
    notes: ['Usado para digitalización de historiales en admisión'],
  },
  {
    id: 'fujitsu-scanner-fi-7180',
    brand: 'Fujitsu',
    model: 'fi-7180',
    category: 'perifericos',
    description: 'Escáner departamental de alto rendimiento con ADF, para digitalización masiva de documentación.',
    specs: [
      { label: 'Tipo', value: 'Escáner de documentos ADF' },
      { label: 'Velocidad', value: '45 ppm / 90 ipm' },
      { label: 'Conectividad', value: 'USB 3.0' },
      { label: 'Capacidad ADF', value: '80 hojas' },
    ],
    drivers: [{ name: 'PaperStream IP', url: 'https://www.pfu.fujitsu.com/imaging/es', os: 'Windows 10/11', version: '1.62' }],
    manuals: [{ name: 'Manual de usuario', url: 'https://www.pfu.fujitsu.com/imaging/es', type: 'PDF' }],
    links: [{ name: 'Soporte Fujitsu Imaging', url: 'https://www.pfu.fujitsu.com/imaging/es' }],
    troubleshooting: [
      { title: 'Alimentación doble de hojas', steps: ['Airear el taco de papel antes de cargar', 'Limpiar rodillo de separación', 'Comprobar y ajustar guías laterales del ADF'] },
    ],
    notes: ['Escáner departamental de digitalización masiva'],
  },
  {
    id: 'logitech-k380',
    brand: 'Logitech',
    model: 'K380',
    category: 'perifericos',
    description: 'Teclado inalámbrico compacto multi-dispositivo, usado en puestos con espacio reducido.',
    specs: [
      { label: 'Conectividad', value: 'Bluetooth (hasta 3 dispositivos)' },
      { label: 'Batería', value: '2x AAA, hasta 24 meses' },
      { label: 'Formato', value: 'Compacto sin teclado numérico' },
    ],
    drivers: [],
    manuals: [{ name: 'Guía rápida', url: 'https://www.logitech.com/es-es/support', type: 'PDF' }],
    links: [{ name: 'Soporte Logitech', url: 'https://www.logitech.com/es-es/support' }],
    troubleshooting: [
      { title: 'No empareja', steps: ['Seleccionar canal de emparejamiento (1, 2 o 3)', 'Mantener pulsado el botón de conexión del canal', 'Buscar el dispositivo en Bluetooth de Windows'] },
    ],
  },
  {
    id: 'hp-webcam-320',
    brand: 'HP',
    model: 'Webcam 320 FHD',
    category: 'perifericos',
    description: 'Webcam USB Full HD con micrófono integrado, usada para videoconsulta y teletrabajo.',
    specs: [
      { label: 'Resolución', value: '1080p Full HD' },
      { label: 'Conectividad', value: 'USB-A' },
      { label: 'Micrófono', value: 'Integrado con reducción de ruido' },
      { label: 'Campo de visión', value: '88°' },
    ],
    drivers: [],
    manuals: [{ name: 'Guía rápida', url: 'https://support.hp.com', type: 'PDF' }],
    links: hpLinks,
    troubleshooting: [
      { title: 'No aparece en la app de videollamada', steps: ['Comprobar permisos de cámara en Windows', 'Probar en otro puerto USB', 'Cerrar otras aplicaciones que puedan estar usando la cámara'] },
    ],
    notes: ['Muy solicitada para teletrabajo y sesiones de telemedicina'],
  },
  // --- Equipos Clínicos ---
  {
    id: 'drager-c700',
    brand: 'Dräger',
    model: 'Infinity C700',
    category: 'equipos-clinicos',
    description: 'Monitor de paciente multiparamétrico con pantalla táctil, integrado en la red de monitorización central.',
    specs: [
      { label: 'Tipo', value: 'Monitor de paciente multiparamétrico' },
      { label: 'Pantalla', value: '15" táctil' },
      { label: 'Parámetros', value: 'ECG, SpO2, PANI, temperatura, respiración' },
      { label: 'Conectividad', value: 'Red hospitalaria Dräger Infinity Network' },
      { label: 'Batería', value: 'Interna, autonomía de respaldo ~2h' },
    ],
    drivers: [],
    manuals: [
      { name: 'Manual de usuario', url: 'https://www.draeger.com/es_es_ES/Hospital', type: 'PDF' },
      { name: 'Guía rápida de operación', url: 'https://www.draeger.com/es_es_ES/Hospital', type: 'PDF' },
    ],
    links: [{ name: 'Soporte Dräger', url: 'https://www.draeger.com/es_es_ES/Hospital' }],
    troubleshooting: [
      { title: 'Pierde conexión con la central de monitorización', steps: ['Comprobar el cableado de red o el módulo WiFi del monitor', 'Verificar el punto de acceso más cercano', 'Escalar a ingeniería biomédica si no se restablece'] },
      { title: 'Alarma de sensor desconectado', steps: ['Revisar la conexión física del sensor al paciente', 'Comprobar el cable del módulo correspondiente', 'Sustituir el cable si el aviso persiste con el sensor bien colocado'] },
    ],
    notes: ['Cualquier intervención de hardware requiere coordinación con ingeniería biomédica', 'No reiniciar durante monitorización activa de un paciente sin supervisión clínica'],
    history: [{ date: '2026-01-08', event: 'Calibración periódica realizada por biomédica' }],
  },
  {
    id: 'philips-intellivue-mx450',
    brand: 'Philips',
    model: 'IntelliVue MX450',
    category: 'equipos-clinicos',
    description: 'Monitor de paciente embebido de altas prestaciones para unidades de cuidados intermedios y críticos.',
    specs: [
      { label: 'Tipo', value: 'Monitor de paciente embebido' },
      { label: 'Pantalla', value: '15.6" táctil' },
      { label: 'Parámetros', value: 'ECG, SpO2, PANI, capnografía (opcional)' },
      { label: 'Conectividad', value: 'Philips PIC iX (red clínica)' },
      { label: 'Batería', value: 'Interna extraíble' },
    ],
    drivers: [],
    manuals: [{ name: 'Manual de usuario', url: 'https://www.philips.es/healthcare', type: 'PDF' }],
    links: [{ name: 'Soporte Philips Healthcare', url: 'https://www.philips.es/healthcare' }],
    troubleshooting: [
      { title: 'Pantalla congelada', steps: ['No apagar bruscamente si hay paciente monitorizado', 'Contactar a biomédica para reinicio controlado', 'Documentar el incidente en el parte de averías'] },
    ],
    notes: ['Equipo crítico: toda incidencia se coordina con ingeniería biomédica antes de cualquier intervención', 'No instalar software ni actualizaciones sin autorización del fabricante'],
    history: [{ date: '2025-11-20', event: 'Revisión técnica anual por biomédica' }],
  },
  {
    id: 'mindray-umec12',
    brand: 'Mindray',
    model: 'uMEC12',
    category: 'equipos-clinicos',
    description: 'Monitor de paciente compacto para monitorización estándar en planta y consultas.',
    specs: [
      { label: 'Tipo', value: 'Monitor de paciente' },
      { label: 'Pantalla', value: '12.1"' },
      { label: 'Parámetros', value: 'ECG, SpO2, PANI, temperatura' },
      { label: 'Batería', value: 'Interna, autonomía ~3h' },
    ],
    drivers: [],
    manuals: [{ name: 'Manual de usuario', url: 'https://www.mindray.com/es', type: 'PDF' }],
    links: [{ name: 'Soporte Mindray', url: 'https://www.mindray.com/es' }],
    troubleshooting: [
      { title: 'Lectura de SpO2 errática', steps: ['Comprobar colocación correcta del sensor en el paciente', 'Limpiar el sensor según protocolo', 'Sustituir el sensor si persiste la lectura errónea'] },
    ],
    notes: ['Coordinar con biomédica cualquier apertura de carcasa o sustitución de módulos'],
  },
  {
    id: 'ge-dash-3000',
    brand: 'GE Healthcare',
    model: 'Dash 3000',
    category: 'equipos-clinicos',
    description: 'Monitor de paciente de transporte y quirófano, modelo legado ampliamente extendido.',
    specs: [
      { label: 'Tipo', value: 'Monitor de paciente de transporte' },
      { label: 'Pantalla', value: '10.4" color' },
      { label: 'Parámetros', value: 'ECG, SpO2, PANI, temperatura, respiración' },
      { label: 'Batería', value: 'Interna extraíble' },
    ],
    drivers: [],
    manuals: [{ name: 'Manual de usuario', url: 'https://www.gehealthcare.com', type: 'PDF' }],
    links: [{ name: 'Soporte GE Healthcare', url: 'https://www.gehealthcare.com' }],
    troubleshooting: [
      { title: 'No enciende', steps: ['Comprobar carga de la batería en la base de acoplamiento', 'Verificar conexión a la red eléctrica', 'Escalar a biomédica si no enciende con batería nueva'] },
    ],
    notes: ['Modelo legado, coordinar con biomédica para piezas de repuesto'],
  },
  {
    id: 'bbraun-infusomat-space',
    brand: 'B. Braun',
    model: 'Infusomat Space',
    category: 'equipos-clinicos',
    description: 'Bomba de infusión volumétrica de la plataforma Space, usada en administración de medicación IV.',
    specs: [
      { label: 'Tipo', value: 'Bomba de infusión volumétrica' },
      { label: 'Pantalla', value: 'Color táctil' },
      { label: 'Conectividad', value: 'SpaceCom (red de bombas)' },
      { label: 'Batería', value: 'Interna, autonomía ~6h' },
    ],
    drivers: [],
    manuals: [{ name: 'Manual de usuario', url: 'https://www.bbraun.es', type: 'PDF' }],
    links: [{ name: 'Soporte B. Braun', url: 'https://www.bbraun.es' }],
    troubleshooting: [
      { title: 'Alarma de oclusión persistente', steps: ['Revisar la vía y el equipo de infusión por dobleces', 'Comprobar que la pinza de la vía está abierta', 'Sustituir el equipo de infusión si el problema continúa'] },
    ],
    notes: ['Equipo crítico de soporte vital: cualquier fallo se comunica de inmediato a biomédica', 'No realizar reinicios ni ajustes fuera de protocolo clínico'],
  },
  // --- Otros ---
  {
    id: 'hp-engage-aio-pos',
    brand: 'HP',
    model: 'Engage AIO One Pro (Terminal POS)',
    category: 'otros',
    description: 'Terminal punto de venta / kiosco todo en uno con pantalla táctil, usado en cafetería y aparcamiento del hospital.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-8500T' },
      { label: 'RAM', value: '8 GB DDR4' },
      { label: 'Almacenamiento', value: '256 GB SSD' },
      { label: 'Pantalla', value: '21.5" Full HD táctil' },
      { label: 'Periféricos', value: 'Lector de banda magnética, cajón portamonedas' },
    ],
    drivers: hpDrivers,
    manuals: [
      { name: 'Manual de usuario', url: 'https://support.hp.com', type: 'PDF' },
      { name: 'Guía de configuración POS', url: 'https://support.hp.com', type: 'PDF' },
    ],
    links: hpLinks,
    bios: hpBios,
    shortcuts: hpShortcuts,
    troubleshooting: [
      { title: 'Cajón portamonedas no abre', steps: ['Comprobar cable RJ11/RJ12 entre impresora y cajón', 'Probar el comando de apertura manual desde el software de caja', 'Revisar el solenoide del cajón'] },
      { title: 'Pantalla táctil desalineada', steps: ['Ejecutar calibración táctil de Windows', 'Actualizar driver del panel táctil', 'Limpiar la superficie antes de recalibrar'] },
    ],
    notes: ['Terminal de cobro en cafetería/aparcamiento', 'Requiere reinicio del software de caja tras cortes de red'],
    factoryReset: {
      software: 'Inicio > Configuración > Sistema > Recuperación > Restablecer este PC',
      buttons: 'F11 al arrancar > Troubleshoot > Reset this PC',
    },
    history: [{ date: '2025-10-30', event: 'Sustitución de cajón portamonedas' }],
  },
  {
    id: 'zebra-zd510-hc-pulseras',
    brand: 'Zebra',
    model: 'ZD510-HC',
    category: 'otros',
    description: 'Impresora térmica específica para pulseras de identificación de pacientes, ubicada en admisión y planta.',
    specs: [
      { label: 'Tipo', value: 'Impresora de pulseras hospitalarias' },
      { label: 'Resolución', value: '300 dpi' },
      { label: 'Ancho impresión', value: '25.4 mm (pulsera)' },
      { label: 'Conectividad', value: 'USB, Ethernet, Bluetooth' },
    ],
    drivers: zebraDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://www.zebra.com/support', type: 'PDF' }],
    links: zebraLinks,
    shortcuts: [
      'Pause + Cancel (2s) - Calibración',
      'Cancel (2s) - Imprimir configuración',
      'Pause + Feed (5s) - Factory Reset',
    ],
    troubleshooting: [
      { title: 'Pulsera no imprime código de barras legible', steps: ['Verificar que se usa el material de pulsera homologado', 'Calibrar el sensor para el tipo de pulsera', 'Ajustar oscuridad de impresión en el driver'] },
      { title: 'Atasco al cargar pulsera', steps: ['Comprobar que la pulsera está bien insertada en la guía', 'Limpiar rodillo de arrastre', 'Revisar que no hay restos de material anterior en el mecanismo'] },
    ],
    zebraInfo: zebraInfo({ configLabel: 'Cancel (2s) - Imprime etiqueta de configuración de pulseras' }),
    printerInfo: {
      ip: '192.168.1.65',
      dhcp: true,
      firmware: 'v75.20.11Z',
      maintenance: ['Limpiar cabezal cada 300 pulseras impresas', 'Revisar guía de pulseras semanalmente'],
      testPage: 'Mantener Feed durante el encendido para imprimir etiqueta de prueba',
      cleaning: ['Usar bolígrafo de limpieza específico para el cabezal', 'Limpiar la guía de pulseras con alcohol isopropílico'],
      consumables: [{ name: 'Pulseras de identificación de paciente', code: 'Z-BAND UltraSoft', yield: '350 pulseras/rollo' }],
    },
    notes: ['Crítica para la identificación segura de pacientes en admisión', 'Usar exclusivamente pulseras homologadas Z-Band'],
    factoryReset: {
      software: 'Zebra Setup Utilities > Manage > Restore Factory Defaults',
      buttons: 'Apagar, mantener Pause + Feed, encender y mantener 5 segundos, soltar',
    },
  },
  {
    id: 'apc-smart-ups-1500',
    brand: 'APC',
    model: 'Smart-UPS 1500VA',
    category: 'otros',
    description: 'Sistema de alimentación ininterrumpida para proteger equipos críticos ante cortes eléctricos.',
    specs: [
      { label: 'Potencia', value: '1500 VA / 1000 W' },
      { label: 'Autonomía', value: '~10-15 min a carga media' },
      { label: 'Salidas', value: '8 tomas (4 con batería, 4 solo protección)' },
      { label: 'Gestión', value: 'Puerto USB / tarjeta de red opcional' },
    ],
    drivers: [{ name: 'PowerChute Business Edition', url: 'https://www.apc.com/es/es/support', os: 'Windows 10/11', version: '4.5' }],
    manuals: [{ name: 'Manual de usuario', url: 'https://www.apc.com/es/es/support', type: 'PDF' }],
    links: [{ name: 'Soporte APC', url: 'https://www.apc.com/es/es/support' }],
    troubleshooting: [
      { title: 'Pitido continuo de alarma', steps: ['Comprobar si hay corte de suministro eléctrico', 'Revisar el estado de la batería en el panel LCD', 'Sustituir la batería si ha superado su vida útil (~3-5 años)'] },
      { title: 'No se comunica con PowerChute', steps: ['Comprobar cable USB de gestión', 'Reinstalar el servicio de PowerChute', 'Verificar que el SAI aparece en Administrador de dispositivos'] },
    ],
    notes: ['Protege equipos críticos (servidores de planta, equipos de monitorización)', 'Revisar batería anualmente'],
    history: [{ date: '2025-07-14', event: 'Sustitución de baterías internas' }],
  },
  {
    id: 'zebra-zq511',
    brand: 'Zebra',
    model: 'ZQ511',
    category: 'otros',
    description: 'Impresora móvil portátil para etiquetado junto a la cama del paciente y en almacén de farmacia.',
    specs: [
      { label: 'Tipo', value: 'Impresora térmica móvil' },
      { label: 'Resolución', value: '203 dpi' },
      { label: 'Ancho impresión', value: '72 mm' },
      { label: 'Conectividad', value: 'Bluetooth, WiFi' },
      { label: 'Batería', value: 'Recargable Li-Ion' },
    ],
    drivers: zebraDrivers,
    manuals: [{ name: 'Manual de usuario', url: 'https://www.zebra.com/support', type: 'PDF' }],
    links: zebraLinks,
    shortcuts: [
      'Botón de encendido (2s) - Encender/apagar',
      'Feed - Avanzar etiqueta',
      'Power + Feed (5s) - Factory Reset',
    ],
    troubleshooting: [
      { title: 'No empareja por Bluetooth con el lector', steps: ['Comprobar que el Bluetooth está activo en la impresora', 'Eliminar el emparejamiento anterior y repetirlo', 'Actualizar firmware desde Zebra Printer Setup Utility'] },
      { title: 'Batería se agota muy rápido', steps: ['Comprobar ciclos de carga en el indicador', 'Sustituir batería si la autonomía es muy inferior a la nominal', 'Evitar dejar la impresora descargada por periodos largos'] },
    ],
    zebraInfo: zebraInfo({ reset: ['Apagar la impresora', 'Mantener pulsados Power + Feed', 'Encender manteniendo ambos 5 segundos', 'Soltar cuando el LED parpadee'] }),
    printerInfo: {
      dhcp: true,
      firmware: 'v88.20.10Z',
      maintenance: ['Limpiar cabezal semanalmente por el uso intensivo móvil', 'Cargar completamente al final de cada turno'],
      testPage: 'Mantener Feed durante el encendido para imprimir etiqueta de prueba',
      cleaning: ['Usar bolígrafo de limpieza en el cabezal', 'Revisar la tapa y bisagra por desgaste'],
      consumables: [{ name: 'Etiquetas térmicas móviles 2x1"', code: 'Z-Select 4000T', yield: '220 etiquetas/rollo' }],
    },
    notes: ['Usada por el personal de enfermería para etiquetado junto a la cama del paciente'],
    factoryReset: {
      software: 'Zebra Printer Setup Utility > Restore Factory Defaults',
      buttons: 'Apagar, mantener Power + Feed, encender y mantener 5 segundos, soltar',
    },
  },
  {
    id: 'cisco-8851',
    brand: 'Cisco',
    model: '8851',
    category: 'telefonos',
    description: 'Teléfono IP empresarial con pantalla táctil de 5 pulgadas y capacidades avanzadas de llamadas.',
    specs: [
      { label: 'Tipo', value: 'Teléfono IP empresarial' },
      { label: 'Pantalla', value: 'LCD 5" a color 800x480' },
      { label: 'Líneas', value: 'Hasta 6 líneas simultáneas' },
      { label: 'Conectividad', value: 'Gigabit Ethernet PoE, Bluetooth, WiFi' },
      { label: 'Codec', value: 'G.711, G.729, iLBC, Opus' },
    ],
    drivers: [
      { name: 'Firmware Cisco', url: 'https://software.cisco.com', os: 'Cisco UC', version: '14.0' },
    ],
    manuals: [
      { name: 'Guía rápida de usuario', url: 'https://www.cisco.com/c/en/us/support/collaboration-endpoints/ip-phone-8800-series/series.html', type: 'PDF' },
      { name: 'Manual completo', url: 'https://www.cisco.com/c/en/us/support/collaboration-endpoints/ip-phone-8800-series/series.html', type: 'PDF' },
    ],
    links: [
      { name: 'Soporte Cisco', url: 'https://www.cisco.com/c/en/us/support/collaboration-endpoints/ip-phone-8800-series/series.html' },
      { name: 'Actualización de firmware', url: 'https://software.cisco.com' },
    ],
    shortcuts: [
      'Botón Inicio - Pantalla principal',
      'Botón Atrás - Volver a menú anterior',
      'Botón Silencio - Activar/desactivar micrófono',
      'Botón Altavoz - Cambiar a modo manos libres',
      'Volumen +/- - Ajustar volumen de llamada',
    ],
    troubleshooting: [
      {
        title: 'Teléfono no obtiene IP',
        steps: [
          'Comprobar cable Ethernet conectado',
          'Verificar que el puerto PoE está activo en el switch',
          'Reiniciar el teléfono (desenchufar y enchufar)',
          'Verificar configuración DHCP en el servidor',
        ],
      },
      {
        title: 'No hay audio en las llamadas',
        steps: [
          'Comprobar volumen del teléfono no está en 0',
          'Verificar micrófono no está en silencio (botón Silencio)',
          'Probar llamada de prueba de audio',
          'Reiniciar el teléfono',
        ],
      },
      {
        title: 'Pantalla no responde',
        steps: ['Reiniciar el teléfono (apagar/encender)', 'Actualizar firmware desde la página de administración'],
      },
    ],
    telephoneInfo: {
      ip: 'DHCP automático o estático vía web',
      dhcp: true,
      firmware: '14.0 y superior',
      reset: [
        'Pulsar el botón Settings (engranaje)',
        'Ir a Administration > Reset Phone',
        'Seleccionar Factory Reset',
        'Confirmar (el teléfono se reiniciará)',
      ],
      factoryReset: 'Administration > Reset Phone > Factory Reset',
      codes: [
        'Acceso admin: Settings > Administration (contraseña admin por defecto)',
        'Código de transferencia de llamada: *72 (activar), *73 (desactivar)',
        'Desviador de llamadas: *21 (activar), *21# (desactivar)',
        'No molestar: *78 (activar), *79 (desactivar)',
      ],
      voicemail: 'Pulsar botón de correo de voz o marcar extensión de correo',
      speedDial: 'Largo en teclas numéricas (1-9) desde Administration > Speed Dials',
      transfer: 'Consulta: Pulsar Transfer, marcar número, esperar respuesta, pulsar Transfer de nuevo | Ciega: Transfer, marcar, colgar',
    },
    notes: [
      'Requiere servidor Cisco Call Manager o similar',
      'Soporta video en modelos con cámara',
      'Integración con Microsoft Teams y Zoom disponible',
    ],
  },
];

export function getDevicesByCategory(category: DeviceCategory): DeviceModel[] {
  return devices.filter((d) => d.category === category);
}
export function getDeviceById(id: string): DeviceModel | undefined {
  return devices.find((d) => d.id === id);
}
export function getBrands(): string[] {
  return [...new Set(devices.map((d) => d.brand))].sort();
}
export function getBrandsByCategory(category: DeviceCategory): string[] {
  return [...new Set(getDevicesByCategory(category).map((d) => d.brand))].sort();
}
