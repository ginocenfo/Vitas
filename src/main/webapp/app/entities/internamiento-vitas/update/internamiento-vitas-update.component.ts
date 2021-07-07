import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IInternamientoVitas, InternamientoVitas } from '../internamiento-vitas.model';
import { InternamientoVitasService } from '../service/internamiento-vitas.service';
import { IUsuarioVitas } from 'app/entities/usuario-vitas/usuario-vitas.model';
import { UsuarioVitasService } from 'app/entities/usuario-vitas/service/usuario-vitas.service';
import { ISalaVitas } from 'app/entities/sala-vitas/sala-vitas.model';
import { SalaVitasService } from 'app/entities/sala-vitas/service/sala-vitas.service';

@Component({
  selector: 'jhi-internamiento-vitas-update',
  templateUrl: './internamiento-vitas-update.component.html',
})
export class InternamientoVitasUpdateComponent implements OnInit {
  isSaving = false;

  usuariosSharedCollection: IUsuarioVitas[] = [];
  salasSharedCollection: ISalaVitas[] = [];

  editForm = this.fb.group({
    id: [],
    inicioInternamiento: [],
    duracionInternamiento: [],
    paciente: [],
    sala: [],
  });

  constructor(
    protected internamientoService: InternamientoVitasService,
    protected usuarioService: UsuarioVitasService,
    protected salaService: SalaVitasService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ internamiento }) => {
      if (internamiento.id === undefined) {
        const today = dayjs().startOf('day');
        internamiento.inicioInternamiento = today;
      }

      this.updateForm(internamiento);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const internamiento = this.createFromForm();
    if (internamiento.id !== undefined) {
      this.subscribeToSaveResponse(this.internamientoService.update(internamiento));
    } else {
      this.subscribeToSaveResponse(this.internamientoService.create(internamiento));
    }
  }

  trackUsuarioVitasById(index: number, item: IUsuarioVitas): number {
    return item.id!;
  }

  trackSalaVitasById(index: number, item: ISalaVitas): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInternamientoVitas>>): void {
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

  protected updateForm(internamiento: IInternamientoVitas): void {
    this.editForm.patchValue({
      id: internamiento.id,
      inicioInternamiento: internamiento.inicioInternamiento ? internamiento.inicioInternamiento.format(DATE_TIME_FORMAT) : null,
      duracionInternamiento: internamiento.duracionInternamiento,
      paciente: internamiento.paciente,
      sala: internamiento.sala,
    });

    this.usuariosSharedCollection = this.usuarioService.addUsuarioVitasToCollectionIfMissing(
      this.usuariosSharedCollection,
      internamiento.paciente
    );
    this.salasSharedCollection = this.salaService.addSalaVitasToCollectionIfMissing(this.salasSharedCollection, internamiento.sala);
  }

  protected loadRelationshipsOptions(): void {
    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuarioVitas[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuarioVitas[]) =>
          this.usuarioService.addUsuarioVitasToCollectionIfMissing(usuarios, this.editForm.get('paciente')!.value)
        )
      )
      .subscribe((usuarios: IUsuarioVitas[]) => (this.usuariosSharedCollection = usuarios));

    this.salaService
      .query()
      .pipe(map((res: HttpResponse<ISalaVitas[]>) => res.body ?? []))
      .pipe(map((salas: ISalaVitas[]) => this.salaService.addSalaVitasToCollectionIfMissing(salas, this.editForm.get('sala')!.value)))
      .subscribe((salas: ISalaVitas[]) => (this.salasSharedCollection = salas));
  }

  protected createFromForm(): IInternamientoVitas {
    return {
      ...new InternamientoVitas(),
      id: this.editForm.get(['id'])!.value,
      inicioInternamiento: this.editForm.get(['inicioInternamiento'])!.value
        ? dayjs(this.editForm.get(['inicioInternamiento'])!.value, DATE_TIME_FORMAT)
        : undefined,
      duracionInternamiento: this.editForm.get(['duracionInternamiento'])!.value,
      paciente: this.editForm.get(['paciente'])!.value,
      sala: this.editForm.get(['sala'])!.value,
    };
  }
}
