import * as dayjs from 'dayjs';
import { ISalaVitas } from 'app/entities/sala-vitas/sala-vitas.model';

export interface IHorarioVitas {
  id?: number;
  horaEntrada?: dayjs.Dayjs | null;
  horaSalida?: dayjs.Dayjs | null;
  horario?: ISalaVitas | null;
}

export class HorarioVitas implements IHorarioVitas {
  constructor(
    public id?: number,
    public horaEntrada?: dayjs.Dayjs | null,
    public horaSalida?: dayjs.Dayjs | null,
    public horario?: ISalaVitas | null
  ) {}
}

export function getHorarioVitasIdentifier(horario: IHorarioVitas): number | undefined {
  return horario.id;
}
