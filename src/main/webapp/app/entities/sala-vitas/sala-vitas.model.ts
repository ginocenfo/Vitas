import { IHospitalVitas } from 'app/entities/hospital-vitas/hospital-vitas.model';

export interface ISalaVitas {
  id?: number;
  nombre?: string | null;
  numero?: string | null;
  piso?: number | null;
  totalPacientes?: number | null;
  numPacientes?: number | null;
  numVisitantes?: number | null;
  visitaDisponible?: boolean | null;
  hospital?: IHospitalVitas | null;
}

export class SalaVitas implements ISalaVitas {
  constructor(
    public id?: number,
    public nombre?: string | null,
    public numero?: string | null,
    public piso?: number | null,
    public totalPacientes?: number | null,
    public numPacientes?: number | null,
    public numVisitantes?: number | null,
    public visitaDisponible?: boolean | null,
    public hospital?: IHospitalVitas | null
  ) {
    this.visitaDisponible = this.visitaDisponible ?? false;
  }
}

export function getSalaVitasIdentifier(sala: ISalaVitas): number | undefined {
  return sala.id;
}
