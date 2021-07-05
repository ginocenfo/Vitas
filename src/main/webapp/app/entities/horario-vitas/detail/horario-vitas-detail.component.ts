import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHorarioVitas } from '../horario-vitas.model';

@Component({
  selector: 'jhi-horario-vitas-detail',
  templateUrl: './horario-vitas-detail.component.html',
})
export class HorarioVitasDetailComponent implements OnInit {
  horario: IHorarioVitas | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ horario }) => {
      this.horario = horario;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
