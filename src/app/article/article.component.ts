import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  articles: any;
  blogs:any;
  article = '';
  isLoading = false;
  isData = true;
  name;
  articlesSize = 0;
  categories;
  blogList:Observable<any>
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    // this.articles= (JSON.parse(localStorage.getItem('blog')));
this.authService.getPreviewBlog().then(res=>{
  console.log(res);
  
})
    this.isLoading = true;
    this.authService.getPreviewBlog().then(res=>res.subscribe((res) => {
      // console.log(res);
      this.articles = res.map((e) => {
        // console.log(e.payload.doc.data());
        if (e.payload.doc.data()['view'] == 'public')
          return {
            _id: e.payload.doc.id,
            title: e.payload.doc.data()['title'],
            subtitle: e.payload.doc.data()['subtitle'],
            blog: e.payload.doc.data()['blog'],
            category: e.payload.doc.data()['category'],
            uid: e.payload.doc.data()['uid'],
            photoURL: e.payload.doc.data()['photoURL'],
            name: e.payload.doc.data()['displayName'],
            likeCount: e.payload.doc.data()['likeCount'],
            created_time : e.payload.doc.data()['created_time'],
            dlt:false,
            
          };
         
      });
      this.isLoading = false; // console.log(this.articles.length);
      if (!this.articles.length) 
      this.isData = false 
      else 
      this.articlesSize = this.articles.length;
      this.blogs = this.articles.slice(0,10) 
      
    }));
    

  }
  
  Like(id) {
       this.authService.getUserLikes().then(res=>res.subscribe(res=>{
        if(res){
          res.map(res=>{
            if(res.payload.doc.data()['id'] == id){
              console.log(true);
            return true;
          }
          })
        }
        else {
          console.log(false);
          
          return false}
      }))
  }

//   singleRoute(id) {
//     this.router.navigate(['single-blog', id]);
//   }

//   search(search) {
//     // console.log((search));

//     if (search == '') this.ngOnInit();
//     else if (search != '') {
//       this.articles = Object(this.articles).filter((res) => {
//         // console.log(res);
//         return (
//           res.category.toLowerCase().match(search.toLowerCase()) ||
//           res.title.toLowerCase().match(search.toLowerCase()) ||
//           res.subtitle.toLowerCase().match(search.toLowerCase())
//         );
//       });
//     }
//   }
}
