import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-view-profile',
  templateUrl: './user-view-profile.component.html',
  styleUrls: ['./user-view-profile.component.css']
})
export class UserViewProfileComponent implements OnInit {

  paramId;
  userData;
  temp;
  isLoading=false;
  isData=true;
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      if(param.id[0]==" ")
      this.paramId =  param.id.slice(1);
      else this.paramId = param.id
      // console.log(this.paramId);
      // localStorage.setItem('params',param.id);
      // console.log( localStorage.getItem('params'));
      // localStorage.removeItem('params');
    })
    this.isLoading=true;
    
    // this.paramId = this.idd;
    // console.log(this.paramId);

   this.authService.userProfile().subscribe(res=>{
    this.temp = res.map(user=>{
        return user.payload.doc.data();
      //  debugger;
      // console.log((user.payload.doc.id.replace(/['"]+/g, ''))==this.paramId);
      
      //  if(user.payload.doc.id == this.paramId){
      //   this.temp.uid = user.payload.doc.data()['uid'],
      //   this.temp.displayName = user.payload.doc.data()['displayName'],
      //   this.temp.photoURL = user.payload.doc.data()['photoURL'],
      //   this.temp.emailVerified = user.payload.doc.data()['emailVerified'],
      //   this.temp.email = user.payload.doc.data()['email'],
      //   this.temp.facebookURL = user.payload.doc.data()['facebookURL'],
      //   this.temp.twitterURL = user.payload.doc.data()['twitterURL'],
      //   this.temp.githubURL = user.payload.doc.data()['githubURL'],
      //   this.temp.instagramURL = user.payload.doc.data()['instagramURL'],
      //   this.temp.linkedinURL = user.payload.doc.data()['linkedinURL'],
      //   this.temp.bio = user.payload.doc.data()['bio']
      //  }
     })
     
  //  console.log(this.temp);
   this.userData = Object(this.temp).filter(res=>{
    // console.log(res.uid.charCodeAt(0), res.uid.charCodeAt(0) == this.paramId.charCodeAt(1),this.paramId[0]);
    return res.uid == this.paramId;
    
   });
    // console.log(this.userData);
    if(!this.userData.length)
    this.isData = false
   })
  //  console.log(!!this.userData);
  //  this.userData= Object(this.temp.);
   this.isLoading=false
  //  console.log(!!this.userData);
  }
}
