import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IVisitasPacienteVitas, VisitasPacienteVitas } from '../visitas-paciente-vitas.model';
import { VisitasPacienteVitasService } from '../service/visitas-paciente-vitas.service';
import { IUsuarioVitas } from 'app/entities/usuario-vitas/usuario-vitas.model';
import { UsuarioVitasService } from 'app/entities/usuario-vitas/service/usuario-vitas.service';
import { ISalaVitas } from 'app/entities/sala-vitas/sala-vitas.model';
import { SalaVitasService } from 'app/entities/sala-vitas/service/sala-vitas.service';

@Component({
  selector: 'jhi-visitas-paciente-vitas-update',
  templateUrl: './visitas-paciente-vitas-update.component.html',
})
export class VisitasPacienteVitasUpdateComponent implements OnInit {
  isSaving = false;

  usuariosSharedCollection: IUsuarioVitas[] = [];
  salasSharedCollection: ISalaVitas[] = [];

  editForm = this.fb.group({
    id: [],
    hora: [],
    duracion: [],
    paciente: [],
    visitante: [],
    sala: [],
  });

  constructor(
    protected visitasPacienteService: VisitasPacienteVitasService,
    protected usuarioService: UsuarioVitasService,
    protected salaService: SalaVitasService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ visitasPaciente }) => {
      if (visitasPaciente.id === undefined) {
        const today = dayjs().startOf('day');
        visitasPaciente.hora = today;
      }

      this.updateForm(visitasPaciente);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const visitasPaciente = this.createFromForm();
    if (visitasPaciente.id !== undefined) {
      this.subscribeToSaveResponse(this.visitasPacienteService.update(visitasPaciente));
    } else {
      this.subscribeToSaveResponse(this.visitasPacienteService.create(visitasPaciente));
    }
  }

  trackUsuarioVitasById(index: number, item: IUsuarioVitas): number {
    return item.id!;
  }

  trackSalaVitasById(index: number, item: ISalaVitas): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVisitasPacienteVitas>>): void {
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

  protected updateForm(visitasPaciente: IVisitasPacienteVitas): void {
    this.editForm.patchValue({
      id: visitasPaciente.id,
      hora: visitasPaciente.hora ? visitasPaciente.hora.format(DATE_TIME_FORMAT) : null,
      duracion: visitasPaciente.duracion,
      paciente: visitasPaciente.paciente,
      visitante: visitasPaciente.visitante,
      sala: visitasPaciente.sala,
    });

    this.usuariosSharedCollection = this.usuarioService.addUsuarioVitasToCollectionIfMissing(
      this.usuariosSharedCollection,
      visitasPaciente.paciente,
      visitasPaciente.visitante
    );
    this.salasSharedCollection = this.salaService.addSalaVitasToCollectionIfMissing(this.salasSharedCollection, visitasPaciente.sala);
  }

  protected loadRelationshipsOptions(): void {
    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuarioVitas[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuarioVitas[]) =>
          this.usuarioService.addUsuarioVitasToCollectionIfMissing(
            usuarios,
            this.editForm.get('paciente')!.value,
            this.editForm.get('visitante')!.value
          )
        )
      )
      .subscribe((usuarios: IUsuarioVitas[]) => (this.usuariosSharedCollection = usuarios));

    this.salaService
      .query()
      .pipe(map((res: HttpResponse<ISalaVitas[]>) => res.body ?? []))
      .pipe(map((salas: ISalaVitas[]) => this.salaService.addSalaVitasToCollectionIfMissing(salas, this.editForm.get('sala')!.value)))
      .subscribe((salas: ISalaVitas[]) => (this.salasSharedCollection = salas));
  }

  protected createFromForm(): IVisitasPacienteVitas {
    return {
      ...new VisitasPacienteVitas(),
      id: this.editForm.get(['id'])!.value,
      hora: this.editForm.get(['hora'])!.value ? dayjs(this.editForm.get(['hora'])!.value, DATE_TIME_FORMAT) : undefined,
      duracion: this.editForm.get(['duracion'])!.value,
      paciente: this.editForm.get(['paciente'])!.value,
      visitante: this.editForm.get(['visitante'])!.value,
      sala: this.editForm.get(['sala'])!.value,
    };
  }
}
