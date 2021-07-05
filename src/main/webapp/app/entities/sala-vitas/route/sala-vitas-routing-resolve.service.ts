import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISalaVitas, SalaVitas } from '../sala-vitas.model';
import { SalaVitasService } from '../service/sala-vitas.service';

@Injectable({ providedIn: 'root' })
export class SalaVitasRoutingResolveService implements Resolve<ISalaVitas> {
  constructor(protected service: SalaVitasService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISalaVitas> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((sala: HttpResponse<SalaVitas>) => {
          if (sala.body) {
            return of(sala.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SalaVitas());
  }
}
