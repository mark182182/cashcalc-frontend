import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './app/@pages/login/login.component';
import { CalculatorComponent } from './app/@pages/calculator/calculator.component';
import { AuthGuard } from './app/@core/guard/auth.guard';
import { AdminComponent } from './app/@pages/admin/admin.component';
import { SuperuserComponent } from './app/@pages/superuser/superuser.component';
import CONSTANTS from './app/@core/constants/constants';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/' + CONSTANTS.ROUTES.LOGIN,
  //   pathMatch: 'full',
  // },
  // {
  //   path: '**',
  //   redirectTo: '/' + CONSTANTS.ROUTES.LOGIN,
  // },
  { path: CONSTANTS.ROUTES.LOGIN, component: LoginComponent },
  {
    path: CONSTANTS.ROUTES.CALCULATOR,
    component: CalculatorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: CONSTANTS.ROUTES.ADMIN,
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: CONSTANTS.ROUTES.SUPERUSER,
    component: SuperuserComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
