import * as dayjs from 'dayjs';
import { IUsuarioVitas } from 'app/entities/usuario-vitas/usuario-vitas.model';
import { IInternamientoVitas } from 'app/entities/internamiento-vitas/internamiento-vitas.model';

export interface IVisitasPacienteVitas {
  id?: number;
  hora?: dayjs.Dayjs | null;
  duracion?: number | null;
  paciente?: IUsuarioVitas | null;
  visitante?: IUsuarioVitas | null;
  sala?: IInternamientoVitas | null;
}

export class VisitasPacienteVitas implements IVisitasPacienteVitas {
  constructor(
    public id?: number,
    public hora?: dayjs.Dayjs | null,
    public duracion?: number | null,
    public paciente?: IUsuarioVitas | null,
    public visitante?: IUsuarioVitas | null,
    public sala?: IInternamientoVitas | null
  ) {}
}

export function getVisitasPacienteVitasIdentifier(visitasPaciente: IVisitasPacienteVitas): number | undefined {
  return visitasPaciente.id;
}
