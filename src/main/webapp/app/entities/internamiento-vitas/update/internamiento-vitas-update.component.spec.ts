jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { InternamientoVitasService } from '../service/internamiento-vitas.service';
import { IInternamientoVitas, InternamientoVitas } from '../internamiento-vitas.model';
import { IUsuarioVitas } from 'app/entities/usuario-vitas/usuario-vitas.model';
import { UsuarioVitasService } from 'app/entities/usuario-vitas/service/usuario-vitas.service';
import { ISalaVitas } from 'app/entities/sala-vitas/sala-vitas.model';
import { SalaVitasService } from 'app/entities/sala-vitas/service/sala-vitas.service';

import { InternamientoVitasUpdateComponent } from './internamiento-vitas-update.component';

describe('Component Tests', () => {
  describe('InternamientoVitas Management Update Component', () => {
    let comp: InternamientoVitasUpdateComponent;
    let fixture: ComponentFixture<InternamientoVitasUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let internamientoService: InternamientoVitasService;
    let usuarioService: UsuarioVitasService;
    let salaService: SalaVitasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [InternamientoVitasUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(InternamientoVitasUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InternamientoVitasUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      internamientoService = TestBed.inject(InternamientoVitasService);
      usuarioService = TestBed.inject(UsuarioVitasService);
      salaService = TestBed.inject(SalaVitasService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call UsuarioVitas query and add missing value', () => {
        const internamiento: IInternamientoVitas = { id: 456 };
        const paciente: IUsuarioVitas = { id: 70203 };
        internamiento.paciente = paciente;

        const usuarioCollection: IUsuarioVitas[] = [{ id: 68184 }];
        jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
        const additionalUsuarioVitas = [paciente];
        const expectedCollection: IUsuarioVitas[] = [...additionalUsuarioVitas, ...usuarioCollection];
        jest.spyOn(usuarioService, 'addUsuarioVitasToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ internamiento });
        comp.ngOnInit();

        expect(usuarioService.query).toHaveBeenCalled();
        expect(usuarioService.addUsuarioVitasToCollectionIfMissing).toHaveBeenCalledWith(usuarioCollection, ...additionalUsuarioVitas);
        expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call SalaVitas query and add missing value', () => {
        const internamiento: IInternamientoVitas = { id: 456 };
        const sala: ISalaVitas = { id: 41515 };
        internamiento.sala = sala;

        const salaCollection: ISalaVitas[] = [{ id: 78653 }];
        jest.spyOn(salaService, 'query').mockReturnValue(of(new HttpResponse({ body: salaCollection })));
        const additionalSalaVitas = [sala];
        const expectedCollection: ISalaVitas[] = [...additionalSalaVitas, ...salaCollection];
        jest.spyOn(salaService, 'addSalaVitasToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ internamiento });
        comp.ngOnInit();

        expect(salaService.query).toHaveBeenCalled();
        expect(salaService.addSalaVitasToCollectionIfMissing).toHaveBeenCalledWith(salaCollection, ...additionalSalaVitas);
        expect(comp.salasSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const internamiento: IInternamientoVitas = { id: 456 };
        const paciente: IUsuarioVitas = { id: 1460 };
        internamiento.paciente = paciente;
        const sala: ISalaVitas = { id: 30081 };
        internamiento.sala = sala;

        activatedRoute.data = of({ internamiento });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(internamiento));
        expect(comp.usuariosSharedCollection).toContain(paciente);
        expect(comp.salasSharedCollection).toContain(sala);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<InternamientoVitas>>();
        const internamiento = { id: 123 };
        jest.spyOn(internamientoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ internamiento });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: internamiento }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(internamientoService.update).toHaveBeenCalledWith(internamiento);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<InternamientoVitas>>();
        const internamiento = new InternamientoVitas();
        jest.spyOn(internamientoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ internamiento });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: internamiento }));
        saveSubject.complete();

        // THEN
        expect(internamientoService.create).toHaveBeenCalledWith(internamiento);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<InternamientoVitas>>();
        const internamiento = { id: 123 };
        jest.spyOn(internamientoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ internamiento });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(internamientoService.update).toHaveBeenCalledWith(internamiento);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackUsuarioVitasById', () => {
        it('Should return tracked UsuarioVitas primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackUsuarioVitasById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

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
