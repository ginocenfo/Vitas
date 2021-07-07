import * as dayjs from 'dayjs';
import { IUsuarioVitas } from 'app/entities/usuario-vitas/usuario-vitas.model';
import { ISalaVitas } from 'app/entities/sala-vitas/sala-vitas.model';

export interface IInternamientoVitas {
  id?: number;
  inicioInternamiento?: dayjs.Dayjs | null;
  duracionInternamiento?: number | null;
  paciente?: IUsuarioVitas | null;
  sala?: ISalaVitas | null;
}

export class InternamientoVitas implements IInternamientoVitas {
  constructor(
    public id?: number,
    public inicioInternamiento?: dayjs.Dayjs | null,
    public duracionInternamiento?: number | null,
    public paciente?: IUsuarioVitas | null,
    public sala?: ISalaVitas | null
  ) {}
}

export function getInternamientoVitasIdentifier(internamiento: IInternamientoVitas): number | undefined {
  return internamiento.id;
}
