import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { HospitalVitasComponent } from '../list/hospital-vitas.component';
import { HospitalVitasDetailComponent } from '../detail/hospital-vitas-detail.component';
import { HospitalVitasUpdateComponent } from '../update/hospital-vitas-update.component';
import { HospitalVitasRoutingResolveService } from './hospital-vitas-routing-resolve.service';

const hospitalRoute: Routes = [
  {
    path: '',
    component: HospitalVitasComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HospitalVitasDetailComponent,
    resolve: {
      hospital: HospitalVitasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HospitalVitasUpdateComponent,
    resolve: {
      hospital: HospitalVitasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HospitalVitasUpdateComponent,
    resolve: {
      hospital: HospitalVitasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(hospitalRoute)],
  exports: [RouterModule],
})
export class HospitalVitasRoutingModule {}
