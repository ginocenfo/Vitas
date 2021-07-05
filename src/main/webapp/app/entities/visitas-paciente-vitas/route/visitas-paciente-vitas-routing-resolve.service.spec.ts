jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IVisitasPacienteVitas, VisitasPacienteVitas } from '../visitas-paciente-vitas.model';
import { VisitasPacienteVitasService } from '../service/visitas-paciente-vitas.service';

import { VisitasPacienteVitasRoutingResolveService } from './visitas-paciente-vitas-routing-resolve.service';

describe('Service Tests', () => {
  describe('VisitasPacienteVitas routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: VisitasPacienteVitasRoutingResolveService;
    let service: VisitasPacienteVitasService;
    let resultVisitasPacienteVitas: IVisitasPacienteVitas | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(VisitasPacienteVitasRoutingResolveService);
      service = TestBed.inject(VisitasPacienteVitasService);
      resultVisitasPacienteVitas = undefined;
    });

    describe('resolve', () => {
      it('should return IVisitasPacienteVitas returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultVisitasPacienteVitas = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultVisitasPacienteVitas).toEqual({ id: 123 });
      });

      it('should return new IVisitasPacienteVitas if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultVisitasPacienteVitas = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultVisitasPacienteVitas).toEqual(new VisitasPacienteVitas());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as VisitasPacienteVitas })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultVisitasPacienteVitas = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultVisitasPacienteVitas).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
