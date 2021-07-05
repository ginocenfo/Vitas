jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IHorarioVitas, HorarioVitas } from '../horario-vitas.model';
import { HorarioVitasService } from '../service/horario-vitas.service';

import { HorarioVitasRoutingResolveService } from './horario-vitas-routing-resolve.service';

describe('Service Tests', () => {
  describe('HorarioVitas routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: HorarioVitasRoutingResolveService;
    let service: HorarioVitasService;
    let resultHorarioVitas: IHorarioVitas | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(HorarioVitasRoutingResolveService);
      service = TestBed.inject(HorarioVitasService);
      resultHorarioVitas = undefined;
    });

    describe('resolve', () => {
      it('should return IHorarioVitas returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultHorarioVitas = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultHorarioVitas).toEqual({ id: 123 });
      });

      it('should return new IHorarioVitas if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultHorarioVitas = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultHorarioVitas).toEqual(new HorarioVitas());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as HorarioVitas })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultHorarioVitas = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultHorarioVitas).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
