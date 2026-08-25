export interface Suggestion {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'implemented';
  votes: number;
  comments: { author: string; date: string; content: string }[];
  category: string;
}

export const suggestions: Suggestion[] = [
  {
    id: 's1',
    title: 'Implementar sistema de tickets online',
    description:
      'Sería muy útil disponer de un sistema de tickets online donde el personal pueda reportar incidencias directamente, con seguimiento del estado y notificaciones automáticas, en lugar de depender únicamente de llamadas telefónicas o correos sueltos.',
    author: 'María Parra',
    date: '2026-06-15',
    status: 'approved',
    votes: 8,
    comments: [
      { author: 'David Fernández', date: '2026-06-16', content: 'Totalmente de acuerdo, nos ayudaría a priorizar mejor las incidencias y llevar un histórico.' },
      { author: 'Óscar Fraile', date: '2026-06-18', content: 'Buena idea, propongo evaluar un par de herramientas ligeras antes de decidir cuál implantar.' },
    ],
    category: 'Procesos',
  },
  {
    id: 's2',
    title: 'Ampliar inventario de repuestos de impresoras',
    description:
      'Actualmente el stock de cabezales, rodillos y cintas de repuesto para las impresoras térmicas es muy justo. Propongo ampliar el inventario mínimo para evitar paradas prolongadas cuando falla una impresora en planta.',
    author: 'Sergio Zamora',
    date: '2026-06-20',
    status: 'pending',
    votes: 5,
    comments: [
      { author: 'Fernando Rubio', date: '2026-06-21', content: 'De acuerdo, la semana pasada estuvimos casi dos días sin cabezal de repuesto disponible.' },
    ],
    category: 'Inventario',
  },
  {
    id: 's3',
    title: 'Crear documentación de procedimientos de emergencia',
    description:
      'Deberíamos crear una guía clara con los pasos a seguir ante fallos críticos de red o caída de servidores durante guardia, para que cualquier técnico de guardia pueda actuar rápido aunque no sea su área habitual.',
    author: 'David Fernández',
    date: '2026-06-25',
    status: 'implemented',
    votes: 12,
    comments: [
      { author: 'María Parra', date: '2026-07-01', content: 'Ya está publicada en el manual, gracias por la iniciativa, ha sido muy útil en la última guardia.' },
    ],
    category: 'Documentación',
  },
  {
    id: 's4',
    title: 'Actualizar switches de planta 2',
    description:
      'Los switches de planta 2 son bastante antiguos y no soportan PoE+ suficiente para los nuevos puntos de acceso WiFi. Propongo planificar su sustitución en el próximo trimestre.',
    author: 'Óscar Fraile',
    date: '2026-07-01',
    status: 'pending',
    votes: 3,
    comments: [],
    category: 'Infraestructura',
  },
  {
    id: 's5',
    title: 'Implementar copia de seguridad automática de configuración de switches',
    description:
      'Sería recomendable automatizar copias de seguridad periódicas de la configuración de todos los switches y firewalls, para poder restaurar rápidamente en caso de fallo o sustitución de equipo.',
    author: 'Fernando Rubio',
    date: '2026-07-05',
    status: 'approved',
    votes: 7,
    comments: [
      { author: 'Sergio Zamora', date: '2026-07-06', content: 'Muy necesario, hace poco tuvimos que reconfigurar un switch a mano tras un fallo.' },
    ],
    category: 'Seguridad',
  },
];
