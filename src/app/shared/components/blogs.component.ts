import { ToastrService } from 'ngx-toastr';
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
  @Input() blogs; @Input() articles;
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { 
  }

  ngOnInit(): void {
  }

  singleRoute(id){
    this.router.navigate(['single-blog',id])
  }
  userViewProfile(uid){
    this.router.navigate([`user-view-profile/${uid}`])
  }

  userProfile(id){
    this.router.navigate(['my-profile',id])
  }

  search(search){
    // console.log((search));
    
    if(search == '')
    this.blogs = this.articles
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

  deleteBlog(id, uid){
    if(confirm("Are you sure want to delete permanently")){
      this.authService.DeleteBlog(id, uid);
      this.authService.DeleteFromAllBlog(id,uid);
        this.toastr.success('Deleted Successfully','',{
          timeOut:5000
        })
    }
  }

  
fbShare(id){
  var url = `https://myblog-b702f.web.app/#/single-blog/${id}`;
  // console.log(url,id);
  const fb = document.getElementById('fb');
  fb.setAttribute('href', `https://www.facebook.com/sharer.php?u=${url}`) 
}
linkedInShare(id, title){
  
  var url = `https://myblog-b702f.web.app/#/single-blog/${id}`;
  const linkedIn = document.getElementById('linkedIn');
  linkedIn.setAttribute('href', `https://www.linkedin.com/shareArticle?url=${url}&title=${title}`) 
}

// emailShare(id, title){
//   var url = `https://myblog-b702f.web.app/#/single-blog/${id}`;
//   const email = document.getElementById('email');
//   email.setAttribute('href', `$email = 'mailto:subject=' . ${title} . '&body=Check out this site: '. ${url} .' title=${title}';`) 
// }

whatsappShare(id, title){
  var url = `https://myblog-b702f.web.app/#/single-blog/${id}`;
  const whatsapp = document.getElementById('whatsapp');
  whatsapp.setAttribute('href', `https://wa.me/?text=${title} ${url}`) 
}

twitterShare(id, title){
  var url = `https://myblog-b702f.web.app/#/single-blog/${id}`;
  const twitter = document.getElementById('twitter');
  twitter.setAttribute('href', `https://twitter.com/share?url=${url}&text=${title}`) 
}

share(id, title){
  const share = document.getElementById('shareAll');
  const share_one = document.getElementById('share-one');
  var url = `https://myblog-b702f.web.app/#/single-blog/${id}`;
  if(!!navigator.share){
    share.style.display ='block';
    share_one.style.display = 'none';
    navigator.share({
      url: url,
      title: title
    }).then(result=>{
      console.log("shared");
    }).catch(err=>{
      console.log(err);
      
    })
  }else{

  }
}
}
