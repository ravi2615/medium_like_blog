import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css']
})
export class SingleBlogComponent implements OnInit {

temp={_id:'', title:'', subtitle:'', blog:'', category:'', uid:'', photoURL:'', name:''};
articles=[];
paramId;
isLoading=false
isData=true;
constructor(private authService: AuthService, private route: ActivatedRoute) { }

ngOnInit(): void {
    // this.articles= (JSON.parse(localStorage.getItem('blog')));
    this.route.params.subscribe(param=>{
      this.paramId = param.id;
      // console.log(this.paramId);
      
    })
    // console.log(this.paramId)
  this.isLoading = true;
  this.authService.getAllBlog().subscribe(res=>{
    // console.log(res);
     res.map(e=>{
      // console.log(e.payload.doc.data());
      if(parseInt(e.payload.doc.id) == this.paramId){
       this.temp. _id= e.payload.doc.id,
       this.temp.title = e.payload.doc.data()['title'],
       this.temp.subtitle = e.payload.doc.data()['subtitle'],
       this.temp.blog = e.payload.doc.data()['blog'],
       this.temp.category = e.payload.doc.data()['category'],
       this.temp.uid = e.payload.doc.data()['uid'],
       this.temp.photoURL = e.payload.doc.data()['photoURL'],
       this.temp.name = e.payload.doc.data()['displayName']
    }})
    this.articles.push(this.temp)
    
    this.isLoading = false// console.log(this.articles.length);
    if(!this.articles.length)
    this.isData=false
  })
  
}

}
