import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

//   articles:any;
  article = '';
  isLoading = false;
  isData=true;

  @Input() blogs;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  //  console.log(this.blogs);
   
  }

  singleRoute(id){
    this.router.navigate(['single-blog',id])
  }

  userProfile(id){
    this.router.navigate(['my-profile',id])
  }

  search(search){
    // console.log((search));
    
    if(search == '')
    this.ngOnInit();
    else
    if(search!=''){
        this.blogs = Object(this.blogs).filter(res=>{
        // console.log(res);
        return res.category.toLowerCase().match(search.toLowerCase()) 
        || res.title.toLowerCase().match(search.toLowerCase()) 
        || res.subtitle.toLowerCase().match(search.toLowerCase()) ;
      })
    }
    
  }
}
