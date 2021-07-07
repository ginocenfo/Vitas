import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IInternamientoVitas, InternamientoVitas } from '../internamiento-vitas.model';

import { InternamientoVitasService } from './internamiento-vitas.service';

describe('Service Tests', () => {
  describe('InternamientoVitas Service', () => {
    let service: InternamientoVitasService;
    let httpMock: HttpTestingController;
    let elemDefault: IInternamientoVitas;
    let expectedResult: IInternamientoVitas | IInternamientoVitas[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(InternamientoVitasService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        inicioInternamiento: currentDate,
        duracionInternamiento: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            inicioInternamiento: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a InternamientoVitas', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            inicioInternamiento: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            inicioInternamiento: currentDate,
          },
          returnedFromService
        );

        service.create(new InternamientoVitas()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a InternamientoVitas', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            inicioInternamiento: currentDate.format(DATE_TIME_FORMAT),
            duracionInternamiento: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            inicioInternamiento: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a InternamientoVitas', () => {
        const patchObject = Object.assign(
          {
            inicioInternamiento: currentDate.format(DATE_TIME_FORMAT),
          },
          new InternamientoVitas()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            inicioInternamiento: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of InternamientoVitas', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            inicioInternamiento: currentDate.format(DATE_TIME_FORMAT),
            duracionInternamiento: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            inicioInternamiento: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a InternamientoVitas', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addInternamientoVitasToCollectionIfMissing', () => {
        it('should add a InternamientoVitas to an empty array', () => {
          const internamiento: IInternamientoVitas = { id: 123 };
          expectedResult = service.addInternamientoVitasToCollectionIfMissing([], internamiento);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(internamiento);
        });

        it('should not add a InternamientoVitas to an array that contains it', () => {
          const internamiento: IInternamientoVitas = { id: 123 };
          const internamientoCollection: IInternamientoVitas[] = [
            {
              ...internamiento,
            },
            { id: 456 },
          ];
          expectedResult = service.addInternamientoVitasToCollectionIfMissing(internamientoCollection, internamiento);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a InternamientoVitas to an array that doesn't contain it", () => {
          const internamiento: IInternamientoVitas = { id: 123 };
          const internamientoCollection: IInternamientoVitas[] = [{ id: 456 }];
          expectedResult = service.addInternamientoVitasToCollectionIfMissing(internamientoCollection, internamiento);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(internamiento);
        });

        it('should add only unique InternamientoVitas to an array', () => {
          const internamientoArray: IInternamientoVitas[] = [{ id: 123 }, { id: 456 }, { id: 51521 }];
          const internamientoCollection: IInternamientoVitas[] = [{ id: 123 }];
          expectedResult = service.addInternamientoVitasToCollectionIfMissing(internamientoCollection, ...internamientoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const internamiento: IInternamientoVitas = { id: 123 };
          const internamiento2: IInternamientoVitas = { id: 456 };
          expectedResult = service.addInternamientoVitasToCollectionIfMissing([], internamiento, internamiento2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(internamiento);
          expect(expectedResult).toContain(internamiento2);
        });

        it('should accept null and undefined values', () => {
          const internamiento: IInternamientoVitas = { id: 123 };
          expectedResult = service.addInternamientoVitasToCollectionIfMissing([], null, internamiento, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(internamiento);
        });

        it('should return initial array if no InternamientoVitas is added', () => {
          const internamientoCollection: IInternamientoVitas[] = [{ id: 123 }];
          expectedResult = service.addInternamientoVitasToCollectionIfMissing(internamientoCollection, undefined, null);
          expect(expectedResult).toEqual(internamientoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
