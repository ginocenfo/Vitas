import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SalaVitasComponent } from './list/sala-vitas.component';
import { SalaVitasDetailComponent } from './detail/sala-vitas-detail.component';
import { SalaVitasUpdateComponent } from './update/sala-vitas-update.component';
import { SalaVitasDeleteDialogComponent } from './delete/sala-vitas-delete-dialog.component';
import { SalaVitasRoutingModule } from './route/sala-vitas-routing.module';

@NgModule({
  imports: [SharedModule, SalaVitasRoutingModule],
  declarations: [SalaVitasComponent, SalaVitasDetailComponent, SalaVitasUpdateComponent, SalaVitasDeleteDialogComponent],
  entryComponents: [SalaVitasDeleteDialogComponent],
})
export class SalaVitasModule {}
