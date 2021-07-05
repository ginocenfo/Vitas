import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHorarioVitas, getHorarioVitasIdentifier } from '../horario-vitas.model';

export type EntityResponseType = HttpResponse<IHorarioVitas>;
export type EntityArrayResponseType = HttpResponse<IHorarioVitas[]>;

@Injectable({ providedIn: 'root' })
export class HorarioVitasService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/horarios');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(horario: IHorarioVitas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(horario);
    return this.http
      .post<IHorarioVitas>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(horario: IHorarioVitas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(horario);
    return this.http
      .put<IHorarioVitas>(`${this.resourceUrl}/${getHorarioVitasIdentifier(horario) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(horario: IHorarioVitas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(horario);
    return this.http
      .patch<IHorarioVitas>(`${this.resourceUrl}/${getHorarioVitasIdentifier(horario) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IHorarioVitas>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IHorarioVitas[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addHorarioVitasToCollectionIfMissing(
    horarioCollection: IHorarioVitas[],
    ...horariosToCheck: (IHorarioVitas | null | undefined)[]
  ): IHorarioVitas[] {
    const horarios: IHorarioVitas[] = horariosToCheck.filter(isPresent);
    if (horarios.length > 0) {
      const horarioCollectionIdentifiers = horarioCollection.map(horarioItem => getHorarioVitasIdentifier(horarioItem)!);
      const horariosToAdd = horarios.filter(horarioItem => {
        const horarioIdentifier = getHorarioVitasIdentifier(horarioItem);
        if (horarioIdentifier == null || horarioCollectionIdentifiers.includes(horarioIdentifier)) {
          return false;
        }
        horarioCollectionIdentifiers.push(horarioIdentifier);
        return true;
      });
      return [...horariosToAdd, ...horarioCollection];
    }
    return horarioCollection;
  }

  protected convertDateFromClient(horario: IHorarioVitas): IHorarioVitas {
    return Object.assign({}, horario, {
      horaEntrada: horario.horaEntrada?.isValid() ? horario.horaEntrada.toJSON() : undefined,
      horaSalida: horario.horaSalida?.isValid() ? horario.horaSalida.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.horaEntrada = res.body.horaEntrada ? dayjs(res.body.horaEntrada) : undefined;
      res.body.horaSalida = res.body.horaSalida ? dayjs(res.body.horaSalida) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((horario: IHorarioVitas) => {
        horario.horaEntrada = horario.horaEntrada ? dayjs(horario.horaEntrada) : undefined;
        horario.horaSalida = horario.horaSalida ? dayjs(horario.horaSalida) : undefined;
      });
    }
    return res;
  }
}
