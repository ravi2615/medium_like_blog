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
constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

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
       this.temp._id= e.payload.doc.id,
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
userViewProfile(uid){
  this.router.navigate([`user-view-profile`,uid])
}

fbShare(id){
  var url = window.location.href;
  // console.log(url,id);
  const fb = document.getElementById('fb');
  fb.setAttribute('href', `https://www.facebook.com/sharer.php?u=${url}`) 
}
linkedInShare(id, title){
  
  var url = window.location.href;
  const linkedIn = document.getElementById('linkedIn');
  linkedIn.setAttribute('href', `https://www.linkedin.com/shareArticle?url=${url}&title=${title}`) 
}

// emailShare(id, title){
//   var url = window.location.href;
//   const email = document.getElementById('email');
//   email.setAttribute('href', `$email = 'mailto:subject=' . ${title} . '&body=Check out this site: '. ${url} .' title=${title}';`) 
// }

whatsappShare(id, title){
  var url = window.location.href;
  const whatsapp = document.getElementById('whatsapp');
  whatsapp.setAttribute('href', `https://wa.me/?text=${title} ${url}`) 
}

twitterShare(id, title){
  var url = window.location.href;
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
