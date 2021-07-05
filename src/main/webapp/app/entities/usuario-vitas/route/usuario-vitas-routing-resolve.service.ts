import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUsuarioVitas, UsuarioVitas } from '../usuario-vitas.model';
import { UsuarioVitasService } from '../service/usuario-vitas.service';

@Injectable({ providedIn: 'root' })
export class UsuarioVitasRoutingResolveService implements Resolve<IUsuarioVitas> {
  constructor(protected service: UsuarioVitasService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUsuarioVitas> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((usuario: HttpResponse<UsuarioVitas>) => {
          if (usuario.body) {
            return of(usuario.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UsuarioVitas());
  }
}
