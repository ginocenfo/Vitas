import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISalaVitas, SalaVitas } from '../sala-vitas.model';

import { SalaVitasService } from './sala-vitas.service';

describe('Service Tests', () => {
  describe('SalaVitas Service', () => {
    let service: SalaVitasService;
    let httpMock: HttpTestingController;
    let elemDefault: ISalaVitas;
    let expectedResult: ISalaVitas | ISalaVitas[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(SalaVitasService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nombre: 'AAAAAAA',
        numero: 'AAAAAAA',
        piso: 0,
        totalPacientes: 0,
        numPacientes: 0,
        numVisitantes: 0,
        visitaDisponible: false,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a SalaVitas', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new SalaVitas()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a SalaVitas', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombre: 'BBBBBB',
            numero: 'BBBBBB',
            piso: 1,
            totalPacientes: 1,
            numPacientes: 1,
            numVisitantes: 1,
            visitaDisponible: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a SalaVitas', () => {
        const patchObject = Object.assign(
          {
            nombre: 'BBBBBB',
            numero: 'BBBBBB',
            totalPacientes: 1,
            numPacientes: 1,
            visitaDisponible: true,
          },
          new SalaVitas()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of SalaVitas', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombre: 'BBBBBB',
            numero: 'BBBBBB',
            piso: 1,
            totalPacientes: 1,
            numPacientes: 1,
            numVisitantes: 1,
            visitaDisponible: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a SalaVitas', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addSalaVitasToCollectionIfMissing', () => {
        it('should add a SalaVitas to an empty array', () => {
          const sala: ISalaVitas = { id: 123 };
          expectedResult = service.addSalaVitasToCollectionIfMissing([], sala);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(sala);
        });

        it('should not add a SalaVitas to an array that contains it', () => {
          const sala: ISalaVitas = { id: 123 };
          const salaCollection: ISalaVitas[] = [
            {
              ...sala,
            },
            { id: 456 },
          ];
          expectedResult = service.addSalaVitasToCollectionIfMissing(salaCollection, sala);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a SalaVitas to an array that doesn't contain it", () => {
          const sala: ISalaVitas = { id: 123 };
          const salaCollection: ISalaVitas[] = [{ id: 456 }];
          expectedResult = service.addSalaVitasToCollectionIfMissing(salaCollection, sala);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(sala);
        });

        it('should add only unique SalaVitas to an array', () => {
          const salaArray: ISalaVitas[] = [{ id: 123 }, { id: 456 }, { id: 43282 }];
          const salaCollection: ISalaVitas[] = [{ id: 123 }];
          expectedResult = service.addSalaVitasToCollectionIfMissing(salaCollection, ...salaArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const sala: ISalaVitas = { id: 123 };
          const sala2: ISalaVitas = { id: 456 };
          expectedResult = service.addSalaVitasToCollectionIfMissing([], sala, sala2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(sala);
          expect(expectedResult).toContain(sala2);
        });

        it('should accept null and undefined values', () => {
          const sala: ISalaVitas = { id: 123 };
          expectedResult = service.addSalaVitasToCollectionIfMissing([], null, sala, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(sala);
        });

        it('should return initial array if no SalaVitas is added', () => {
          const salaCollection: ISalaVitas[] = [{ id: 123 }];
          expectedResult = service.addSalaVitasToCollectionIfMissing(salaCollection, undefined, null);
          expect(expectedResult).toEqual(salaCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
