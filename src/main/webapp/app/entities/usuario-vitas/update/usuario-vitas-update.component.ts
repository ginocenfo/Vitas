import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IUsuarioVitas, UsuarioVitas } from '../usuario-vitas.model';
import { UsuarioVitasService } from '../service/usuario-vitas.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

@Component({
  selector: 'jhi-usuario-vitas-update',
  templateUrl: './usuario-vitas-update.component.html',
})
export class UsuarioVitasUpdateComponent implements OnInit {
  isSaving = false;

  usersSharedCollection: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    identidad: [],
    primerNombre: [],
    segundoNombre: [],
    primerApellido: [],
    segundoApellido: [],
    fechaNacimiento: [],
    paisNacimiento: [],
    telefono: [],
    tipoSangre: [],
    mail: [],
    centroMedico: [],
    tipoUsuario: [],
    user: [],
  });

  constructor(
    protected usuarioService: UsuarioVitasService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ usuario }) => {
      this.updateForm(usuario);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const usuario = this.createFromForm();
    if (usuario.id !== undefined) {
      this.subscribeToSaveResponse(this.usuarioService.update(usuario));
    } else {
      this.subscribeToSaveResponse(this.usuarioService.create(usuario));
    }
  }

  trackUserById(index: number, item: IUser): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuarioVitas>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(usuario: IUsuarioVitas): void {
    this.editForm.patchValue({
      id: usuario.id,
      identidad: usuario.identidad,
      primerNombre: usuario.primerNombre,
      segundoNombre: usuario.segundoNombre,
      primerApellido: usuario.primerApellido,
      segundoApellido: usuario.segundoApellido,
      fechaNacimiento: usuario.fechaNacimiento,
      paisNacimiento: usuario.paisNacimiento,
      telefono: usuario.telefono,
      tipoSangre: usuario.tipoSangre,
      mail: usuario.mail,
      centroMedico: usuario.centroMedico,
      tipoUsuario: usuario.tipoUsuario,
      user: usuario.user,
    });

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(this.usersSharedCollection, usuario.user);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users, this.editForm.get('user')!.value)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }

  protected createFromForm(): IUsuarioVitas {
    return {
      ...new UsuarioVitas(),
      id: this.editForm.get(['id'])!.value,
      identidad: this.editForm.get(['identidad'])!.value,
      primerNombre: this.editForm.get(['primerNombre'])!.value,
      segundoNombre: this.editForm.get(['segundoNombre'])!.value,
      primerApellido: this.editForm.get(['primerApellido'])!.value,
      segundoApellido: this.editForm.get(['segundoApellido'])!.value,
      fechaNacimiento: this.editForm.get(['fechaNacimiento'])!.value,
      paisNacimiento: this.editForm.get(['paisNacimiento'])!.value,
      telefono: this.editForm.get(['telefono'])!.value,
      tipoSangre: this.editForm.get(['tipoSangre'])!.value,
      mail: this.editForm.get(['mail'])!.value,
      centroMedico: this.editForm.get(['centroMedico'])!.value,
      tipoUsuario: this.editForm.get(['tipoUsuario'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }
}
