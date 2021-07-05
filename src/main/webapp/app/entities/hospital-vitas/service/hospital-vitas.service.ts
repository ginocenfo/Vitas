import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHospitalVitas, getHospitalVitasIdentifier } from '../hospital-vitas.model';

export type EntityResponseType = HttpResponse<IHospitalVitas>;
export type EntityArrayResponseType = HttpResponse<IHospitalVitas[]>;

@Injectable({ providedIn: 'root' })
export class HospitalVitasService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/hospitals');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(hospital: IHospitalVitas): Observable<EntityResponseType> {
    return this.http.post<IHospitalVitas>(this.resourceUrl, hospital, { observe: 'response' });
  }

  update(hospital: IHospitalVitas): Observable<EntityResponseType> {
    return this.http.put<IHospitalVitas>(`${this.resourceUrl}/${getHospitalVitasIdentifier(hospital) as number}`, hospital, {
      observe: 'response',
    });
  }

  partialUpdate(hospital: IHospitalVitas): Observable<EntityResponseType> {
    return this.http.patch<IHospitalVitas>(`${this.resourceUrl}/${getHospitalVitasIdentifier(hospital) as number}`, hospital, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHospitalVitas>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHospitalVitas[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addHospitalVitasToCollectionIfMissing(
    hospitalCollection: IHospitalVitas[],
    ...hospitalsToCheck: (IHospitalVitas | null | undefined)[]
  ): IHospitalVitas[] {
    const hospitals: IHospitalVitas[] = hospitalsToCheck.filter(isPresent);
    if (hospitals.length > 0) {
      const hospitalCollectionIdentifiers = hospitalCollection.map(hospitalItem => getHospitalVitasIdentifier(hospitalItem)!);
      const hospitalsToAdd = hospitals.filter(hospitalItem => {
        const hospitalIdentifier = getHospitalVitasIdentifier(hospitalItem);
        if (hospitalIdentifier == null || hospitalCollectionIdentifiers.includes(hospitalIdentifier)) {
          return false;
        }
        hospitalCollectionIdentifiers.push(hospitalIdentifier);
        return true;
      });
      return [...hospitalsToAdd, ...hospitalCollection];
    }
    return hospitalCollection;
  }
}
