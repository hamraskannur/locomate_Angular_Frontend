import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenIntercepterService } from 'src/app/core/token-intercepter.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppNotfoundComponent } from './pages/error/app-notfound/app-notfound.component';
import { AppInternalserverComponent } from './pages/error/app-internalserver/app-internalserver.component';
import { AppBadgatewayComponent } from './pages/error/app-badgateway/app-badgateway.component';
import { CommonerrorComponent } from './pages/error/commonerror/commonerror.component';
import { ErrorHandlingInterceptor } from './core/errorHandintercepter.service';

@NgModule({
  declarations: [
    AppComponent,
    AppNotfoundComponent,
    AppInternalserverComponent,
    AppBadgatewayComponent,
    CommonerrorComponent,
  ],
  imports: [AppRoutingModule, BrowserModule, FormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercepterService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
