import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeesComponent } from './employees/employees.component';
import { ErrorComponent } from './error/error.component';
import { ErrorLayoutComponent } from './error-layout/error-layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeesComponent },
  {
    path: 'error',
    component: ErrorLayoutComponent,
    children: [
      { path: '', component: ErrorComponent }
    ]
  },
  { path: '**', redirectTo: '/employees' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
