import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateService } from 'src/app/services/create.service';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';
import { Item } from 'src/app/shared/models/Item';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent {

  item!:Item;
  updateForm!: FormGroup;

  constructor (
    itemService:ItemService,
    private FormBuilder:FormBuilder,
    private userService:UserService,
    private toastrService: ToastrService,
    private createService:CreateService,
    private router:Router,
    activatedRoute: ActivatedRoute) {

      activatedRoute.params.subscribe((params) => {

        if (params['id'])
  
          itemService.getItemById(params['id']).subscribe(serverItem => {
            
            this.item = serverItem;
            
            
            this.updateForm.controls[`name`].setValue(this.item.name);
            this.updateForm.controls[`price`].setValue(this.item.price)
            this.updateForm.controls[`image`].setValue(this.item.image)
            this.updateForm.controls[`price`].setValue(this.item.price)
            this.updateForm.controls[`type`].setValue(this.item.type)
            this.updateForm.controls[`material`].setValue(this.item.material)
            this.updateForm.controls[`color`].setValue(this.item.color)
            this.updateForm.controls[`weight`].setValue(this.item.weight)
            this.updateForm.controls[`durability`].setValue(this.item.durability)
            this.updateForm.controls[`description`].setValue(this.item.description)
            
            
          });
  
        })
    }
    
    

    async ngOnInit(): Promise<void> {
      
      this.updateForm = this.FormBuilder.group({
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
      return this.updateForm.controls;
    }
    
    updateOffer(){
    
    if (this.updateForm.invalid){
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

    
    
    this.createService.update(this.item).subscribe({
      next:() => {
        this.router.navigateByUrl(`/item/${this.item.id}`);
      },
      error:(error) => {
        this.toastrService.error(error.error, 'Failed')
      }
    })
  }


}
