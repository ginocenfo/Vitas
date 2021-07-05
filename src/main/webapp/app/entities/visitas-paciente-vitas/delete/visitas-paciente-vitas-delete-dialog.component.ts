import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IVisitasPacienteVitas } from '../visitas-paciente-vitas.model';
import { VisitasPacienteVitasService } from '../service/visitas-paciente-vitas.service';

@Component({
  templateUrl: './visitas-paciente-vitas-delete-dialog.component.html',
})
export class VisitasPacienteVitasDeleteDialogComponent {
  visitasPaciente?: IVisitasPacienteVitas;

  constructor(protected visitasPacienteService: VisitasPacienteVitasService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.visitasPacienteService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
