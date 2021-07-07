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
import { IInternamientoVitas } from 'app/entities/internamiento-vitas/internamiento-vitas.model';
import { InternamientoVitasService } from 'app/entities/internamiento-vitas/service/internamiento-vitas.service';

import { VisitasPacienteVitasUpdateComponent } from './visitas-paciente-vitas-update.component';

describe('Component Tests', () => {
  describe('VisitasPacienteVitas Management Update Component', () => {
    let comp: VisitasPacienteVitasUpdateComponent;
    let fixture: ComponentFixture<VisitasPacienteVitasUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let visitasPacienteService: VisitasPacienteVitasService;
    let usuarioService: UsuarioVitasService;
    let internamientoService: InternamientoVitasService;

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
      internamientoService = TestBed.inject(InternamientoVitasService);

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

      it('Should call InternamientoVitas query and add missing value', () => {
        const visitasPaciente: IVisitasPacienteVitas = { id: 456 };
        const sala: IInternamientoVitas = { id: 80571 };
        visitasPaciente.sala = sala;

        const internamientoCollection: IInternamientoVitas[] = [{ id: 88612 }];
        jest.spyOn(internamientoService, 'query').mockReturnValue(of(new HttpResponse({ body: internamientoCollection })));
        const additionalInternamientoVitas = [sala];
        const expectedCollection: IInternamientoVitas[] = [...additionalInternamientoVitas, ...internamientoCollection];
        jest.spyOn(internamientoService, 'addInternamientoVitasToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ visitasPaciente });
        comp.ngOnInit();

        expect(internamientoService.query).toHaveBeenCalled();
        expect(internamientoService.addInternamientoVitasToCollectionIfMissing).toHaveBeenCalledWith(
          internamientoCollection,
          ...additionalInternamientoVitas
        );
        expect(comp.internamientosSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const visitasPaciente: IVisitasPacienteVitas = { id: 456 };
        const paciente: IUsuarioVitas = { id: 96889 };
        visitasPaciente.paciente = paciente;
        const visitante: IUsuarioVitas = { id: 89861 };
        visitasPaciente.visitante = visitante;
        const sala: IInternamientoVitas = { id: 2049 };
        visitasPaciente.sala = sala;

        activatedRoute.data = of({ visitasPaciente });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(visitasPaciente));
        expect(comp.usuariosSharedCollection).toContain(paciente);
        expect(comp.usuariosSharedCollection).toContain(visitante);
        expect(comp.internamientosSharedCollection).toContain(sala);
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

      describe('trackInternamientoVitasById', () => {
        it('Should return tracked InternamientoVitas primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackInternamientoVitasById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
