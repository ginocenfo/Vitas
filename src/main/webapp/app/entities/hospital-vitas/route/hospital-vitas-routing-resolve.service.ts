import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHospitalVitas, HospitalVitas } from '../hospital-vitas.model';
import { HospitalVitasService } from '../service/hospital-vitas.service';

@Injectable({ providedIn: 'root' })
export class HospitalVitasRoutingResolveService implements Resolve<IHospitalVitas> {
  constructor(protected service: HospitalVitasService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHospitalVitas> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((hospital: HttpResponse<HospitalVitas>) => {
          if (hospital.body) {
            return of(hospital.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HospitalVitas());
  }
}
