import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  hide = true;
  Form: FormGroup;
  loginMode=true;
  errorMsg:string;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
    if(this.authService.isLoggedIn)
    this.router.navigate([''])
  }

  onSubmit() {
    if(this.Form.valid){
      if(this.loginMode){
        this.authService.SignIn(this.Form.value.email,this.Form.value.password).then(res=>{
          // console.log(res);
          this.router.navigate([''])
          this.errorMsg=res;
        })
      }
      else if(!this.loginMode){
        this.authService.SignUp(this.Form.value.email,this.Form.value.password).then(res=>{
          // console.log(res);
          this.errorMsg=res;
        })
      }
    }
    
  }



}
