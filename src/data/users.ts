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
];
