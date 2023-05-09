import { Component, OnInit,  } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [];
  isEditing : Boolean = false;
  formGroupClient : FormGroup;


  constructor(private clientService: ClientService, 
              private formBuilder: FormBuilder) {
    this.formGroupClient = formBuilder.group({
      id : [''],
      name : [''],
      email : ['']

    });
  }

  ngOnInit(): void {
    this.loadClients();
   
  }
  loadClients() {
    this.clientService.getClients().subscribe(
      {
        next : data => this.clients = data
      }
    );
  
  }

 save(){
if(this.isEditing)

    {
      this.clientService.update(this.formGroupClient.value).subscribe(
        {
          next: data => {
            this.loadClients();
            this.formGroupClient.reset();
            this.isEditing = false;

          }
        }
      )

    }
    else{
    this.clientService.save(this.formGroupClient.value).subscribe(
    {
        next: data => {
          this.clients.push(data);
          this.formGroupClient.reset();
        }
    }

    );
  }


      
  }

  clean(){
    this.formGroupClient.reset();
    this.isEditing = false;
  }

  edit(client: Client){
    this.formGroupClient.setValue(client);
    this.isEditing = true;
    



  }

  delete(client: Client){
    this.clientService.delete(client).subscribe({
      next: ()=> this.loadClients()
    })


  }



}
