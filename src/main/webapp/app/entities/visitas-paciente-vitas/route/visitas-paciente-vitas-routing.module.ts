import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { VisitasPacienteVitasComponent } from '../list/visitas-paciente-vitas.component';
import { VisitasPacienteVitasDetailComponent } from '../detail/visitas-paciente-vitas-detail.component';
import { VisitasPacienteVitasUpdateComponent } from '../update/visitas-paciente-vitas-update.component';
import { VisitasPacienteVitasRoutingResolveService } from './visitas-paciente-vitas-routing-resolve.service';

const visitasPacienteRoute: Routes = [
  {
    path: '',
    component: VisitasPacienteVitasComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VisitasPacienteVitasDetailComponent,
    resolve: {
      visitasPaciente: VisitasPacienteVitasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VisitasPacienteVitasUpdateComponent,
    resolve: {
      visitasPaciente: VisitasPacienteVitasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VisitasPacienteVitasUpdateComponent,
    resolve: {
      visitasPaciente: VisitasPacienteVitasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(visitasPacienteRoute)],
  exports: [RouterModule],
})
export class VisitasPacienteVitasRoutingModule {}
