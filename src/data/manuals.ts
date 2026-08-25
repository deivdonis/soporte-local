export interface Manual {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  steps?: { title: string; content: string[] }[];
  notes?: string[];
  links?: { name: string; url: string }[];
  pdfUrl?: string;
  images?: string[];
  date: string;
  author: string;
  favorite?: boolean;
}

export const manualCategories = [
  'Procedimientos', 'Configuración', 'Mantenimiento',
  'Redes', 'Seguridad', 'Software', 'Hardware',
];

export const manuals: Manual[] = [
  {
    id: 'm1',
    title: 'Configuración de BIOS HP EliteDesk',
    category: 'Configuración',
    description:
      'Guía para acceder y configurar los parámetros de la BIOS en equipos HP EliteDesk, incluyendo activación de TPM, Secure Boot y orden de arranque, necesarios para el despliegue estándar de puestos del hospital.',
    tags: ['BIOS', 'HP', 'EliteDesk', 'TPM', 'Secure Boot'],
    steps: [
      {
        title: 'Acceder a la BIOS',
        content: [
          'Reiniciar el equipo y pulsar repetidamente la tecla F10 durante el arranque.',
          'Esperar a que se cargue la utilidad Computer Setup de HP.',
          'Si se solicita contraseña de administrador, introducir la clave estándar del departamento.',
        ],
      },
      {
        title: 'Activar TPM y Secure Boot',
        content: [
          'Ir al menú Security > TPM Embedded Security y establecer Activate.',
          'Ir a Security > Secure Boot Configuration y activar Secure Boot.',
          'Guardar los cambios antes de continuar a la siguiente sección.',
        ],
      },
      {
        title: 'Configurar el orden de arranque',
        content: [
          'Acceder a Storage > Boot Order.',
          'Colocar el disco SSD principal como primer dispositivo de arranque.',
          'Deshabilitar el arranque por red (PXE) si no se va a usar despliegue remoto.',
        ],
      },
      {
        title: 'Guardar y salir',
        content: [
          'Pulsar F10 para guardar los cambios.',
          'Confirmar con Yes en el cuadro de diálogo.',
          'El equipo reiniciará aplicando la nueva configuración.',
        ],
      },
    ],
    notes: [
      'TPM debe estar activo obligatoriamente para instalar Windows 11 según la política del hospital.',
      'Anotar la contraseña de BIOS utilizada en el inventario interno de credenciales.',
    ],
    links: [{ name: 'Soporte HP BIOS', url: 'https://support.hp.com' }],
    pdfUrl: '#',
    date: '2026-01-15',
    author: 'David Fernández',
    favorite: true,
  },
  {
    id: 'm2',
    title: 'Calibración de impresora Zebra ZD420',
    category: 'Mantenimiento',
    description:
      'Procedimiento para calibrar el sensor de papel y etiquetas de la impresora térmica Zebra ZD420, utilizada en pulseras identificativas y etiquetado de muestras en planta.',
    tags: ['Zebra', 'ZD420', 'Calibración', 'Impresora térmica'],
    steps: [
      {
        title: 'Preparar la impresora',
        content: [
          'Apagar la impresora y cargar el rollo de etiquetas correctamente.',
          'Cerrar la tapa asegurando que el papel queda bien alineado con los sensores.',
        ],
      },
      {
        title: 'Ejecutar calibración automática',
        content: [
          'Mantener pulsado el botón de alimentación (feed) mientras se enciende la impresora.',
          'Soltar el botón cuando el LED de estado parpadee en ámbar.',
          'La impresora avanzará varias etiquetas de forma automática para detectar el sensor.',
        ],
      },
      {
        title: 'Verificar resultado',
        content: [
          'Comprobar que la etiqueta se detiene en la posición correcta tras la calibración.',
          'Imprimir una etiqueta de prueba desde el software de gestión de pacientes.',
        ],
      },
    ],
    notes: [
      'Repetir la calibración cada vez que se cambie de tipo de etiqueta o de rollo.',
      'Si el LED parpadea en rojo tras la calibración, revisar que el rollo no esté mal insertado.',
    ],
    links: [{ name: 'Soporte Zebra', url: 'https://www.zebra.com/support' }],
    pdfUrl: '#',
    date: '2026-02-10',
    author: 'Sergio Zamora',
    favorite: true,
  },
  {
    id: 'm3',
    title: 'Configuración de VLAN en switches Cisco',
    category: 'Redes',
    description:
      'Manual para crear y asignar VLANs en switches Cisco Catalyst, segmentando el tráfico entre las redes administrativa, médica, de impresoras e invitados del hospital.',
    tags: ['Cisco', 'VLAN', 'Switch', 'Redes'],
    steps: [
      {
        title: 'Acceder al switch',
        content: [
          'Conectar por consola o SSH a la IP de gestión del switch.',
          'Entrar en modo privilegiado con enable y la contraseña correspondiente.',
        ],
      },
      {
        title: 'Crear la VLAN',
        content: [
          'Entrar en configuración global con configure terminal.',
          'Crear la VLAN con vlan <id> y asignarle nombre con name <nombre>.',
          'Salir con exit.',
        ],
      },
      {
        title: 'Asignar puertos a la VLAN',
        content: [
          'Seleccionar el puerto o rango con interface <rango>.',
          'Configurar el modo de acceso con switchport mode access.',
          'Asignar la VLAN con switchport access vlan <id>.',
        ],
      },
      {
        title: 'Guardar configuración',
        content: [
          'Volver al modo privilegiado con end.',
          'Guardar cambios con write memory o copy running-config startup-config.',
        ],
      },
    ],
    notes: [
      'Verificar siempre con show vlan brief que la VLAN se ha creado correctamente.',
      'No modificar la VLAN 1 (Management) sin coordinarlo con el resto del equipo de redes.',
    ],
    links: [{ name: 'Documentación Cisco', url: 'https://www.cisco.com' }],
    pdfUrl: '#',
    date: '2026-01-20',
    author: 'Óscar Fraile',
  },
  {
    id: 'm4',
    title: 'Reset de monitor Lenovo ThinkVision',
    category: 'Hardware',
    description:
      'Pasos para restablecer los valores de fábrica del menú OSD de los monitores Lenovo ThinkVision cuando presentan configuraciones de color o resolución incorrectas.',
    tags: ['Lenovo', 'ThinkVision', 'Monitor', 'OSD', 'Reset'],
    steps: [
      {
        title: 'Abrir el menú OSD',
        content: [
          'Pulsar el botón de menú situado en la parte inferior del monitor.',
          'Navegar con los botones direccionales hasta la opción Settings.',
        ],
      },
      {
        title: 'Restablecer valores de fábrica',
        content: [
          'Seleccionar la opción Reset o Factory Reset dentro del menú.',
          'Confirmar la acción cuando se solicite.',
        ],
      },
      {
        title: 'Comprobar el resultado',
        content: [
          'Verificar que la resolución y el brillo vuelven a los valores por defecto.',
          'Ajustar de nuevo la resolución recomendada desde Windows si es necesario.',
        ],
      },
    ],
    notes: [
      'El reset no afecta al firmware del monitor, solo a los ajustes de imagen.',
      'Si el monitor no responde a los botones, comprobar la alimentación y el cable de vídeo.',
    ],
    links: [{ name: 'Soporte Lenovo', url: 'https://pcsupport.lenovo.com' }],
    pdfUrl: '#',
    date: '2026-03-05',
    author: 'María Parra',
  },
  {
    id: 'm5',
    title: 'Instalación de drivers de impresora en red',
    category: 'Software',
    description:
      'Procedimiento estándar para instalar y configurar impresoras de red compartidas en equipos con Windows, incluyendo la instalación del driver correcto y la configuración de la cola de impresión.',
    tags: ['Impresora', 'Red', 'Drivers', 'Windows'],
    steps: [
      {
        title: 'Localizar la impresora en red',
        content: [
          'Abrir Configuración > Dispositivos > Impresoras y escáneres.',
          'Pulsar en Agregar dispositivo y esperar a que se detecten las impresoras de red.',
        ],
      },
      {
        title: 'Instalar el driver',
        content: [
          'Si la impresora no aparece automáticamente, seleccionar "La impresora que quiero no está en la lista".',
          'Introducir la ruta \\\\servidor\\nombre_impresora para instalarla desde el servidor de impresión.',
          'Esperar a que Windows descargue e instale el driver correspondiente.',
        ],
      },
      {
        title: 'Verificar la instalación',
        content: [
          'Imprimir una página de prueba desde las propiedades de la impresora.',
          'Confirmar con el usuario que el documento se ha impreso correctamente.',
        ],
      },
    ],
    notes: [
      'Los drivers deben estar previamente publicados en el servidor de impresión central.',
      'Si la instalación falla, comprobar que el equipo está en el dominio y tiene conectividad con el servidor.',
    ],
    links: [{ name: 'Soporte Windows', url: 'https://support.microsoft.com' }],
    pdfUrl: '#',
    date: '2026-02-15',
    author: 'Fernando Rubio',
  },
  {
    id: 'm6',
    title: 'Procedimiento de recuperación de equipo Dell',
    category: 'Procedimientos',
    description:
      'Procedimiento completo para restaurar un equipo Dell OptiPlex a su estado de fábrica o a una imagen corporativa, utilizado en casos de fallo grave del sistema operativo o reasignación de equipo.',
    tags: ['Dell', 'OptiPlex', 'Recuperación', 'Factory Reset'],
    steps: [
      {
        title: 'Copia de seguridad previa',
        content: [
          'Verificar con el usuario si existen archivos locales que deban respaldarse.',
          'Copiar los datos necesarios a la unidad de red del departamento.',
        ],
      },
      {
        title: 'Acceder a las opciones de recuperación',
        content: [
          'Reiniciar el equipo y pulsar F12 para acceder al menú de arranque.',
          'Seleccionar la opción Dell Recovery Environment o USB de imagen corporativa.',
        ],
      },
      {
        title: 'Ejecutar la restauración',
        content: [
          'Seguir el asistente seleccionando "Restaurar a imagen de fábrica" o la imagen corporativa correspondiente.',
          'Confirmar el borrado del disco y esperar a que finalice el proceso.',
        ],
      },
      {
        title: 'Reconfigurar el equipo',
        content: [
          'Unir el equipo al dominio del hospital.',
          'Instalar el software base y las impresoras habituales del puesto.',
          'Restaurar los datos respaldados si procede.',
        ],
      },
    ],
    notes: [
      'Este proceso borra completamente el disco duro; confirmar siempre la copia de seguridad antes de continuar.',
      'El proceso completo puede tardar entre 1 y 2 horas dependiendo del modelo.',
      'Registrar la reinstalación en el histórico del equipo en el inventario.',
    ],
    links: [{ name: 'Soporte Dell', url: 'https://www.dell.com/support' }],
    pdfUrl: '#',
    date: '2026-01-25',
    author: 'David Fernández',
  },
  {
    id: 'm7',
    title: 'Configuración de firewall Windows Server',
    category: 'Seguridad',
    description:
      'Guía para configurar reglas de entrada y salida en el Firewall de Windows Defender en servidores, permitiendo únicamente el tráfico necesario para las aplicaciones clínicas del hospital.',
    tags: ['Windows', 'Firewall', 'Seguridad', 'Server'],
    steps: [
      {
        title: 'Abrir el firewall avanzado',
        content: [
          'Ejecutar wf.msc desde el cuadro de ejecución.',
          'Localizar el apartado de Reglas de entrada o Reglas de salida según convenga.',
        ],
      },
      {
        title: 'Crear una nueva regla',
        content: [
          'Pulsar en "Nueva regla" y seleccionar el tipo (Puerto, Programa o Predefinida).',
          'Especificar el puerto o programa a permitir o bloquear.',
          'Seleccionar el perfil de red al que aplica (Dominio, Privado, Público).',
        ],
      },
      {
        title: 'Aplicar y verificar',
        content: [
          'Asignar un nombre descriptivo a la regla para su identificación futura.',
          'Probar la conectividad de la aplicación afectada tras aplicar el cambio.',
        ],
      },
    ],
    notes: [
      'Documentar cualquier regla nueva en el registro de cambios de seguridad.',
      'Evitar reglas demasiado permisivas; restringir siempre por IP de origen cuando sea posible.',
    ],
    links: [{ name: 'Documentación Microsoft', url: 'https://docs.microsoft.com' }],
    pdfUrl: '#',
    date: '2026-03-10',
    author: 'Óscar Fraile',
  },
  {
    id: 'm8',
    title: 'Limpieza de cabezal térmico de impresora',
    category: 'Mantenimiento',
    description:
      'Procedimiento de mantenimiento preventivo para la limpieza del cabezal térmico en impresoras de etiquetas (Zebra, Epson, TSC), evitando impresiones defectuosas y prolongando la vida útil del equipo.',
    tags: ['Mantenimiento', 'Cabezal', 'Zebra', 'Epson', 'TSC'],
    steps: [
      {
        title: 'Preparar el material',
        content: [
          'Apagar la impresora y desconectarla de la corriente.',
          'Preparar un bastoncillo o pluma de limpieza con alcohol isopropílico al 90%.',
        ],
      },
      {
        title: 'Limpiar el cabezal',
        content: [
          'Abrir la tapa y retirar el rollo de etiquetas o cinta.',
          'Pasar suavemente el bastoncillo humedecido a lo largo del cabezal térmico.',
          'Dejar secar completamente antes de volver a montar los consumibles.',
        ],
      },
      {
        title: 'Comprobar el resultado',
        content: [
          'Volver a cargar el papel y encender la impresora.',
          'Imprimir una etiqueta de prueba y verificar que no hay líneas blancas ni manchas.',
        ],
      },
    ],
    notes: [
      'Realizar esta limpieza cada vez que se cambie el rollo de etiquetas o al notar impresión defectuosa.',
      'No usar objetos metálicos ni abrasivos que puedan dañar el cabezal.',
      'Registrar la fecha de limpieza en la etiqueta de mantenimiento del equipo.',
    ],
    pdfUrl: '#',
    date: '2026-02-20',
    author: 'Sergio Zamora',
  },
  {
    id: 'm9',
    title: 'Configuración de WiFi corporativo WPA2-Enterprise',
    category: 'Redes',
    description:
      'Manual para configurar la conexión de dispositivos a la red WiFi corporativa del hospital mediante WPA2-Enterprise y autenticación contra el servidor RADIUS institucional.',
    tags: ['WiFi', 'WPA2', 'RADIUS', 'Redes'],
    steps: [
      {
        title: 'Verificar requisitos previos',
        content: [
          'Confirmar que el equipo está unido al dominio o dispone del certificado corporativo instalado.',
          'Comprobar que el servicio RADIUS está operativo en el servidor correspondiente.',
        ],
      },
      {
        title: 'Configurar el perfil de red',
        content: [
          'Ir a Configuración > Red e Internet > WiFi y seleccionar la red corporativa.',
          'Elegir el tipo de seguridad WPA2-Enterprise con método EAP-PEAP o EAP-TLS según el caso.',
        ],
      },
      {
        title: 'Introducir credenciales',
        content: [
          'Introducir el usuario y contraseña de dominio del empleado.',
          'Aceptar el certificado del servidor RADIUS si se solicita.',
        ],
      },
      {
        title: 'Verificar la conexión',
        content: [
          'Comprobar que el equipo obtiene IP de la VLAN correspondiente.',
          'Probar el acceso a recursos internos como el servidor de ficheros.',
        ],
      },
    ],
    notes: [
      'Cada usuario debe autenticarse con sus propias credenciales de dominio, no se permiten claves compartidas.',
      'Si la autenticación falla repetidamente, verificar la fecha y hora del dispositivo, ya que afecta a la validación del certificado.',
    ],
    pdfUrl: '#',
    date: '2026-03-15',
    author: 'Fernando Rubio',
  },
  {
    id: 'm10',
    title: 'Diagnóstico de problemas de red con comandos Windows',
    category: 'Redes',
    description:
      'Recopilación de comandos y procedimiento paso a paso para diagnosticar incidencias de conectividad de red en equipos Windows, desde la comprobación básica de IP hasta la resolución de nombres DNS.',
    tags: ['Windows', 'Red', 'Diagnóstico', 'CMD'],
    steps: [
      {
        title: 'Comprobar la configuración IP',
        content: [
          'Abrir una consola CMD como administrador.',
          'Ejecutar ipconfig /all para revisar IP, máscara, puerta de enlace y DNS asignados.',
        ],
      },
      {
        title: 'Probar la conectividad básica',
        content: [
          'Hacer ping a la puerta de enlace para comprobar la conectividad local.',
          'Hacer ping a una IP externa conocida para descartar problemas de salida a internet.',
        ],
      },
      {
        title: 'Verificar resolución de nombres',
        content: [
          'Ejecutar nslookup sobre un dominio interno y otro externo.',
          'Si falla, ejecutar ipconfig /flushdns y repetir la prueba.',
        ],
      },
      {
        title: 'Analizar la ruta de red',
        content: [
          'Ejecutar tracert hacia el destino con problemas para identificar en qué salto se pierde la conexión.',
          'Anotar los tiempos de respuesta elevados o los saltos que no responden.',
        ],
      },
      {
        title: 'Reiniciar la pila de red si persiste el problema',
        content: [
          'Ejecutar netsh winsock reset y netsh int ip reset.',
          'Reiniciar el equipo para aplicar los cambios.',
        ],
      },
    ],
    notes: [
      'Documentar siempre los resultados de ping y tracert antes de escalar la incidencia al equipo de redes.',
      'Estos comandos requieren permisos de administrador en el equipo local.',
    ],
    pdfUrl: '#',
    date: '2026-01-30',
    author: 'María Parra',
    favorite: true,
  },
];
