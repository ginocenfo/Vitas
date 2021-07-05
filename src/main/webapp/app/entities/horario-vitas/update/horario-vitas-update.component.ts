import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IHorarioVitas, HorarioVitas } from '../horario-vitas.model';
import { HorarioVitasService } from '../service/horario-vitas.service';
import { ISalaVitas } from 'app/entities/sala-vitas/sala-vitas.model';
import { SalaVitasService } from 'app/entities/sala-vitas/service/sala-vitas.service';

@Component({
  selector: 'jhi-horario-vitas-update',
  templateUrl: './horario-vitas-update.component.html',
})
export class HorarioVitasUpdateComponent implements OnInit {
  isSaving = false;

  salasSharedCollection: ISalaVitas[] = [];

  editForm = this.fb.group({
    id: [],
    horaEntrada: [],
    horaSalida: [],
    horario: [],
  });

  constructor(
    protected horarioService: HorarioVitasService,
    protected salaService: SalaVitasService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ horario }) => {
      if (horario.id === undefined) {
        const today = dayjs().startOf('day');
        horario.horaEntrada = today;
        horario.horaSalida = today;
      }

      this.updateForm(horario);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const horario = this.createFromForm();
    if (horario.id !== undefined) {
      this.subscribeToSaveResponse(this.horarioService.update(horario));
    } else {
      this.subscribeToSaveResponse(this.horarioService.create(horario));
    }
  }

  trackSalaVitasById(index: number, item: ISalaVitas): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHorarioVitas>>): void {
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

  protected updateForm(horario: IHorarioVitas): void {
    this.editForm.patchValue({
      id: horario.id,
      horaEntrada: horario.horaEntrada ? horario.horaEntrada.format(DATE_TIME_FORMAT) : null,
      horaSalida: horario.horaSalida ? horario.horaSalida.format(DATE_TIME_FORMAT) : null,
      horario: horario.horario,
    });

    this.salasSharedCollection = this.salaService.addSalaVitasToCollectionIfMissing(this.salasSharedCollection, horario.horario);
  }

  protected loadRelationshipsOptions(): void {
    this.salaService
      .query()
      .pipe(map((res: HttpResponse<ISalaVitas[]>) => res.body ?? []))
      .pipe(map((salas: ISalaVitas[]) => this.salaService.addSalaVitasToCollectionIfMissing(salas, this.editForm.get('horario')!.value)))
      .subscribe((salas: ISalaVitas[]) => (this.salasSharedCollection = salas));
  }

  protected createFromForm(): IHorarioVitas {
    return {
      ...new HorarioVitas(),
      id: this.editForm.get(['id'])!.value,
      horaEntrada: this.editForm.get(['horaEntrada'])!.value
        ? dayjs(this.editForm.get(['horaEntrada'])!.value, DATE_TIME_FORMAT)
        : undefined,
      horaSalida: this.editForm.get(['horaSalida'])!.value ? dayjs(this.editForm.get(['horaSalida'])!.value, DATE_TIME_FORMAT) : undefined,
      horario: this.editForm.get(['horario'])!.value,
    };
  }
}
