import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IInternamientoVitas, InternamientoVitas } from '../internamiento-vitas.model';
import { InternamientoVitasService } from '../service/internamiento-vitas.service';

@Injectable({ providedIn: 'root' })
export class InternamientoVitasRoutingResolveService implements Resolve<IInternamientoVitas> {
  constructor(protected service: InternamientoVitasService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInternamientoVitas> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((internamiento: HttpResponse<InternamientoVitas>) => {
          if (internamiento.body) {
            return of(internamiento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InternamientoVitas());
  }
}
