import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutingModule } from './app.routing.module';
import { CalculatorComponent } from './app/@pages/calculator/calculator.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './app/@core/interceptor/token-interceptor.interceptor';
import { BaseComponent } from './app/@pages/base/base.component';
import { LoginComponent } from './app/@pages/login/login.component';
import { RoadComponent } from './app/@pages/road/road.component';
import { AdminComponent } from './app/@pages/admin/admin.component';
import { SuperuserComponent } from './app/@pages/superuser/superuser.component';

@NgModule({
  declarations: [
    BaseComponent,
    CalculatorComponent,
    LoginComponent,
    RoadComponent,
    AdminComponent,
    SuperuserComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FontAwesomeModule,
    NgSelectModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [BaseComponent],
})
export class AppModule {}
