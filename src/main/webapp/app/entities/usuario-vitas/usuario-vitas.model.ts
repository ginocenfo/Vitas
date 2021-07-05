import * as dayjs from 'dayjs';
import { TipoDeSangre } from 'app/entities/enumerations/tipo-de-sangre.model';

export interface IUsuarioVitas {
  id?: number;
  identidad?: number | null;
  primerNombre?: string | null;
  segundoNombre?: string | null;
  primerApellido?: string | null;
  segundoApellido?: string | null;
  fechaNacimiento?: dayjs.Dayjs | null;
  paisNacimiento?: string | null;
  telefono?: string | null;
  tipoSangre?: TipoDeSangre | null;
  mail?: string | null;
  centroMedico?: string | null;
}

export class UsuarioVitas implements IUsuarioVitas {
  constructor(
    public id?: number,
    public identidad?: number | null,
    public primerNombre?: string | null,
    public segundoNombre?: string | null,
    public primerApellido?: string | null,
    public segundoApellido?: string | null,
    public fechaNacimiento?: dayjs.Dayjs | null,
    public paisNacimiento?: string | null,
    public telefono?: string | null,
    public tipoSangre?: TipoDeSangre | null,
    public mail?: string | null,
    public centroMedico?: string | null
  ) {}
}

export function getUsuarioVitasIdentifier(usuario: IUsuarioVitas): number | undefined {
  return usuario.id;
}