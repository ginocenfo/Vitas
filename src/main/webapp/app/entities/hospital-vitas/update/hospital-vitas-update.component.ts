import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IHospitalVitas, HospitalVitas } from '../hospital-vitas.model';
import { HospitalVitasService } from '../service/hospital-vitas.service';

@Component({
  selector: 'jhi-hospital-vitas-update',
  templateUrl: './hospital-vitas-update.component.html',
})
export class HospitalVitasUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    provincia: [],
    canton: [],
    distrito: [],
    direccion: [],
    telefono: [],
    email: [],
  });

  constructor(protected hospitalService: HospitalVitasService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hospital }) => {
      this.updateForm(hospital);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const hospital = this.createFromForm();
    if (hospital.id !== undefined) {
      this.subscribeToSaveResponse(this.hospitalService.update(hospital));
    } else {
      this.subscribeToSaveResponse(this.hospitalService.create(hospital));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHospitalVitas>>): void {
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

  protected updateForm(hospital: IHospitalVitas): void {
    this.editForm.patchValue({
      id: hospital.id,
      nombre: hospital.nombre,
      provincia: hospital.provincia,
      canton: hospital.canton,
      distrito: hospital.distrito,
      direccion: hospital.direccion,
      telefono: hospital.telefono,
      email: hospital.email,
    });
  }

  protected createFromForm(): IHospitalVitas {
    return {
      ...new HospitalVitas(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      provincia: this.editForm.get(['provincia'])!.value,
      canton: this.editForm.get(['canton'])!.value,
      distrito: this.editForm.get(['distrito'])!.value,
      direccion: this.editForm.get(['direccion'])!.value,
      telefono: this.editForm.get(['telefono'])!.value,
      email: this.editForm.get(['email'])!.value,
    };
  }
}
