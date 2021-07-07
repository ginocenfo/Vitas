import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInternamientoVitas } from '../internamiento-vitas.model';

@Component({
  selector: 'jhi-internamiento-vitas-detail',
  templateUrl: './internamiento-vitas-detail.component.html',
})
export class InternamientoVitasDetailComponent implements OnInit {
  internamiento: IInternamientoVitas | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ internamiento }) => {
      this.internamiento = internamiento;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
