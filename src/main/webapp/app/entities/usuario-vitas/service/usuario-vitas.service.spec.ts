import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { TipoDeSangre } from 'app/entities/enumerations/tipo-de-sangre.model';
import { TipoUsuario } from 'app/entities/enumerations/tipo-usuario.model';
import { IUsuarioVitas, UsuarioVitas } from '../usuario-vitas.model';

import { UsuarioVitasService } from './usuario-vitas.service';

describe('Service Tests', () => {
  describe('UsuarioVitas Service', () => {
    let service: UsuarioVitasService;
    let httpMock: HttpTestingController;
    let elemDefault: IUsuarioVitas;
    let expectedResult: IUsuarioVitas | IUsuarioVitas[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(UsuarioVitasService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        identidad: 0,
        fechaNacimiento: currentDate,
        paisNacimiento: 'AAAAAAA',
        telefono: 'AAAAAAA',
        tipoSangre: TipoDeSangre.O_NEGATIVO,
        centroMedico: 'AAAAAAA',
        tipoUsuario: TipoUsuario.ADMIN,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaNacimiento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a UsuarioVitas', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaNacimiento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaNacimiento: currentDate,
          },
          returnedFromService
        );

        service.create(new UsuarioVitas()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a UsuarioVitas', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            identidad: 1,
            fechaNacimiento: currentDate.format(DATE_FORMAT),
            paisNacimiento: 'BBBBBB',
            telefono: 'BBBBBB',
            tipoSangre: 'BBBBBB',
            centroMedico: 'BBBBBB',
            tipoUsuario: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaNacimiento: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a UsuarioVitas', () => {
        const patchObject = Object.assign(
          {
            fechaNacimiento: currentDate.format(DATE_FORMAT),
            tipoSangre: 'BBBBBB',
            tipoUsuario: 'BBBBBB',
          },
          new UsuarioVitas()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            fechaNacimiento: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of UsuarioVitas', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            identidad: 1,
            fechaNacimiento: currentDate.format(DATE_FORMAT),
            paisNacimiento: 'BBBBBB',
            telefono: 'BBBBBB',
            tipoSangre: 'BBBBBB',
            centroMedico: 'BBBBBB',
            tipoUsuario: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaNacimiento: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a UsuarioVitas', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addUsuarioVitasToCollectionIfMissing', () => {
        it('should add a UsuarioVitas to an empty array', () => {
          const usuario: IUsuarioVitas = { id: 123 };
          expectedResult = service.addUsuarioVitasToCollectionIfMissing([], usuario);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(usuario);
        });

        it('should not add a UsuarioVitas to an array that contains it', () => {
          const usuario: IUsuarioVitas = { id: 123 };
          const usuarioCollection: IUsuarioVitas[] = [
            {
              ...usuario,
            },
            { id: 456 },
          ];
          expectedResult = service.addUsuarioVitasToCollectionIfMissing(usuarioCollection, usuario);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a UsuarioVitas to an array that doesn't contain it", () => {
          const usuario: IUsuarioVitas = { id: 123 };
          const usuarioCollection: IUsuarioVitas[] = [{ id: 456 }];
          expectedResult = service.addUsuarioVitasToCollectionIfMissing(usuarioCollection, usuario);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(usuario);
        });

        it('should add only unique UsuarioVitas to an array', () => {
          const usuarioArray: IUsuarioVitas[] = [{ id: 123 }, { id: 456 }, { id: 54271 }];
          const usuarioCollection: IUsuarioVitas[] = [{ id: 123 }];
          expectedResult = service.addUsuarioVitasToCollectionIfMissing(usuarioCollection, ...usuarioArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const usuario: IUsuarioVitas = { id: 123 };
          const usuario2: IUsuarioVitas = { id: 456 };
          expectedResult = service.addUsuarioVitasToCollectionIfMissing([], usuario, usuario2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(usuario);
          expect(expectedResult).toContain(usuario2);
        });

        it('should accept null and undefined values', () => {
          const usuario: IUsuarioVitas = { id: 123 };
          expectedResult = service.addUsuarioVitasToCollectionIfMissing([], null, usuario, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(usuario);
        });

        it('should return initial array if no UsuarioVitas is added', () => {
          const usuarioCollection: IUsuarioVitas[] = [{ id: 123 }];
          expectedResult = service.addUsuarioVitasToCollectionIfMissing(usuarioCollection, undefined, null);
          expect(expectedResult).toEqual(usuarioCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
