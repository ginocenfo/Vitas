import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInternamientoVitas, getInternamientoVitasIdentifier } from '../internamiento-vitas.model';

export type EntityResponseType = HttpResponse<IInternamientoVitas>;
export type EntityArrayResponseType = HttpResponse<IInternamientoVitas[]>;

@Injectable({ providedIn: 'root' })
export class InternamientoVitasService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/internamientos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(internamiento: IInternamientoVitas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(internamiento);
    return this.http
      .post<IInternamientoVitas>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(internamiento: IInternamientoVitas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(internamiento);
    return this.http
      .put<IInternamientoVitas>(`${this.resourceUrl}/${getInternamientoVitasIdentifier(internamiento) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(internamiento: IInternamientoVitas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(internamiento);
    return this.http
      .patch<IInternamientoVitas>(`${this.resourceUrl}/${getInternamientoVitasIdentifier(internamiento) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IInternamientoVitas>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInternamientoVitas[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addInternamientoVitasToCollectionIfMissing(
    internamientoCollection: IInternamientoVitas[],
    ...internamientosToCheck: (IInternamientoVitas | null | undefined)[]
  ): IInternamientoVitas[] {
    const internamientos: IInternamientoVitas[] = internamientosToCheck.filter(isPresent);
    if (internamientos.length > 0) {
      const internamientoCollectionIdentifiers = internamientoCollection.map(
        internamientoItem => getInternamientoVitasIdentifier(internamientoItem)!
      );
      const internamientosToAdd = internamientos.filter(internamientoItem => {
        const internamientoIdentifier = getInternamientoVitasIdentifier(internamientoItem);
        if (internamientoIdentifier == null || internamientoCollectionIdentifiers.includes(internamientoIdentifier)) {
          return false;
        }
        internamientoCollectionIdentifiers.push(internamientoIdentifier);
        return true;
      });
      return [...internamientosToAdd, ...internamientoCollection];
    }
    return internamientoCollection;
  }

  protected convertDateFromClient(internamiento: IInternamientoVitas): IInternamientoVitas {
    return Object.assign({}, internamiento, {
      inicioInternamiento: internamiento.inicioInternamiento?.isValid() ? internamiento.inicioInternamiento.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.inicioInternamiento = res.body.inicioInternamiento ? dayjs(res.body.inicioInternamiento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((internamiento: IInternamientoVitas) => {
        internamiento.inicioInternamiento = internamiento.inicioInternamiento ? dayjs(internamiento.inicioInternamiento) : undefined;
      });
    }
    return res;
  }
}
