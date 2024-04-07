import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/user_register';
import { passwordMatch } from 'src/app/shared/passwordMatcher';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
returnUrl = '';
registerForm!:FormGroup;
isSubmitted = false;

constructor(
  private formBuilder:FormBuilder,
  private userService: UserService,
  private activatedRoute: ActivatedRoute,
  private router: Router,
) {}

ngOnInit(): void {

  this.registerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    rePassword: ['', Validators.required]

  },{
    validators: passwordMatch('password', 'rePassword')
  })
}

get fc() {
  return this.registerForm.controls;
}

submit(){
  
  this.isSubmitted = true;
  if(this.registerForm.invalid) return;

  const fv= this.registerForm.value;
  const user: IUserRegister = {
    name: fv.name,
    email: fv.email,
    password: fv.password,
    rePassword: fv.rePassword
  };

  this.userService.register(user).subscribe(_ => {
    this.router.navigateByUrl(`/`);
  })
}

}
