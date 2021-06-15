
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
  userData={uid:'',displayName:'',photoURL:'',email:'',emailVerified: false, facebookURL:'', twitterURL:'', githubURL:'', instagramURL:'', linkedinURL:'', bio:''};
  temp={uid:'',displayName:'',photoURL:'',email:'',emailVerified: false, facebookURL:'', twitterURL:'', githubURL:'', instagramURL:'', linkedinURL:'', bio:''};
  isLoading=false;
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.paramId = param.id;
      // console.log(this.paramId);
      
    })
    
    
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
        this.temp.emailVerified = user.payload.doc.data()['emailVerified'],
        this.temp.email = user.payload.doc.data()['email'],
        this.temp.facebookURL = user.payload.doc.data()['facebookURL'],
        this.temp.twitterURL = user.payload.doc.data()['twitterURL'],
        this.temp.githubURL = user.payload.doc.data()['githubURL'],
        this.temp.instagramURL = user.payload.doc.data()['instagramURL'],
        this.temp.linkedinURL = user.payload.doc.data()['linkedinURL'],
        this.temp.bio = user.payload.doc.data()['bio']
       }
     })
    //  console.log(this.temp);
     
   })
   this.isLoading=false
   this.userData=this.temp;
  //  console.log(this.userData);
   
    
   this.profileForm = new FormGroup({
    'displayName': new FormControl(this.userData.displayName),
    'photoURL': new FormControl(this.userData.photoURL),
    'facebookURL': new FormControl(this.userData.facebookURL),
    'twitterURL': new FormControl(this.userData.twitterURL),
    'githubURL': new FormControl(this.userData.githubURL),
    'linkedinURL': new FormControl(this.userData.linkedinURL),
    'instagramURL': new FormControl(this.userData.instagramURL),
    'bio': new FormControl(this.userData.bio),
  });
   
  }

  onSubmit(){
    // console.log(this.profileForm.value, this.userData.photoURL);
    this.userData.displayName = this.profileForm.value['displayName'] == "" ? this.userData.displayName : this.profileForm.value['displayName'];
    this.userData.photoURL = this.profileForm.value['photoURL'] == "" ? this.userData.photoURL : this.profileForm.value['photoURL'];
    this.userData.facebookURL = this.profileForm.value['facebookURL'] == "" ? this.userData.facebookURL : this.profileForm.value['facebookURL'];
    this.userData.twitterURL = this.profileForm.value['twitterURL'] == "" ? this.userData.twitterURL : this.profileForm.value['twitterURL'];
    this.userData.displayName = this.profileForm.value['displayName'] == "" ? this.userData.displayName : this.profileForm.value['displayName'];
    this.userData.githubURL = this.profileForm.value['githubURL'] == "" ? this.userData.githubURL : this.profileForm.value['githubURL'];
    this.userData.linkedinURL = this.profileForm.value['linkedinURL'] == "" ? this.userData.linkedinURL : this.profileForm.value['linkedinURL'];
    this.userData.instagramURL = this.profileForm.value['instagramURL'] == "" ? this.userData.instagramURL : this.profileForm.value['instagramURL'];
    this.userData.bio = this.profileForm.value['bio'] == "" ? this.userData.bio : this.profileForm.value['bio'];
    // console.log(this.userData);
    
    this.authService.updateUserData(this.userData)
  }

  resendVerificationMail(){
    this.authService.SendVerificationMail();
    // this.router.navigate(['login'])
    // this.msg= "Please check your email and click on the link to verify your email address.";
    
  }

}
