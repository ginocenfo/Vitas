jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IUsuarioVitas, UsuarioVitas } from '../usuario-vitas.model';
import { UsuarioVitasService } from '../service/usuario-vitas.service';

import { UsuarioVitasRoutingResolveService } from './usuario-vitas-routing-resolve.service';

describe('Service Tests', () => {
  describe('UsuarioVitas routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: UsuarioVitasRoutingResolveService;
    let service: UsuarioVitasService;
    let resultUsuarioVitas: IUsuarioVitas | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(UsuarioVitasRoutingResolveService);
      service = TestBed.inject(UsuarioVitasService);
      resultUsuarioVitas = undefined;
    });

    describe('resolve', () => {
      it('should return IUsuarioVitas returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultUsuarioVitas = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultUsuarioVitas).toEqual({ id: 123 });
      });

      it('should return new IUsuarioVitas if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultUsuarioVitas = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultUsuarioVitas).toEqual(new UsuarioVitas());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as UsuarioVitas })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultUsuarioVitas = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultUsuarioVitas).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
