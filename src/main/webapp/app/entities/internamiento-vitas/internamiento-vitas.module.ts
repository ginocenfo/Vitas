import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { InternamientoVitasComponent } from './list/internamiento-vitas.component';
import { InternamientoVitasDetailComponent } from './detail/internamiento-vitas-detail.component';
import { InternamientoVitasUpdateComponent } from './update/internamiento-vitas-update.component';
import { InternamientoVitasDeleteDialogComponent } from './delete/internamiento-vitas-delete-dialog.component';
import { InternamientoVitasRoutingModule } from './route/internamiento-vitas-routing.module';

@NgModule({
  imports: [SharedModule, InternamientoVitasRoutingModule],
  declarations: [
    InternamientoVitasComponent,
    InternamientoVitasDetailComponent,
    InternamientoVitasUpdateComponent,
    InternamientoVitasDeleteDialogComponent,
  ],
  entryComponents: [InternamientoVitasDeleteDialogComponent],
})
export class InternamientoVitasModule {}
