import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  userEmail;
  resend = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private afauth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    // this.userData=this.authService.userData;
    this.afauth.authState.subscribe((user) => {
      if (user) {
        this.userEmail = user.email;
        // console.log("jgg",user.emailVerified);

        if (user.emailVerified) this.router.navigate(['']);
      }
    });
    this.resend = true;
  }

  resendVerificationMail() {
    this.authService.SendVerificationMail();
    this.resend = false;
    // this.router.navigate(['login'])
    // this.msg= "Please check your email and click on the link to verify your email address.";
  }
}
