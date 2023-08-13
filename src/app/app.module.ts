import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store'; // Import StoreModule
import { EffectsModule } from '@ngrx/effects'; // Import EffectsModule

import { TokenIntercepterService } from 'src/app/core/interceptors/token-intercepter.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppNotfoundComponent } from './features/error/components/app-notfound/app-notfound.component';
import { AppInternalserverComponent } from './features/error/components/app-internalserver/app-internalserver.component';
import { AppBadgatewayComponent } from './features/error/components/app-badgateway/app-badgateway.component';
import { CommonerrorComponent } from './features/error/components/commonerror/commonerror.component';
import { ErrorHandlingInterceptor } from './core/interceptors/errorHandintercepter.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { userReducer } from 'src/app/stores/user/user.reducer';
import { UserEffects } from 'src/app/stores/user/user.effects';
import { UserStateModule } from './stores/state.module';

@NgModule({
  declarations: [
    AppComponent,
    AppNotfoundComponent,
    AppInternalserverComponent,
    AppBadgatewayComponent,
    CommonerrorComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    UserStateModule,
  ],
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
