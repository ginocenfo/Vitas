jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { HospitalVitasService } from '../service/hospital-vitas.service';
import { IHospitalVitas, HospitalVitas } from '../hospital-vitas.model';

import { HospitalVitasUpdateComponent } from './hospital-vitas-update.component';

describe('Component Tests', () => {
  describe('HospitalVitas Management Update Component', () => {
    let comp: HospitalVitasUpdateComponent;
    let fixture: ComponentFixture<HospitalVitasUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let hospitalService: HospitalVitasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [HospitalVitasUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(HospitalVitasUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HospitalVitasUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      hospitalService = TestBed.inject(HospitalVitasService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const hospital: IHospitalVitas = { id: 456 };

        activatedRoute.data = of({ hospital });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(hospital));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<HospitalVitas>>();
        const hospital = { id: 123 };
        jest.spyOn(hospitalService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ hospital });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: hospital }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(hospitalService.update).toHaveBeenCalledWith(hospital);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<HospitalVitas>>();
        const hospital = new HospitalVitas();
        jest.spyOn(hospitalService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ hospital });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: hospital }));
        saveSubject.complete();

        // THEN
        expect(hospitalService.create).toHaveBeenCalledWith(hospital);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<HospitalVitas>>();
        const hospital = { id: 123 };
        jest.spyOn(hospitalService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ hospital });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(hospitalService.update).toHaveBeenCalledWith(hospital);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
