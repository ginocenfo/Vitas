import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IHorarioVitas } from '../horario-vitas.model';
import { HorarioVitasService } from '../service/horario-vitas.service';

@Component({
  templateUrl: './horario-vitas-delete-dialog.component.html',
})
export class HorarioVitasDeleteDialogComponent {
  horario?: IHorarioVitas;

  constructor(protected horarioService: HorarioVitasService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.horarioService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
