import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articles:any;
  article = '';
  isLoading = false;
  isData=true;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // this.articles= (JSON.parse(localStorage.getItem('blog')));
    
    this.isLoading = true;
    this.authService.getAllBlog().subscribe(res=>{
      // console.log(res);
      this.articles = res.map(e=>{
        // console.log(e.payload.doc.data());
        if(e.payload.doc.data()['view'] == 'public')
        return {
          _id: e.payload.doc.id,
          title:e.payload.doc.data()['title'],
          subtitle:e.payload.doc.data()['subtitle'],
          blog:e.payload.doc.data()['blog'],
          category:e.payload.doc.data()['category'],
          uid: e.payload.doc.data()['uid'],
          photoURL: e.payload.doc.data()['photoURL'],
          name: e.payload.doc.data()['displayName'],
          userName: e.payload.doc.data()['userName'],
        }
      })


      
      this.isLoading = false// console.log(this.articles.length);
      if(!this.articles.length)
      this.isData=false
    })
    
  }

  singleRoute(id){
    this.router.navigate(['single-blog',id])
  }

  search(search){
    // console.log((search));
    
    if(search == '')
    this.ngOnInit();
    else
    if(search!=''){
        this.articles = Object(this.articles).filter(res=>{
        // console.log(res);
        return res.category.toLowerCase().match(search.toLowerCase()) 
        || res.title.toLowerCase().match(search.toLowerCase()) 
        || res.subtitle.toLowerCase().match(search.toLowerCase()) ;
      })
    }
    
  }
}
