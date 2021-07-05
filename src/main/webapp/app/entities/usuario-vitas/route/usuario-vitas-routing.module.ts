import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UsuarioVitasComponent } from '../list/usuario-vitas.component';
import { UsuarioVitasDetailComponent } from '../detail/usuario-vitas-detail.component';
import { UsuarioVitasUpdateComponent } from '../update/usuario-vitas-update.component';
import { UsuarioVitasRoutingResolveService } from './usuario-vitas-routing-resolve.service';

const usuarioRoute: Routes = [
  {
    path: '',
    component: UsuarioVitasComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UsuarioVitasDetailComponent,
    resolve: {
      usuario: UsuarioVitasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UsuarioVitasUpdateComponent,
    resolve: {
      usuario: UsuarioVitasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UsuarioVitasUpdateComponent,
    resolve: {
      usuario: UsuarioVitasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(usuarioRoute)],
  exports: [RouterModule],
})
export class UsuarioVitasRoutingModule {}
