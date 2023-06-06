import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientsComponent } from './clients/clients.component';


const routes: Routes = [
  {path: '',           component : ClientsComponent},
  {path: 'clients',           component : ClientsComponent},
  {path: 'clientDatails/:id', component : ClientFormComponent},
  {path: 'createClient', component : ClientFormComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
