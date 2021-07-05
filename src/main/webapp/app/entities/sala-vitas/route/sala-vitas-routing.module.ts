import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SalaVitasComponent } from '../list/sala-vitas.component';
import { SalaVitasDetailComponent } from '../detail/sala-vitas-detail.component';
import { SalaVitasUpdateComponent } from '../update/sala-vitas-update.component';
import { SalaVitasRoutingResolveService } from './sala-vitas-routing-resolve.service';

const salaRoute: Routes = [
  {
    path: '',
    component: SalaVitasComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SalaVitasDetailComponent,
    resolve: {
      sala: SalaVitasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SalaVitasUpdateComponent,
    resolve: {
      sala: SalaVitasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SalaVitasUpdateComponent,
    resolve: {
      sala: SalaVitasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(salaRoute)],
  exports: [RouterModule],
})
export class SalaVitasRoutingModule {}
