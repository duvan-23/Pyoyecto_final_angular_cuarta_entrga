import { Usuario } from "./usuario";

export interface Session{
  sessionActiva: boolean;
  usuarioActivo?: Usuario;
}
