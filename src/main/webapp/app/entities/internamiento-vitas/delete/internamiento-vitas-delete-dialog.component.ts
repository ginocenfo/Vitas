import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IInternamientoVitas } from '../internamiento-vitas.model';
import { InternamientoVitasService } from '../service/internamiento-vitas.service';

@Component({
  templateUrl: './internamiento-vitas-delete-dialog.component.html',
})
export class InternamientoVitasDeleteDialogComponent {
  internamiento?: IInternamientoVitas;

  constructor(protected internamientoService: InternamientoVitasService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.internamientoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
