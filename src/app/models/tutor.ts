import { Curso } from "./curso";

export interface Tutor{
  id: number;
  nombre: string;
  correo: string;
  curso: Curso;
}
