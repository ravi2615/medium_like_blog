import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css']
})
export class SingleBlogComponent implements OnInit {

  articles=[];
  paramId;
  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.articles= (JSON.parse(localStorage.getItem('blog')));
    this.route.params.subscribe(param=>{
      this.paramId = param.id;
      // console.log(this.paramId);
      
    })
    // console.log(this.paramId)
    this.authService.getAllBlog().subscribe(res=>{
      // console.log(res);
      this.articles = res.map(e=>{
        // console.log(e.payload.doc.id);
        if(parseInt(e.payload.doc.id) == this.paramId)
        // console.log("matched");
        
        return {
          title:e.payload.doc.data()['title'],
          subtitle:e.payload.doc.data()['subtitle'],
          blog:e.payload.doc.data()['blog']
        }
        // else []
      })
      
    })
    // console.log(this.articles);
    
  }

}
