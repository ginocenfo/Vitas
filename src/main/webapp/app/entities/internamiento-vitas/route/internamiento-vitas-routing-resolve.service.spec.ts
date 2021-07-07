jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IInternamientoVitas, InternamientoVitas } from '../internamiento-vitas.model';
import { InternamientoVitasService } from '../service/internamiento-vitas.service';

import { InternamientoVitasRoutingResolveService } from './internamiento-vitas-routing-resolve.service';

describe('Service Tests', () => {
  describe('InternamientoVitas routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: InternamientoVitasRoutingResolveService;
    let service: InternamientoVitasService;
    let resultInternamientoVitas: IInternamientoVitas | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(InternamientoVitasRoutingResolveService);
      service = TestBed.inject(InternamientoVitasService);
      resultInternamientoVitas = undefined;
    });

    describe('resolve', () => {
      it('should return IInternamientoVitas returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultInternamientoVitas = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultInternamientoVitas).toEqual({ id: 123 });
      });

      it('should return new IInternamientoVitas if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultInternamientoVitas = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultInternamientoVitas).toEqual(new InternamientoVitas());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as InternamientoVitas })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultInternamientoVitas = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultInternamientoVitas).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
