import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISalaVitas } from '../sala-vitas.model';

@Component({
  selector: 'jhi-sala-vitas-detail',
  templateUrl: './sala-vitas-detail.component.html',
})
export class SalaVitasDetailComponent implements OnInit {
  sala: ISalaVitas | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sala }) => {
      this.sala = sala;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
