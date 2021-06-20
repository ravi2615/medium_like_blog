import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-blog',
  templateUrl: './user-blog.component.html',
  styleUrls: ['./user-blog.component.css'],
})
export class UserBlogComponent implements OnInit {
  articles: any;
  blogs:any;
  article;
  isLoading = false;
  isData = true;
  articlesSize = 0;
  uid=''
  constructor(private authService: AuthService, private router: Router, private afu: AngularFireAuth) {}

  ngOnInit(): void {
    // this.articles= (JSON.parse(localStorage.getItem('blog')));
    this.isLoading = true;
   this.uid = JSON.parse(localStorage.getItem('user'))
    // console.log(this.uid);
    
    this.authService.getUSerPreviewBlog().then((res) =>res.subscribe(res=> {
      console.log(res);
      
      this.articles = res.map((e) => {
        // console.log(e.payload.doc.data());
        // if(e.payload.doc.data()['uid'] == this.uid )
        return{
          _id: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          subtitle: e.payload.doc.data()['subtitle'],
          blog: e.payload.doc.data()['blog'],
          category: e.payload.doc.data()['category'],
          photoURL: e.payload.doc.data()['photoURL'],
          uid: e.payload.doc.data()['uid'],
          name: e.payload.doc.data()['displayName'],
          likeCount: e.payload.doc.data()['likeCount'],
          created_time : e.payload.doc.data()['created_time'],
          dlt: true,
          edit:true,
        }
      });

      this.isLoading = false;
      // console.log(this.articles.length);
      if (!this.articles.length)
       this.isData = false;
       else 
       this.articlesSize = this.articles.length;
       this.blogs = this.articles.slice(0,10) 
    }));
    // console.log(this.articles);
  }

  // singleRoute(id) {
  //   this.router.navigateByUrl(`single-blog/${id}`);
  // }

  // search(search) {
  //   if (search == '') 
  //   this.ngOnInit();
  //   else if (search != '') {
  //     this.articles = Object(this.articles).filter((res) => {
  //       // console.log(res);
  //       return (
  //         res.category.toLowerCase().match(search.toLowerCase()) ||
  //         res.title.toLowerCase().match(search.toLowerCase()) ||
  //         res.subtitle.toLowerCase().match(search.toLowerCase())
  //       );
  //     });
  //   }
  // }
}
