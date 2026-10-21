export interface ZebraInventarioItem {
  ubicacion: string;
  modelo: string;
  deviceId?: string;
}

export const inventarioZebrasDoc = 'manuales/Inventario_de_Zebras.docx';

export const inventarioZebras: ZebraInventarioItem[] = [
  { ubicacion: '2A', modelo: 'ZD421', deviceId: 'zebra-zd421' },
  { ubicacion: '2B', modelo: 'GK420t', deviceId: 'zebra-gk420t' },
  { ubicacion: '2C', modelo: '2844Z' },
  { ubicacion: '2D', modelo: 'GK420t', deviceId: 'zebra-gk420t' },
  { ubicacion: '2E', modelo: 'ZD420', deviceId: 'zebra-zd420' },
  { ubicacion: '2F', modelo: '2844Z' },
  { ubicacion: '3E', modelo: 'GK420t', deviceId: 'zebra-gk420t' },
  { ubicacion: '3F', modelo: '2844Z' },
  { ubicacion: 'Labo (Laboratorio)', modelo: 'ZD421 / 421', deviceId: 'zebra-zd421' },
  { ubicacion: 'Neo (Neonatología)', modelo: '2844Z' },
  { ubicacion: 'Observ Pediat (Observación Pediátrica)', modelo: '2844Z' },
  { ubicacion: 'REA (Reanimación)', modelo: 'GK420t', deviceId: 'zebra-gk420t' },
  { ubicacion: 'UCI', modelo: 'ZD420', deviceId: 'zebra-zd420' },
  { ubicacion: 'Urg (Urgencias)', modelo: 'GK420t', deviceId: 'zebra-gk420t' },
  { ubicacion: 'Urg Pediatr (Urgencias Pediátricas)', modelo: 'GK420t', deviceId: 'zebra-gk420t' },
];
