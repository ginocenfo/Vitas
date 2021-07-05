import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IUsuarioVitas } from '../usuario-vitas.model';
import { UsuarioVitasService } from '../service/usuario-vitas.service';

@Component({
  templateUrl: './usuario-vitas-delete-dialog.component.html',
})
export class UsuarioVitasDeleteDialogComponent {
  usuario?: IUsuarioVitas;

  constructor(protected usuarioService: UsuarioVitasService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.usuarioService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
