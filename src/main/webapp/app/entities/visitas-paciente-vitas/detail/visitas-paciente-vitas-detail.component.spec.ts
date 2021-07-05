import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VisitasPacienteVitasDetailComponent } from './visitas-paciente-vitas-detail.component';

describe('Component Tests', () => {
  describe('VisitasPacienteVitas Management Detail Component', () => {
    let comp: VisitasPacienteVitasDetailComponent;
    let fixture: ComponentFixture<VisitasPacienteVitasDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [VisitasPacienteVitasDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ visitasPaciente: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(VisitasPacienteVitasDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VisitasPacienteVitasDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load visitasPaciente on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.visitasPaciente).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
