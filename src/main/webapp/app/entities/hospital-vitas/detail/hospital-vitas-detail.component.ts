import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHospitalVitas } from '../hospital-vitas.model';

@Component({
  selector: 'jhi-hospital-vitas-detail',
  templateUrl: './hospital-vitas-detail.component.html',
})
export class HospitalVitasDetailComponent implements OnInit {
  hospital: IHospitalVitas | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hospital }) => {
      this.hospital = hospital;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
