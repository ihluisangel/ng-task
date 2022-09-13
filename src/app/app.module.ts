import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { UserApiGateway } from './domain/models/user/gateway/user_api_gateway';
import { UserApiService } from './data/driven-adapter/user_api/user_ap.service';
import { UserLocalGateway } from './domain/models/user/gateway/user_local_gateway';
import { UserLocalService } from './data/driven-adapter/user_local/user_local.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: UserApiGateway, useClass: UserApiService }, { provide: UserLocalGateway, useClass: UserLocalService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
