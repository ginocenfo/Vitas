import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { HorarioVitasComponent } from './list/horario-vitas.component';
import { HorarioVitasDetailComponent } from './detail/horario-vitas-detail.component';
import { HorarioVitasUpdateComponent } from './update/horario-vitas-update.component';
import { HorarioVitasDeleteDialogComponent } from './delete/horario-vitas-delete-dialog.component';
import { HorarioVitasRoutingModule } from './route/horario-vitas-routing.module';

@NgModule({
  imports: [SharedModule, HorarioVitasRoutingModule],
  declarations: [HorarioVitasComponent, HorarioVitasDetailComponent, HorarioVitasUpdateComponent, HorarioVitasDeleteDialogComponent],
  entryComponents: [HorarioVitasDeleteDialogComponent],
})
export class HorarioVitasModule {}
