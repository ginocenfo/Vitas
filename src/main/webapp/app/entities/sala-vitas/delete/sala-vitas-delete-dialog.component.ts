import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISalaVitas } from '../sala-vitas.model';
import { SalaVitasService } from '../service/sala-vitas.service';

@Component({
  templateUrl: './sala-vitas-delete-dialog.component.html',
})
export class SalaVitasDeleteDialogComponent {
  sala?: ISalaVitas;

  constructor(protected salaService: SalaVitasService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.salaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
