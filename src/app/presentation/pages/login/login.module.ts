import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserApiGateway } from 'src/app/domain/models/user/gateway/user_api_gateway';
import { UserApiService } from 'src/app/data/driven-adapter/user_api/user_ap.service';

export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },

];

@NgModule({
  declarations: [
    LoginComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],

})
export class LoginModule { }
