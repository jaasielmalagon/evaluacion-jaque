import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { GuardiaGuard } from './guardia.guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
    // canActivate: [GuardiaGuard]
  },
  {
    path: 'admin-users',
    component: AdminUsersComponent,
    pathMatch: 'full',
    canActivate: [GuardiaGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
