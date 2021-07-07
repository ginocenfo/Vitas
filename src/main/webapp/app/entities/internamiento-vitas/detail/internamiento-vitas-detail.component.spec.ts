import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InternamientoVitasDetailComponent } from './internamiento-vitas-detail.component';

describe('Component Tests', () => {
  describe('InternamientoVitas Management Detail Component', () => {
    let comp: InternamientoVitasDetailComponent;
    let fixture: ComponentFixture<InternamientoVitasDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [InternamientoVitasDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ internamiento: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(InternamientoVitasDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InternamientoVitasDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load internamiento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.internamiento).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
