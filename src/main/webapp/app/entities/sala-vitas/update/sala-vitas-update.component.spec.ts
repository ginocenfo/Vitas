jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SalaVitasService } from '../service/sala-vitas.service';
import { ISalaVitas, SalaVitas } from '../sala-vitas.model';
import { IHospitalVitas } from 'app/entities/hospital-vitas/hospital-vitas.model';
import { HospitalVitasService } from 'app/entities/hospital-vitas/service/hospital-vitas.service';

import { SalaVitasUpdateComponent } from './sala-vitas-update.component';

describe('Component Tests', () => {
  describe('SalaVitas Management Update Component', () => {
    let comp: SalaVitasUpdateComponent;
    let fixture: ComponentFixture<SalaVitasUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let salaService: SalaVitasService;
    let hospitalService: HospitalVitasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SalaVitasUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(SalaVitasUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SalaVitasUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      salaService = TestBed.inject(SalaVitasService);
      hospitalService = TestBed.inject(HospitalVitasService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call HospitalVitas query and add missing value', () => {
        const sala: ISalaVitas = { id: 456 };
        const hospital: IHospitalVitas = { id: 98325 };
        sala.hospital = hospital;

        const hospitalCollection: IHospitalVitas[] = [{ id: 18005 }];
        jest.spyOn(hospitalService, 'query').mockReturnValue(of(new HttpResponse({ body: hospitalCollection })));
        const additionalHospitalVitas = [hospital];
        const expectedCollection: IHospitalVitas[] = [...additionalHospitalVitas, ...hospitalCollection];
        jest.spyOn(hospitalService, 'addHospitalVitasToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ sala });
        comp.ngOnInit();

        expect(hospitalService.query).toHaveBeenCalled();
        expect(hospitalService.addHospitalVitasToCollectionIfMissing).toHaveBeenCalledWith(hospitalCollection, ...additionalHospitalVitas);
        expect(comp.hospitalsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const sala: ISalaVitas = { id: 456 };
        const hospital: IHospitalVitas = { id: 59308 };
        sala.hospital = hospital;

        activatedRoute.data = of({ sala });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(sala));
        expect(comp.hospitalsSharedCollection).toContain(hospital);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<SalaVitas>>();
        const sala = { id: 123 };
        jest.spyOn(salaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ sala });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: sala }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(salaService.update).toHaveBeenCalledWith(sala);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<SalaVitas>>();
        const sala = new SalaVitas();
        jest.spyOn(salaService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ sala });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: sala }));
        saveSubject.complete();

        // THEN
        expect(salaService.create).toHaveBeenCalledWith(sala);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<SalaVitas>>();
        const sala = { id: 123 };
        jest.spyOn(salaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ sala });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(salaService.update).toHaveBeenCalledWith(sala);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackHospitalVitasById', () => {
        it('Should return tracked HospitalVitas primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackHospitalVitasById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
