export interface DatoImportante {
  id: string;
  title: string;
  items: { label: string; value: string }[];
  notes?: string[];
}

// Datos transcritos de las etiquetas del puesto. Revisar los marcados con (?) por si la letra se leyó mal.
export const datosImportantes: DatoImportante[] = [
  {
    id: 'ut-informatica',
    title: 'UT Informática',
    items: [{ label: 'Código', value: 'E4019-01-00-28' }],
  },
  {
    id: 'incidencia-teclado',
    title: 'Incidencia teclado',
    items: [
      { label: 'Nº incidencia', value: 'INC000002804321' },
      { label: 'Asunto', value: 'Teclado Qx… (?)' },
    ],
  },
  {
    id: 'virgen-de-la-torre',
    title: 'Virgen de la Torre',
    items: [
      { label: 'Red', value: 'IPs fijas' },
      { label: 'Código', value: 'E-2820… (?)' },
      { label: 'Etiqueta', value: 'Inglés' },
    ],
  },
  {
    id: 'gran-via',
    title: 'Gran Vía',
    items: [{ label: 'Dirección', value: 'Gran Vía del Este 80 – 28031 (?)' }],
    notes: ['Transcrito de una nota manuscrita; comprobar dirección y código postal.'],
  },
];
