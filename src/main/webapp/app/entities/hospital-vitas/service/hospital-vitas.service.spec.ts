import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IHospitalVitas, HospitalVitas } from '../hospital-vitas.model';

import { HospitalVitasService } from './hospital-vitas.service';

describe('Service Tests', () => {
  describe('HospitalVitas Service', () => {
    let service: HospitalVitasService;
    let httpMock: HttpTestingController;
    let elemDefault: IHospitalVitas;
    let expectedResult: IHospitalVitas | IHospitalVitas[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(HospitalVitasService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nombre: 'AAAAAAA',
        provincia: 'AAAAAAA',
        canton: 'AAAAAAA',
        distrito: 'AAAAAAA',
        direccion: 'AAAAAAA',
        telefono: 'AAAAAAA',
        email: 'AAAAAAA',
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

      it('should create a HospitalVitas', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new HospitalVitas()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a HospitalVitas', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombre: 'BBBBBB',
            provincia: 'BBBBBB',
            canton: 'BBBBBB',
            distrito: 'BBBBBB',
            direccion: 'BBBBBB',
            telefono: 'BBBBBB',
            email: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a HospitalVitas', () => {
        const patchObject = Object.assign(
          {
            provincia: 'BBBBBB',
            distrito: 'BBBBBB',
            direccion: 'BBBBBB',
            telefono: 'BBBBBB',
          },
          new HospitalVitas()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of HospitalVitas', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombre: 'BBBBBB',
            provincia: 'BBBBBB',
            canton: 'BBBBBB',
            distrito: 'BBBBBB',
            direccion: 'BBBBBB',
            telefono: 'BBBBBB',
            email: 'BBBBBB',
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

      it('should delete a HospitalVitas', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addHospitalVitasToCollectionIfMissing', () => {
        it('should add a HospitalVitas to an empty array', () => {
          const hospital: IHospitalVitas = { id: 123 };
          expectedResult = service.addHospitalVitasToCollectionIfMissing([], hospital);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(hospital);
        });

        it('should not add a HospitalVitas to an array that contains it', () => {
          const hospital: IHospitalVitas = { id: 123 };
          const hospitalCollection: IHospitalVitas[] = [
            {
              ...hospital,
            },
            { id: 456 },
          ];
          expectedResult = service.addHospitalVitasToCollectionIfMissing(hospitalCollection, hospital);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a HospitalVitas to an array that doesn't contain it", () => {
          const hospital: IHospitalVitas = { id: 123 };
          const hospitalCollection: IHospitalVitas[] = [{ id: 456 }];
          expectedResult = service.addHospitalVitasToCollectionIfMissing(hospitalCollection, hospital);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(hospital);
        });

        it('should add only unique HospitalVitas to an array', () => {
          const hospitalArray: IHospitalVitas[] = [{ id: 123 }, { id: 456 }, { id: 59150 }];
          const hospitalCollection: IHospitalVitas[] = [{ id: 123 }];
          expectedResult = service.addHospitalVitasToCollectionIfMissing(hospitalCollection, ...hospitalArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const hospital: IHospitalVitas = { id: 123 };
          const hospital2: IHospitalVitas = { id: 456 };
          expectedResult = service.addHospitalVitasToCollectionIfMissing([], hospital, hospital2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(hospital);
          expect(expectedResult).toContain(hospital2);
        });

        it('should accept null and undefined values', () => {
          const hospital: IHospitalVitas = { id: 123 };
          expectedResult = service.addHospitalVitasToCollectionIfMissing([], null, hospital, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(hospital);
        });

        it('should return initial array if no HospitalVitas is added', () => {
          const hospitalCollection: IHospitalVitas[] = [{ id: 123 }];
          expectedResult = service.addHospitalVitasToCollectionIfMissing(hospitalCollection, undefined, null);
          expect(expectedResult).toEqual(hospitalCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
