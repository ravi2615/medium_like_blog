import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-view-profile',
  templateUrl: './user-view-profile.component.html',
  styleUrls: ['./user-view-profile.component.css'],
})
export class UserViewProfileComponent implements OnInit {
  paramId;
  // userData;
  temp;
  isLoading = false;
  isData = true;
  @Input() userData;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //   this.route.params.subscribe(param=>{
    //     if(param.id[0]==" ")
    //     this.paramId =  param.id.slice(1);
    //     else this.paramId = param.id
    //   })
    //   this.isLoading=true;
    //   // this.paramId = this.idd;
    //   // console.log(this.paramId);
    //  this.authService.userProfile().subscribe(res=>{
    //   this.temp = res.map(user=>{
    //       return user.payload.doc.data();
    //    })
    //  console.log(this.temp);
    //  this.userData = Object(this.temp).filter(res=>{
    //   // console.log(res.uid.charCodeAt(0), res.uid.charCodeAt(0) == this.paramId.charCodeAt(1),this.paramId[0]);
    //   return res.uid == this.paramId;
    //  });
    // console.log(this.userData);
    //   if(!this.userData.length)
    //   this.isData = false
    //  })
    //  this.isLoading=false
    //  console.log(!!this.userData);
  }
}
