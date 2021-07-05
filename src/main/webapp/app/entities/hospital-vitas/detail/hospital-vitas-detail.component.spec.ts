import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HospitalVitasDetailComponent } from './hospital-vitas-detail.component';

describe('Component Tests', () => {
  describe('HospitalVitas Management Detail Component', () => {
    let comp: HospitalVitasDetailComponent;
    let fixture: ComponentFixture<HospitalVitasDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [HospitalVitasDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ hospital: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(HospitalVitasDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HospitalVitasDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load hospital on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.hospital).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
