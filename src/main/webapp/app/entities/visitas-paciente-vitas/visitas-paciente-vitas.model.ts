import * as dayjs from 'dayjs';
import { IUsuarioVitas } from 'app/entities/usuario-vitas/usuario-vitas.model';
import { ISalaVitas } from 'app/entities/sala-vitas/sala-vitas.model';

export interface IVisitasPacienteVitas {
  id?: number;
  hora?: dayjs.Dayjs | null;
  duracion?: number | null;
  paciente?: IUsuarioVitas | null;
  visitante?: IUsuarioVitas | null;
  sala?: ISalaVitas | null;
}

export class VisitasPacienteVitas implements IVisitasPacienteVitas {
  constructor(
    public id?: number,
    public hora?: dayjs.Dayjs | null,
    public duracion?: number | null,
    public paciente?: IUsuarioVitas | null,
    public visitante?: IUsuarioVitas | null,
    public sala?: ISalaVitas | null
  ) {}
}

export function getVisitasPacienteVitasIdentifier(visitasPaciente: IVisitasPacienteVitas): number | undefined {
  return visitasPaciente.id;
}
