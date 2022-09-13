import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './presentation/common/guards/auth.guard';

const routes: Routes = [
  //{ path: '', component: AppComponent },

  { path: '', redirectTo: 'task', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./presentation/pages/login/login.module').then(m => m.LoginModule) },
  { path: 'task', canActivate: [AuthGuard], loadChildren: () => import('./presentation/pages/task/task.module').then(m => m.TaskModule) },
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
