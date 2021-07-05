import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUsuarioVitas } from '../usuario-vitas.model';

@Component({
  selector: 'jhi-usuario-vitas-detail',
  templateUrl: './usuario-vitas-detail.component.html',
})
export class UsuarioVitasDetailComponent implements OnInit {
  usuario: IUsuarioVitas | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ usuario }) => {
      this.usuario = usuario;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
