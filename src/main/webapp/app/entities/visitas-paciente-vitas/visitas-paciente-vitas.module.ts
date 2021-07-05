import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { VisitasPacienteVitasComponent } from './list/visitas-paciente-vitas.component';
import { VisitasPacienteVitasDetailComponent } from './detail/visitas-paciente-vitas-detail.component';
import { VisitasPacienteVitasUpdateComponent } from './update/visitas-paciente-vitas-update.component';
import { VisitasPacienteVitasDeleteDialogComponent } from './delete/visitas-paciente-vitas-delete-dialog.component';
import { VisitasPacienteVitasRoutingModule } from './route/visitas-paciente-vitas-routing.module';

@NgModule({
  imports: [SharedModule, VisitasPacienteVitasRoutingModule],
  declarations: [
    VisitasPacienteVitasComponent,
    VisitasPacienteVitasDetailComponent,
    VisitasPacienteVitasUpdateComponent,
    VisitasPacienteVitasDeleteDialogComponent,
  ],
  entryComponents: [VisitasPacienteVitasDeleteDialogComponent],
})
export class VisitasPacienteVitasModule {}
