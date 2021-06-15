import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import  firebase  from 'firebase/app';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLogged= false;
  uid;
  constructor(public authService :AuthService, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.isLogged = this.authService.isLoggedIn
    // this.uid = JSON.parse(localStorage.getItem('user'))
    // console.log(this.isLogged);
    this.afAuth.authState.subscribe(user=>{
      if(user)
      this.uid = user.uid
    })
    // console.log(this.uid);
    
    
  }

  signOut(){
    this.authService.SignOut();
    this.router.navigate(['login'])
  }

}
