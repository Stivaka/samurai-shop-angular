import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { DetailPageComponent } from './components/pages/detail-page/detail-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { CreateComponent } from './components/pages/create/create.component';
import { EditPageComponent } from './components/pages/edit-page/edit-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { UserOffersComponent } from './components/pages/user-offers/user-offers.component';
import { UserActivate } from './guard/user.active';
import { GuestActivate } from './guard/guest.active';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'catalog', component:CatalogComponent},
  {path:'item/:id', component:DetailPageComponent},
  {path: 'login', component:LoginPageComponent, canActivate: [UserActivate]},
  {path: 'create', component:CreateComponent, canActivate: [GuestActivate]},
  {path: 'edit/:id', component:EditPageComponent, canActivate: [GuestActivate]},
  {path: 'register', component:RegisterPageComponent, canActivate: [UserActivate]},
  {path: 'offers', component:UserOffersComponent, canActivate: [GuestActivate]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
