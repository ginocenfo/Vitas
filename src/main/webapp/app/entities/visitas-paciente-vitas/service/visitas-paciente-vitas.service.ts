import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVisitasPacienteVitas, getVisitasPacienteVitasIdentifier } from '../visitas-paciente-vitas.model';

export type EntityResponseType = HttpResponse<IVisitasPacienteVitas>;
export type EntityArrayResponseType = HttpResponse<IVisitasPacienteVitas[]>;

@Injectable({ providedIn: 'root' })
export class VisitasPacienteVitasService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/visitas-pacientes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(visitasPaciente: IVisitasPacienteVitas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(visitasPaciente);
    return this.http
      .post<IVisitasPacienteVitas>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(visitasPaciente: IVisitasPacienteVitas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(visitasPaciente);
    return this.http
      .put<IVisitasPacienteVitas>(`${this.resourceUrl}/${getVisitasPacienteVitasIdentifier(visitasPaciente) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(visitasPaciente: IVisitasPacienteVitas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(visitasPaciente);
    return this.http
      .patch<IVisitasPacienteVitas>(`${this.resourceUrl}/${getVisitasPacienteVitasIdentifier(visitasPaciente) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVisitasPacienteVitas>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVisitasPacienteVitas[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addVisitasPacienteVitasToCollectionIfMissing(
    visitasPacienteCollection: IVisitasPacienteVitas[],
    ...visitasPacientesToCheck: (IVisitasPacienteVitas | null | undefined)[]
  ): IVisitasPacienteVitas[] {
    const visitasPacientes: IVisitasPacienteVitas[] = visitasPacientesToCheck.filter(isPresent);
    if (visitasPacientes.length > 0) {
      const visitasPacienteCollectionIdentifiers = visitasPacienteCollection.map(
        visitasPacienteItem => getVisitasPacienteVitasIdentifier(visitasPacienteItem)!
      );
      const visitasPacientesToAdd = visitasPacientes.filter(visitasPacienteItem => {
        const visitasPacienteIdentifier = getVisitasPacienteVitasIdentifier(visitasPacienteItem);
        if (visitasPacienteIdentifier == null || visitasPacienteCollectionIdentifiers.includes(visitasPacienteIdentifier)) {
          return false;
        }
        visitasPacienteCollectionIdentifiers.push(visitasPacienteIdentifier);
        return true;
      });
      return [...visitasPacientesToAdd, ...visitasPacienteCollection];
    }
    return visitasPacienteCollection;
  }

  protected convertDateFromClient(visitasPaciente: IVisitasPacienteVitas): IVisitasPacienteVitas {
    return Object.assign({}, visitasPaciente, {
      hora: visitasPaciente.hora?.isValid() ? visitasPaciente.hora.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.hora = res.body.hora ? dayjs(res.body.hora) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((visitasPaciente: IVisitasPacienteVitas) => {
        visitasPaciente.hora = visitasPaciente.hora ? dayjs(visitasPaciente.hora) : undefined;
      });
    }
    return res;
  }
}
