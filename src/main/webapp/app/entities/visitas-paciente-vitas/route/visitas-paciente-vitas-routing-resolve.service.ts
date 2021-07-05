import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IVisitasPacienteVitas, VisitasPacienteVitas } from '../visitas-paciente-vitas.model';
import { VisitasPacienteVitasService } from '../service/visitas-paciente-vitas.service';

@Injectable({ providedIn: 'root' })
export class VisitasPacienteVitasRoutingResolveService implements Resolve<IVisitasPacienteVitas> {
  constructor(protected service: VisitasPacienteVitasService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVisitasPacienteVitas> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((visitasPaciente: HttpResponse<VisitasPacienteVitas>) => {
          if (visitasPaciente.body) {
            return of(visitasPaciente.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new VisitasPacienteVitas());
  }
}
