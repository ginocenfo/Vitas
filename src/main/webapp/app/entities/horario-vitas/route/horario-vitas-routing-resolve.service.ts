import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHorarioVitas, HorarioVitas } from '../horario-vitas.model';
import { HorarioVitasService } from '../service/horario-vitas.service';

@Injectable({ providedIn: 'root' })
export class HorarioVitasRoutingResolveService implements Resolve<IHorarioVitas> {
  constructor(protected service: HorarioVitasService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHorarioVitas> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((horario: HttpResponse<HorarioVitas>) => {
          if (horario.body) {
            return of(horario.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HorarioVitas());
  }
}
