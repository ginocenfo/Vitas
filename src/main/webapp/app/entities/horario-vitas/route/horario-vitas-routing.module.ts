import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { HorarioVitasComponent } from '../list/horario-vitas.component';
import { HorarioVitasDetailComponent } from '../detail/horario-vitas-detail.component';
import { HorarioVitasUpdateComponent } from '../update/horario-vitas-update.component';
import { HorarioVitasRoutingResolveService } from './horario-vitas-routing-resolve.service';

const horarioRoute: Routes = [
  {
    path: '',
    component: HorarioVitasComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HorarioVitasDetailComponent,
    resolve: {
      horario: HorarioVitasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HorarioVitasUpdateComponent,
    resolve: {
      horario: HorarioVitasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HorarioVitasUpdateComponent,
    resolve: {
      horario: HorarioVitasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(horarioRoute)],
  exports: [RouterModule],
})
export class HorarioVitasRoutingModule {}
