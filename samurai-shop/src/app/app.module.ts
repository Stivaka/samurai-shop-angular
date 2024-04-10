import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { DetailPageComponent } from './components/pages/detail-page/detail-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateComponent } from './components/pages/create/create.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { EditPageComponent } from './components/pages/edit-page/edit-page.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { UserOffersComponent } from './components/pages/user-offers/user-offers.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CatalogComponent,
    DetailPageComponent,
    LoginPageComponent,
    CreateComponent,
    EditPageComponent,
    TextInputComponent,
    RegisterPageComponent,
    UserOffersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
