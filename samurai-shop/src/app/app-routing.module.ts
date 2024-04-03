import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { DetailPageComponent } from './components/pages/detail-page/detail-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { CreateComponent } from './components/pages/create/create.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'catalog', component:CatalogComponent},
  {path:'item/:id', component:DetailPageComponent},
  {path: 'login', component:LoginPageComponent},
  {path: 'create', component:CreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
