import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { HospitalVitasComponent } from './list/hospital-vitas.component';
import { HospitalVitasDetailComponent } from './detail/hospital-vitas-detail.component';
import { HospitalVitasUpdateComponent } from './update/hospital-vitas-update.component';
import { HospitalVitasDeleteDialogComponent } from './delete/hospital-vitas-delete-dialog.component';
import { HospitalVitasRoutingModule } from './route/hospital-vitas-routing.module';

@NgModule({
  imports: [SharedModule, HospitalVitasRoutingModule],
  declarations: [HospitalVitasComponent, HospitalVitasDetailComponent, HospitalVitasUpdateComponent, HospitalVitasDeleteDialogComponent],
  entryComponents: [HospitalVitasDeleteDialogComponent],
})
export class HospitalVitasModule {}
