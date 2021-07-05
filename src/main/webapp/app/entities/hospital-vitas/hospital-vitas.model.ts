import { ISalaVitas } from 'app/entities/sala-vitas/sala-vitas.model';

export interface IHospitalVitas {
  id?: number;
  nombre?: string | null;
  provincia?: string | null;
  canton?: string | null;
  distrito?: string | null;
  direccion?: string | null;
  telefono?: string | null;
  email?: string | null;
  salas?: ISalaVitas[] | null;
}

export class HospitalVitas implements IHospitalVitas {
  constructor(
    public id?: number,
    public nombre?: string | null,
    public provincia?: string | null,
    public canton?: string | null,
    public distrito?: string | null,
    public direccion?: string | null,
    public telefono?: string | null,
    public email?: string | null,
    public salas?: ISalaVitas[] | null
  ) {}
}

export function getHospitalVitasIdentifier(hospital: IHospitalVitas): number | undefined {
  return hospital.id;
}
