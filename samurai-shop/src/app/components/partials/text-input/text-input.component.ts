import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent {
@Input()
control!:AbstractControl;
@Input()
showErrorsWhen:boolean = true;
@Input()
label!:string;
@Input()
type: 'text' | 'name' | 'price' | 'image' | 'type' | 'material' | 'color' | 'weight' | 'durability' | 'description' = 'text'
}
