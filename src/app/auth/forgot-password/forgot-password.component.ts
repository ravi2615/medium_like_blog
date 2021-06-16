import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  errorMsg: string;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  resetPassword(e) {
    this.authService.ForgotPassword(e);
  }
}
