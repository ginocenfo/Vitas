import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ISalaVitas, SalaVitas } from '../sala-vitas.model';
import { SalaVitasService } from '../service/sala-vitas.service';
import { IHospitalVitas } from 'app/entities/hospital-vitas/hospital-vitas.model';
import { HospitalVitasService } from 'app/entities/hospital-vitas/service/hospital-vitas.service';

@Component({
  selector: 'jhi-sala-vitas-update',
  templateUrl: './sala-vitas-update.component.html',
})
export class SalaVitasUpdateComponent implements OnInit {
  isSaving = false;

  hospitalsSharedCollection: IHospitalVitas[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [],
    numero: [],
    piso: [],
    totalPacientes: [],
    numPacientes: [],
    numVisitantes: [],
    visitaDisponible: [],
    hospital: [],
  });

  constructor(
    protected salaService: SalaVitasService,
    protected hospitalService: HospitalVitasService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sala }) => {
      this.updateForm(sala);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sala = this.createFromForm();
    if (sala.id !== undefined) {
      this.subscribeToSaveResponse(this.salaService.update(sala));
    } else {
      this.subscribeToSaveResponse(this.salaService.create(sala));
    }
  }

  trackHospitalVitasById(index: number, item: IHospitalVitas): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISalaVitas>>): void {
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

  protected updateForm(sala: ISalaVitas): void {
    this.editForm.patchValue({
      id: sala.id,
      nombre: sala.nombre,
      numero: sala.numero,
      piso: sala.piso,
      totalPacientes: sala.totalPacientes,
      numPacientes: sala.numPacientes,
      numVisitantes: sala.numVisitantes,
      visitaDisponible: sala.visitaDisponible,
      hospital: sala.hospital,
    });

    this.hospitalsSharedCollection = this.hospitalService.addHospitalVitasToCollectionIfMissing(
      this.hospitalsSharedCollection,
      sala.hospital
    );
  }

  protected loadRelationshipsOptions(): void {
    this.hospitalService
      .query()
      .pipe(map((res: HttpResponse<IHospitalVitas[]>) => res.body ?? []))
      .pipe(
        map((hospitals: IHospitalVitas[]) =>
          this.hospitalService.addHospitalVitasToCollectionIfMissing(hospitals, this.editForm.get('hospital')!.value)
        )
      )
      .subscribe((hospitals: IHospitalVitas[]) => (this.hospitalsSharedCollection = hospitals));
  }

  protected createFromForm(): ISalaVitas {
    return {
      ...new SalaVitas(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      piso: this.editForm.get(['piso'])!.value,
      totalPacientes: this.editForm.get(['totalPacientes'])!.value,
      numPacientes: this.editForm.get(['numPacientes'])!.value,
      numVisitantes: this.editForm.get(['numVisitantes'])!.value,
      visitaDisponible: this.editForm.get(['visitaDisponible'])!.value,
      hospital: this.editForm.get(['hospital'])!.value,
    };
  }
}
