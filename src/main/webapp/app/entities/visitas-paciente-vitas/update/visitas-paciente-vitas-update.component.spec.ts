jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { VisitasPacienteVitasService } from '../service/visitas-paciente-vitas.service';
import { IVisitasPacienteVitas, VisitasPacienteVitas } from '../visitas-paciente-vitas.model';
import { IUsuarioVitas } from 'app/entities/usuario-vitas/usuario-vitas.model';
import { UsuarioVitasService } from 'app/entities/usuario-vitas/service/usuario-vitas.service';
import { ISalaVitas } from 'app/entities/sala-vitas/sala-vitas.model';
import { SalaVitasService } from 'app/entities/sala-vitas/service/sala-vitas.service';

import { VisitasPacienteVitasUpdateComponent } from './visitas-paciente-vitas-update.component';

describe('Component Tests', () => {
  describe('VisitasPacienteVitas Management Update Component', () => {
    let comp: VisitasPacienteVitasUpdateComponent;
    let fixture: ComponentFixture<VisitasPacienteVitasUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let visitasPacienteService: VisitasPacienteVitasService;
    let usuarioService: UsuarioVitasService;
    let salaService: SalaVitasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [VisitasPacienteVitasUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(VisitasPacienteVitasUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VisitasPacienteVitasUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      visitasPacienteService = TestBed.inject(VisitasPacienteVitasService);
      usuarioService = TestBed.inject(UsuarioVitasService);
      salaService = TestBed.inject(SalaVitasService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call UsuarioVitas query and add missing value', () => {
        const visitasPaciente: IVisitasPacienteVitas = { id: 456 };
        const paciente: IUsuarioVitas = { id: 29944 };
        visitasPaciente.paciente = paciente;
        const visitante: IUsuarioVitas = { id: 83633 };
        visitasPaciente.visitante = visitante;

        const usuarioCollection: IUsuarioVitas[] = [{ id: 3810 }];
        jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
        const additionalUsuarioVitas = [paciente, visitante];
        const expectedCollection: IUsuarioVitas[] = [...additionalUsuarioVitas, ...usuarioCollection];
        jest.spyOn(usuarioService, 'addUsuarioVitasToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ visitasPaciente });
        comp.ngOnInit();

        expect(usuarioService.query).toHaveBeenCalled();
        expect(usuarioService.addUsuarioVitasToCollectionIfMissing).toHaveBeenCalledWith(usuarioCollection, ...additionalUsuarioVitas);
        expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call SalaVitas query and add missing value', () => {
        const visitasPaciente: IVisitasPacienteVitas = { id: 456 };
        const sala: ISalaVitas = { id: 35247 };
        visitasPaciente.sala = sala;

        const salaCollection: ISalaVitas[] = [{ id: 57692 }];
        jest.spyOn(salaService, 'query').mockReturnValue(of(new HttpResponse({ body: salaCollection })));
        const additionalSalaVitas = [sala];
        const expectedCollection: ISalaVitas[] = [...additionalSalaVitas, ...salaCollection];
        jest.spyOn(salaService, 'addSalaVitasToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ visitasPaciente });
        comp.ngOnInit();

        expect(salaService.query).toHaveBeenCalled();
        expect(salaService.addSalaVitasToCollectionIfMissing).toHaveBeenCalledWith(salaCollection, ...additionalSalaVitas);
        expect(comp.salasSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const visitasPaciente: IVisitasPacienteVitas = { id: 456 };
        const paciente: IUsuarioVitas = { id: 96889 };
        visitasPaciente.paciente = paciente;
        const visitante: IUsuarioVitas = { id: 89861 };
        visitasPaciente.visitante = visitante;
        const sala: ISalaVitas = { id: 47816 };
        visitasPaciente.sala = sala;

        activatedRoute.data = of({ visitasPaciente });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(visitasPaciente));
        expect(comp.usuariosSharedCollection).toContain(paciente);
        expect(comp.usuariosSharedCollection).toContain(visitante);
        expect(comp.salasSharedCollection).toContain(sala);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<VisitasPacienteVitas>>();
        const visitasPaciente = { id: 123 };
        jest.spyOn(visitasPacienteService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ visitasPaciente });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: visitasPaciente }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(visitasPacienteService.update).toHaveBeenCalledWith(visitasPaciente);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<VisitasPacienteVitas>>();
        const visitasPaciente = new VisitasPacienteVitas();
        jest.spyOn(visitasPacienteService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ visitasPaciente });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: visitasPaciente }));
        saveSubject.complete();

        // THEN
        expect(visitasPacienteService.create).toHaveBeenCalledWith(visitasPaciente);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<VisitasPacienteVitas>>();
        const visitasPaciente = { id: 123 };
        jest.spyOn(visitasPacienteService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ visitasPaciente });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(visitasPacienteService.update).toHaveBeenCalledWith(visitasPaciente);
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
