
/*
 * Copyright (c) 2023 Thomas Hansen - For license inquiries you can contact thomas@ainiro.io.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material imports
import { MaterialModule } from './material.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Extra packages
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { MatNativeDateModule } from '@angular/material/core';
import { RecaptchaV3Module, RecaptchaFormsModule, RecaptchaModule, RECAPTCHA_V3_SITE_KEY } from "ng-recaptcha";
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

// Hyperlambda mode for CodeMirror import.
import 'src/app/helpers/hyperlambda.js';

// SQL hints plugin for CodeMirror.
import 'codemirror/addon/hint/sql-hint.js';

// PWA
import { environment } from 'src/environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';

// Interceptors
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';

// Components
import { MainComponent } from 'src/app/components/main/main.component';
import { CoreComponent } from 'src/app/components/main/core/core.component';
import { HeaderComponent } from 'src/app/components/main/header/header.component';
import { FooterComponent } from 'src/app/components/main/footer/footer.component';

// Misc
import { AccessGuard } from 'src/app/access.guard';
import { AuthBaseComponent } from 'src/app/components/public/authentication/auth-base/auth-base.component';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    MainComponent,
    CoreComponent,
    HeaderComponent,
    FooterComponent,
    AuthBaseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CodemirrorModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    RecaptchaModule,
    RecaptchaV3Module,
    RecaptchaFormsModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    AccessGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: "6LfVd20fAAAAAC2tcJ55RvOEkraQL390cDw2yiT2"
    },
  ],
  bootstrap: [MainComponent]
})
export class AppModule { }