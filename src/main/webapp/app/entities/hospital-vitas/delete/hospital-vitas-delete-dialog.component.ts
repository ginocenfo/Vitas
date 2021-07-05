import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IHospitalVitas } from '../hospital-vitas.model';
import { HospitalVitasService } from '../service/hospital-vitas.service';

@Component({
  templateUrl: './hospital-vitas-delete-dialog.component.html',
})
export class HospitalVitasDeleteDialogComponent {
  hospital?: IHospitalVitas;

  constructor(protected hospitalService: HospitalVitasService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.hospitalService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
