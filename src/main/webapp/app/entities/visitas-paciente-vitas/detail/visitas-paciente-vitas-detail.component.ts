import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVisitasPacienteVitas } from '../visitas-paciente-vitas.model';

@Component({
  selector: 'jhi-visitas-paciente-vitas-detail',
  templateUrl: './visitas-paciente-vitas-detail.component.html',
})
export class VisitasPacienteVitasDetailComponent implements OnInit {
  visitasPaciente: IVisitasPacienteVitas | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ visitasPaciente }) => {
      this.visitasPaciente = visitasPaciente;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
