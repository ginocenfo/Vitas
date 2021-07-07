jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { UsuarioVitasService } from '../service/usuario-vitas.service';
import { IUsuarioVitas, UsuarioVitas } from '../usuario-vitas.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

import { UsuarioVitasUpdateComponent } from './usuario-vitas-update.component';

describe('Component Tests', () => {
  describe('UsuarioVitas Management Update Component', () => {
    let comp: UsuarioVitasUpdateComponent;
    let fixture: ComponentFixture<UsuarioVitasUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let usuarioService: UsuarioVitasService;
    let userService: UserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [UsuarioVitasUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(UsuarioVitasUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UsuarioVitasUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      usuarioService = TestBed.inject(UsuarioVitasService);
      userService = TestBed.inject(UserService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call User query and add missing value', () => {
        const usuario: IUsuarioVitas = { id: 456 };
        const user: IUser = { id: 13812 };
        usuario.user = user;

        const userCollection: IUser[] = [{ id: 98506 }];
        jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
        const additionalUsers = [user];
        const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
        jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ usuario });
        comp.ngOnInit();

        expect(userService.query).toHaveBeenCalled();
        expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(userCollection, ...additionalUsers);
        expect(comp.usersSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const usuario: IUsuarioVitas = { id: 456 };
        const user: IUser = { id: 95854 };
        usuario.user = user;

        activatedRoute.data = of({ usuario });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(usuario));
        expect(comp.usersSharedCollection).toContain(user);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<UsuarioVitas>>();
        const usuario = { id: 123 };
        jest.spyOn(usuarioService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ usuario });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: usuario }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(usuarioService.update).toHaveBeenCalledWith(usuario);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<UsuarioVitas>>();
        const usuario = new UsuarioVitas();
        jest.spyOn(usuarioService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ usuario });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: usuario }));
        saveSubject.complete();

        // THEN
        expect(usuarioService.create).toHaveBeenCalledWith(usuario);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<UsuarioVitas>>();
        const usuario = { id: 123 };
        jest.spyOn(usuarioService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ usuario });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(usuarioService.update).toHaveBeenCalledWith(usuario);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackUserById', () => {
        it('Should return tracked User primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackUserById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
