import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UsuarioVitasDetailComponent } from './usuario-vitas-detail.component';

describe('Component Tests', () => {
  describe('UsuarioVitas Management Detail Component', () => {
    let comp: UsuarioVitasDetailComponent;
    let fixture: ComponentFixture<UsuarioVitasDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [UsuarioVitasDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ usuario: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(UsuarioVitasDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UsuarioVitasDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load usuario on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.usuario).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
