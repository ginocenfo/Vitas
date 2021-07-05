import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HorarioVitasDetailComponent } from './horario-vitas-detail.component';

describe('Component Tests', () => {
  describe('HorarioVitas Management Detail Component', () => {
    let comp: HorarioVitasDetailComponent;
    let fixture: ComponentFixture<HorarioVitasDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [HorarioVitasDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ horario: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(HorarioVitasDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HorarioVitasDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load horario on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.horario).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
