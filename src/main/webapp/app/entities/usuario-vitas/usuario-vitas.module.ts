import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { UsuarioVitasComponent } from './list/usuario-vitas.component';
import { UsuarioVitasDetailComponent } from './detail/usuario-vitas-detail.component';
import { UsuarioVitasUpdateComponent } from './update/usuario-vitas-update.component';
import { UsuarioVitasDeleteDialogComponent } from './delete/usuario-vitas-delete-dialog.component';
import { UsuarioVitasRoutingModule } from './route/usuario-vitas-routing.module';

@NgModule({
  imports: [SharedModule, UsuarioVitasRoutingModule],
  declarations: [UsuarioVitasComponent, UsuarioVitasDetailComponent, UsuarioVitasUpdateComponent, UsuarioVitasDeleteDialogComponent],
  entryComponents: [UsuarioVitasDeleteDialogComponent],
})
export class UsuarioVitasModule {}
