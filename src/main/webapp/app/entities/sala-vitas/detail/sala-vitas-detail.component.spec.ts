import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SalaVitasDetailComponent } from './sala-vitas-detail.component';

describe('Component Tests', () => {
  describe('SalaVitas Management Detail Component', () => {
    let comp: SalaVitasDetailComponent;
    let fixture: ComponentFixture<SalaVitasDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [SalaVitasDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ sala: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(SalaVitasDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SalaVitasDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load sala on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sala).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
