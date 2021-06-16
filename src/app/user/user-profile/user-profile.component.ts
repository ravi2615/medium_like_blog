import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';

import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  paramId;
  articles = [];
  t = [];
  userData = {
    uid: '',
    displayName: '',
    photoURL: '',
    email: '',
    emailVerified: false,
    facebookURL: '',
    twitterURL: '',
    githubURL: '',
    instagramURL: '',
    linkedinURL: '',
    bio: '',
  };
  temp = {
    uid: '',
    displayName: '',
    photoURL: '',
    email: '',
    emailVerified: false,
    facebookURL: '',
    twitterURL: '',
    githubURL: '',
    instagramURL: '',
    linkedinURL: '',
    bio: '',
  };
  isLoading = false;
  edit = false;
  postview = false;
  postSize = 0;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private afu: AngularFireAuth,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if (param.id[0] == ' ') this.paramId = param.id.slice(1);
      else this.paramId = param.id;
    });
    this.isLoading = true;

    this.afu.authState.subscribe((user) => {
      if (user) this.temp.emailVerified = user.emailVerified;
    });
    this.authService.userProfile().subscribe((res) => {
      res.map((user) => {
        //  console.log(user.payload.doc.data()['uid']===this.paramId);

        if (user.payload.doc.id == this.paramId) {
          (this.temp.uid = user.payload.doc.data()['uid']),
            (this.temp.displayName = user.payload.doc.data()['displayName']),
            (this.temp.photoURL = user.payload.doc.data()['photoURL']),
            (this.temp.email = user.payload.doc.data()['email']),
            (this.temp.facebookURL = user.payload.doc.data()['facebookURL']),
            (this.temp.twitterURL = user.payload.doc.data()['twitterURL']),
            (this.temp.githubURL = user.payload.doc.data()['githubURL']),
            (this.temp.instagramURL = user.payload.doc.data()['instagramURL']),
            (this.temp.linkedinURL = user.payload.doc.data()['linkedinURL']),
            (this.temp.bio = user.payload.doc.data()['bio']);
          this.temp.emailVerified = this.temp.emailVerified;
        }
      });
      //  console.log(this.temp);
      this.postView(this.temp.uid);
    });
    this.isLoading = false;
    this.userData = this.temp;
    //  console.log(this.userData);

    this.profileForm = new FormGroup({
      displayName: new FormControl(this.userData.displayName),
      photoURL: new FormControl(this.userData.photoURL),
      facebookURL: new FormControl(this.userData.facebookURL),
      twitterURL: new FormControl(this.userData.twitterURL),
      githubURL: new FormControl(this.userData.githubURL),
      linkedinURL: new FormControl(this.userData.linkedinURL),
      instagramURL: new FormControl(this.userData.instagramURL),
      bio: new FormControl(this.userData.bio),
    });
  }

  onEdit() {
    this.afu.authState.subscribe((user) => {
      // console.log( user.uid);
      if (user) {
        if (user.uid == this.userData.uid) {
          this.edit = !this.edit;
          this.ngOnInit();
        } else {
          this.router.navigate(['error']);
          this.toastr.error(
            `Permission Denied`,
            'Sorry! You are not permitted',
            {
              timeOut: 5000,
            }
          );
        }
      } else {
        this.router.navigate(['error']);
        this.toastr.error(`Permission Denied`, 'Sorry! You are not permitted', {
          timeOut: 5000,
        });
      }
    });
    // this.edit = !this.edit;
    // console.log( this.userData.uid);
  }

  onSubmit() {
    // console.log(this.profileForm.value, this.userData.photoURL);

    this.userData.displayName =
      this.profileForm.value['displayName'] == ''
        ? this.userData.displayName
        : this.profileForm.value['displayName'];
    this.userData.photoURL =
      this.profileForm.value['photoURL'] == ''
        ? this.userData.photoURL
        : this.profileForm.value['photoURL'];
    this.userData.facebookURL =
      this.profileForm.value['facebookURL'] == ''
        ? this.userData.facebookURL
        : this.profileForm.value['facebookURL'];
    this.userData.twitterURL =
      this.profileForm.value['twitterURL'] == ''
        ? this.userData.twitterURL
        : this.profileForm.value['twitterURL'];
    this.userData.displayName =
      this.profileForm.value['displayName'] == ''
        ? this.userData.displayName
        : this.profileForm.value['displayName'];
    this.userData.githubURL =
      this.profileForm.value['githubURL'] == ''
        ? this.userData.githubURL
        : this.profileForm.value['githubURL'];
    this.userData.linkedinURL =
      this.profileForm.value['linkedinURL'] == ''
        ? this.userData.linkedinURL
        : this.profileForm.value['linkedinURL'];
    this.userData.instagramURL =
      this.profileForm.value['instagramURL'] == ''
        ? this.userData.instagramURL
        : this.profileForm.value['instagramURL'];
    this.userData.bio =
      this.profileForm.value['bio'] == ''
        ? this.userData.bio
        : this.profileForm.value['bio'];
    // console.log(this.userData);

    this.authService.updateUserData(this.userData);
    this.edit = false;
  }

  resendVerificationMail() {
    this.authService.SendVerificationMail();
  }

  postView(uid) {
    // console.log(uid);
    this.isLoading = true;
    // this.postview= !this.postview
    // if(this.postview)
    // {
    this.authService.getAllBlog().subscribe((res) => {
      // console.log(res);
      this.t = res.map((e) => {
        return e.payload.doc.data();
        // console.log(e.payload.doc.data()['uid'].slice(1),"ggfhg" , uid.charAt(0),"hgfghdf");
        // if (e.payload.doc.data()['view'] == 'public')
      });

      this.articles = Object(this.t).filter((res) => {
        // console.log(res.uid);
        if (res.uid.charAt(0) == ' ') res.uid = res.uid.slice(1);

        return res.uid.match(uid);
      });
    });
    // }
    // console.log(this.articles)
    this.isLoading = false;
  }
}
