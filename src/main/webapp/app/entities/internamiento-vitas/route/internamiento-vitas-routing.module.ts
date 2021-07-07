import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { InternamientoVitasComponent } from '../list/internamiento-vitas.component';
import { InternamientoVitasDetailComponent } from '../detail/internamiento-vitas-detail.component';
import { InternamientoVitasUpdateComponent } from '../update/internamiento-vitas-update.component';
import { InternamientoVitasRoutingResolveService } from './internamiento-vitas-routing-resolve.service';

const internamientoRoute: Routes = [
  {
    path: '',
    component: InternamientoVitasComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InternamientoVitasDetailComponent,
    resolve: {
      internamiento: InternamientoVitasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InternamientoVitasUpdateComponent,
    resolve: {
      internamiento: InternamientoVitasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InternamientoVitasUpdateComponent,
    resolve: {
      internamiento: InternamientoVitasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(internamientoRoute)],
  exports: [RouterModule],
})
export class InternamientoVitasRoutingModule {}
