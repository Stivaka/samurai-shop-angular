import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateService } from 'src/app/services/create.service';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';
import { Item } from 'src/app/shared/models/Item';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit{
  
  item:Item = new Item();
  createForm!: FormGroup;

  constructor (
    itemService:ItemService,
    private FormBuilder:FormBuilder,
    private userService:UserService,
    private toastrService: ToastrService,
    private createService:CreateService,
    private router:Router) {}

    ngOnInit(): void {
        this.createForm = this.FormBuilder.group({
          name:['', Validators.required],
          price:['', Validators.required],
          image: ['', Validators.required],
          type: ['', Validators.required],
          material: ['', Validators.required],
          color: ['', Validators.required],
          weight: ['', Validators.required],
          durability: ['', Validators.required],
          description: ['', Validators.required]

          
        })
    }

    get fc(){
      return this.createForm.controls;
    }

    createOffer(){
      if (this.createForm.invalid){
        this.toastrService.warning('Please fill the inputs', 'Invalid inputs');
        return;
      }

      this.item.name = this.fc['name'].value;
      this.item.price = this.fc['price'].value;
      this.item.image = this.fc['image'].value;
      this.item.type = this.fc['type'].value;
      this.item.material = this.fc['material'].value;
      this.item.color = this.fc['color'].value;
      this.item.weight = this.fc['weight'].value;
      this.item.durability = this.fc['durability'].value;
      this.item.description = this.fc['description'].value;

      

      this.createService.create(this.item).subscribe({
        next:() => {
          this.router.navigateByUrl(`/catalog`);
        },
        error:(error) => {
          this.toastrService.error(error.error, 'Failed')
        }
      })
      
    }
}
