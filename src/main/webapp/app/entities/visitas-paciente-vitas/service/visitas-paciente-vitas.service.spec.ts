import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IVisitasPacienteVitas, VisitasPacienteVitas } from '../visitas-paciente-vitas.model';

import { VisitasPacienteVitasService } from './visitas-paciente-vitas.service';

describe('Service Tests', () => {
  describe('VisitasPacienteVitas Service', () => {
    let service: VisitasPacienteVitasService;
    let httpMock: HttpTestingController;
    let elemDefault: IVisitasPacienteVitas;
    let expectedResult: IVisitasPacienteVitas | IVisitasPacienteVitas[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(VisitasPacienteVitasService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        hora: currentDate,
        duracion: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            hora: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a VisitasPacienteVitas', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            hora: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            hora: currentDate,
          },
          returnedFromService
        );

        service.create(new VisitasPacienteVitas()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a VisitasPacienteVitas', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            hora: currentDate.format(DATE_TIME_FORMAT),
            duracion: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            hora: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a VisitasPacienteVitas', () => {
        const patchObject = Object.assign(
          {
            hora: currentDate.format(DATE_TIME_FORMAT),
          },
          new VisitasPacienteVitas()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            hora: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of VisitasPacienteVitas', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            hora: currentDate.format(DATE_TIME_FORMAT),
            duracion: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            hora: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a VisitasPacienteVitas', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addVisitasPacienteVitasToCollectionIfMissing', () => {
        it('should add a VisitasPacienteVitas to an empty array', () => {
          const visitasPaciente: IVisitasPacienteVitas = { id: 123 };
          expectedResult = service.addVisitasPacienteVitasToCollectionIfMissing([], visitasPaciente);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(visitasPaciente);
        });

        it('should not add a VisitasPacienteVitas to an array that contains it', () => {
          const visitasPaciente: IVisitasPacienteVitas = { id: 123 };
          const visitasPacienteCollection: IVisitasPacienteVitas[] = [
            {
              ...visitasPaciente,
            },
            { id: 456 },
          ];
          expectedResult = service.addVisitasPacienteVitasToCollectionIfMissing(visitasPacienteCollection, visitasPaciente);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a VisitasPacienteVitas to an array that doesn't contain it", () => {
          const visitasPaciente: IVisitasPacienteVitas = { id: 123 };
          const visitasPacienteCollection: IVisitasPacienteVitas[] = [{ id: 456 }];
          expectedResult = service.addVisitasPacienteVitasToCollectionIfMissing(visitasPacienteCollection, visitasPaciente);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(visitasPaciente);
        });

        it('should add only unique VisitasPacienteVitas to an array', () => {
          const visitasPacienteArray: IVisitasPacienteVitas[] = [{ id: 123 }, { id: 456 }, { id: 37618 }];
          const visitasPacienteCollection: IVisitasPacienteVitas[] = [{ id: 123 }];
          expectedResult = service.addVisitasPacienteVitasToCollectionIfMissing(visitasPacienteCollection, ...visitasPacienteArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const visitasPaciente: IVisitasPacienteVitas = { id: 123 };
          const visitasPaciente2: IVisitasPacienteVitas = { id: 456 };
          expectedResult = service.addVisitasPacienteVitasToCollectionIfMissing([], visitasPaciente, visitasPaciente2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(visitasPaciente);
          expect(expectedResult).toContain(visitasPaciente2);
        });

        it('should accept null and undefined values', () => {
          const visitasPaciente: IVisitasPacienteVitas = { id: 123 };
          expectedResult = service.addVisitasPacienteVitasToCollectionIfMissing([], null, visitasPaciente, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(visitasPaciente);
        });

        it('should return initial array if no VisitasPacienteVitas is added', () => {
          const visitasPacienteCollection: IVisitasPacienteVitas[] = [{ id: 123 }];
          expectedResult = service.addVisitasPacienteVitasToCollectionIfMissing(visitasPacienteCollection, undefined, null);
          expect(expectedResult).toEqual(visitasPacienteCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
