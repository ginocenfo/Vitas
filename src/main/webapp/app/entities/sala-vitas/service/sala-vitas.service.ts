import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISalaVitas, getSalaVitasIdentifier } from '../sala-vitas.model';

export type EntityResponseType = HttpResponse<ISalaVitas>;
export type EntityArrayResponseType = HttpResponse<ISalaVitas[]>;

@Injectable({ providedIn: 'root' })
export class SalaVitasService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/salas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(sala: ISalaVitas): Observable<EntityResponseType> {
    return this.http.post<ISalaVitas>(this.resourceUrl, sala, { observe: 'response' });
  }

  update(sala: ISalaVitas): Observable<EntityResponseType> {
    return this.http.put<ISalaVitas>(`${this.resourceUrl}/${getSalaVitasIdentifier(sala) as number}`, sala, { observe: 'response' });
  }

  partialUpdate(sala: ISalaVitas): Observable<EntityResponseType> {
    return this.http.patch<ISalaVitas>(`${this.resourceUrl}/${getSalaVitasIdentifier(sala) as number}`, sala, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISalaVitas>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISalaVitas[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSalaVitasToCollectionIfMissing(salaCollection: ISalaVitas[], ...salasToCheck: (ISalaVitas | null | undefined)[]): ISalaVitas[] {
    const salas: ISalaVitas[] = salasToCheck.filter(isPresent);
    if (salas.length > 0) {
      const salaCollectionIdentifiers = salaCollection.map(salaItem => getSalaVitasIdentifier(salaItem)!);
      const salasToAdd = salas.filter(salaItem => {
        const salaIdentifier = getSalaVitasIdentifier(salaItem);
        if (salaIdentifier == null || salaCollectionIdentifiers.includes(salaIdentifier)) {
          return false;
        }
        salaCollectionIdentifiers.push(salaIdentifier);
        return true;
      });
      return [...salasToAdd, ...salaCollection];
    }
    return salaCollection;
  }
}
