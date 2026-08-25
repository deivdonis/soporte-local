export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
  phone?: string;
  department?: string;
  lastLogin?: string;
}

export const users: User[] = [
  { id: 'u1', username: 'deivid', password: '/deiviD77/', name: 'Deivid', role: 'admin', email: 'deivid@soportelocal.es', phone: '600 000 000', department: 'Informática', lastLogin: '2026-07-13T08:00:00Z' },
  { id: 'u2', username: 'dfer', password: 'dfer123', name: 'David Fernández', role: 'user', email: 'dfer@soportelocal.es', phone: '600 100 100', department: 'Soporte Técnico', lastLogin: '2026-07-12T14:00:00Z' },
  { id: 'u3', username: 'mpar', password: 'mpar123', name: 'María Parra', role: 'user', email: 'mpar@soportelocal.es', phone: '600 200 200', department: 'Soporte Técnico', lastLogin: '2026-07-11T09:00:00Z' },
  { id: 'u4', username: 'szam', password: 'szam123', name: 'Sergio Zamora', role: 'user', email: 'szam@soportelocal.es', phone: '600 300 300', department: 'Soporte Técnico', lastLogin: '2026-07-10T16:00:00Z' },
  { id: 'u5', username: 'ofra', password: 'ofra123', name: 'Óscar Fraile', role: 'user', email: 'ofra@soportelocal.es', phone: '600 400 400', department: 'Soporte Técnico', lastLogin: '2026-07-09T11:00:00Z' },
  { id: 'u6', username: 'frub', password: 'frub123', name: 'Fernando Rubio', role: 'user', email: 'frub@soportelocal.es', phone: '600 500 500', department: 'Soporte Técnico', lastLogin: '2026-07-08T13:00:00Z' },
];
