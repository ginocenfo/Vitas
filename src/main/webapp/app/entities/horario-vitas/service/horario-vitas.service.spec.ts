import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IHorarioVitas, HorarioVitas } from '../horario-vitas.model';

import { HorarioVitasService } from './horario-vitas.service';

describe('Service Tests', () => {
  describe('HorarioVitas Service', () => {
    let service: HorarioVitasService;
    let httpMock: HttpTestingController;
    let elemDefault: IHorarioVitas;
    let expectedResult: IHorarioVitas | IHorarioVitas[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(HorarioVitasService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        horaEntrada: currentDate,
        horaSalida: currentDate,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            horaEntrada: currentDate.format(DATE_TIME_FORMAT),
            horaSalida: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a HorarioVitas', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            horaEntrada: currentDate.format(DATE_TIME_FORMAT),
            horaSalida: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            horaEntrada: currentDate,
            horaSalida: currentDate,
          },
          returnedFromService
        );

        service.create(new HorarioVitas()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a HorarioVitas', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            horaEntrada: currentDate.format(DATE_TIME_FORMAT),
            horaSalida: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            horaEntrada: currentDate,
            horaSalida: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a HorarioVitas', () => {
        const patchObject = Object.assign(
          {
            horaSalida: currentDate.format(DATE_TIME_FORMAT),
          },
          new HorarioVitas()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            horaEntrada: currentDate,
            horaSalida: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of HorarioVitas', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            horaEntrada: currentDate.format(DATE_TIME_FORMAT),
            horaSalida: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            horaEntrada: currentDate,
            horaSalida: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a HorarioVitas', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addHorarioVitasToCollectionIfMissing', () => {
        it('should add a HorarioVitas to an empty array', () => {
          const horario: IHorarioVitas = { id: 123 };
          expectedResult = service.addHorarioVitasToCollectionIfMissing([], horario);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(horario);
        });

        it('should not add a HorarioVitas to an array that contains it', () => {
          const horario: IHorarioVitas = { id: 123 };
          const horarioCollection: IHorarioVitas[] = [
            {
              ...horario,
            },
            { id: 456 },
          ];
          expectedResult = service.addHorarioVitasToCollectionIfMissing(horarioCollection, horario);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a HorarioVitas to an array that doesn't contain it", () => {
          const horario: IHorarioVitas = { id: 123 };
          const horarioCollection: IHorarioVitas[] = [{ id: 456 }];
          expectedResult = service.addHorarioVitasToCollectionIfMissing(horarioCollection, horario);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(horario);
        });

        it('should add only unique HorarioVitas to an array', () => {
          const horarioArray: IHorarioVitas[] = [{ id: 123 }, { id: 456 }, { id: 21860 }];
          const horarioCollection: IHorarioVitas[] = [{ id: 123 }];
          expectedResult = service.addHorarioVitasToCollectionIfMissing(horarioCollection, ...horarioArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const horario: IHorarioVitas = { id: 123 };
          const horario2: IHorarioVitas = { id: 456 };
          expectedResult = service.addHorarioVitasToCollectionIfMissing([], horario, horario2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(horario);
          expect(expectedResult).toContain(horario2);
        });

        it('should accept null and undefined values', () => {
          const horario: IHorarioVitas = { id: 123 };
          expectedResult = service.addHorarioVitasToCollectionIfMissing([], null, horario, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(horario);
        });

        it('should return initial array if no HorarioVitas is added', () => {
          const horarioCollection: IHorarioVitas[] = [{ id: 123 }];
          expectedResult = service.addHorarioVitasToCollectionIfMissing(horarioCollection, undefined, null);
          expect(expectedResult).toEqual(horarioCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
