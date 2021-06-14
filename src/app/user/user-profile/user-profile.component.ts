
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  
  profileForm: FormGroup;
  paramId;
  userData={uid:'',displayName:'',photoURL:'',email:'',emailVerified:''};
  temp={uid:'',displayName:'',photoURL:'',email:'',emailVerified:''};
  isLoading=false;
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.paramId = param.id;
      // console.log(this.paramId);
      
    })
    
    
    this.profileForm = new FormGroup({
      'displayName': new FormControl(''),
      'photoURL': new FormControl(''),
    });
    
    this.isLoading=true;
    if(JSON.parse(localStorage.getItem('user')) != this.paramId){
      // this.profileForm.get('displayName').disable();
      // this.profileForm.get('photoURL').disable();
      this.router.navigate([''])
    }

   this.authService.userProfile().subscribe(res=>{
     res.map(user=>{
      //  console.log(user.payload.doc.data()['uid']===this.paramId);
       
       if(user.payload.doc.id == this.paramId){
        this.temp.uid = user.payload.doc.data()['uid'],
        this.temp.displayName = user.payload.doc.data()['displayName'],
        this.temp.photoURL = user.payload.doc.data()['photoURL'],
        this.temp.email = user.payload.doc.data()['email'],
        this.temp.emailVerified = user.payload.doc.data()['emailVerified']    
       }
     })
    //  console.log(this.temp);
     
   })
   this.isLoading=false
   this.userData=this.temp;
  //  console.log(this.userData);
   
  }

  onSubmit(){
    console.log(this.profileForm.value);
    this.userData.displayName = this.profileForm.value['displayName'];
    this.userData.photoURL = this.profileForm.value['photoURL']
    this.authService.SetUserData(this.userData)
  }

}
