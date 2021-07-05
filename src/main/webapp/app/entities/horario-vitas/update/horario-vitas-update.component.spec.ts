jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { HorarioVitasService } from '../service/horario-vitas.service';
import { IHorarioVitas, HorarioVitas } from '../horario-vitas.model';
import { ISalaVitas } from 'app/entities/sala-vitas/sala-vitas.model';
import { SalaVitasService } from 'app/entities/sala-vitas/service/sala-vitas.service';

import { HorarioVitasUpdateComponent } from './horario-vitas-update.component';

describe('Component Tests', () => {
  describe('HorarioVitas Management Update Component', () => {
    let comp: HorarioVitasUpdateComponent;
    let fixture: ComponentFixture<HorarioVitasUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let horarioService: HorarioVitasService;
    let salaService: SalaVitasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [HorarioVitasUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(HorarioVitasUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HorarioVitasUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      horarioService = TestBed.inject(HorarioVitasService);
      salaService = TestBed.inject(SalaVitasService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call SalaVitas query and add missing value', () => {
        const horario: IHorarioVitas = { id: 456 };
        const horario: ISalaVitas = { id: 62168 };
        horario.horario = horario;

        const salaCollection: ISalaVitas[] = [{ id: 52118 }];
        jest.spyOn(salaService, 'query').mockReturnValue(of(new HttpResponse({ body: salaCollection })));
        const additionalSalaVitas = [horario];
        const expectedCollection: ISalaVitas[] = [...additionalSalaVitas, ...salaCollection];
        jest.spyOn(salaService, 'addSalaVitasToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ horario });
        comp.ngOnInit();

        expect(salaService.query).toHaveBeenCalled();
        expect(salaService.addSalaVitasToCollectionIfMissing).toHaveBeenCalledWith(salaCollection, ...additionalSalaVitas);
        expect(comp.salasSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const horario: IHorarioVitas = { id: 456 };
        const horario: ISalaVitas = { id: 15629 };
        horario.horario = horario;

        activatedRoute.data = of({ horario });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(horario));
        expect(comp.salasSharedCollection).toContain(horario);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<HorarioVitas>>();
        const horario = { id: 123 };
        jest.spyOn(horarioService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ horario });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: horario }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(horarioService.update).toHaveBeenCalledWith(horario);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<HorarioVitas>>();
        const horario = new HorarioVitas();
        jest.spyOn(horarioService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ horario });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: horario }));
        saveSubject.complete();

        // THEN
        expect(horarioService.create).toHaveBeenCalledWith(horario);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<HorarioVitas>>();
        const horario = { id: 123 };
        jest.spyOn(horarioService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ horario });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(horarioService.update).toHaveBeenCalledWith(horario);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackSalaVitasById', () => {
        it('Should return tracked SalaVitas primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackSalaVitasById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
