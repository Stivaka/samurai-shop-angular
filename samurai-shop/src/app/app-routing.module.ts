import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { DetailPageComponent } from './components/pages/detail-page/detail-page.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'catalog', component:CatalogComponent},
  {path:'item/:id', component:DetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
