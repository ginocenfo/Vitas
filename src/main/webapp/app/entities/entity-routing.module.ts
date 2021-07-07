import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'hospital-vitas',
        data: { pageTitle: 'vitasApp.hospital.home.title' },
        loadChildren: () => import('./hospital-vitas/hospital-vitas.module').then(m => m.HospitalVitasModule),
      },
      {
        path: 'sala-vitas',
        data: { pageTitle: 'vitasApp.sala.home.title' },
        loadChildren: () => import('./sala-vitas/sala-vitas.module').then(m => m.SalaVitasModule),
      },
      {
        path: 'horario-vitas',
        data: { pageTitle: 'vitasApp.horario.home.title' },
        loadChildren: () => import('./horario-vitas/horario-vitas.module').then(m => m.HorarioVitasModule),
      },
      {
        path: 'usuario-vitas',
        data: { pageTitle: 'vitasApp.usuario.home.title' },
        loadChildren: () => import('./usuario-vitas/usuario-vitas.module').then(m => m.UsuarioVitasModule),
      },
      {
        path: 'visitas-paciente-vitas',
        data: { pageTitle: 'vitasApp.visitasPaciente.home.title' },
        loadChildren: () => import('./visitas-paciente-vitas/visitas-paciente-vitas.module').then(m => m.VisitasPacienteVitasModule),
      },
      {
        path: 'internamiento-vitas',
        data: { pageTitle: 'vitasApp.internamiento.home.title' },
        loadChildren: () => import('./internamiento-vitas/internamiento-vitas.module').then(m => m.InternamientoVitasModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
