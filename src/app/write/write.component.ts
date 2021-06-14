import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as QuillNamespace from 'quill';
let Quill: any = QuillNamespace;
import ImageResize from 'quill-image-resize-module';
Quill.register('modules/imageResize', ImageResize);

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  editorContent={};
  Article={};
  editorForm: FormGroup;
  title;
  subTitle;
  category;
  view;
  isEmailVerified=false;
  temp={title:'', subtitle:'', blog: {}, category: '', view: '',uid:'',photoURL:'',displayName:''}
  editorStyle={
    height: '300px',
    backgroundColor: '#fff',
  }

  config ={
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
  
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
  
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
  
      ['clean'],                                      // remove formatting button
  
      ['link', 'image', 'video']                         // link and image, video
    ],
    
    imageResize: true,

  }

  name;
  photoURL;
  constructor(private authService:AuthService, private toastr : ToastrService, private router : Router){}
  
  ngOnInit() {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null),
      'title': new FormControl(null),
      'subtitle': new FormControl(null),
      'category': new FormControl(null),
    });
    
    this.editorContent=null;
    this.title=null;
    this.subTitle=null;
    this.category=null;
    this.view='public';

    this.authService.userProfile().subscribe(res=>{
      res.map(user=>{
        if(user.payload.doc.id == JSON.parse(localStorage.getItem('user'))){
         this.temp.uid = user.payload.doc.data()['uid'],
         this.temp.displayName = user.payload.doc.data()['displayName'],
         this.temp.photoURL = user.payload.doc.data()['photoURL']   
        }
      })
    })
     // 

    this.name = this.authService.userData?.displayName;
    this.photoURL = this.authService.userData?.photoURL;

    this.isEmailVerified = this.authService.userData?.emailVerified != null || this.authService.userData?.emailVerified ? true : false;

  }


  onSubmit(){
    if(this.isEmailVerified){
      this.editorContent=this.editorForm.get('editor').value
      // console.log(this.editorForm.get('editor').value);
      this.temp.title = this.title;
      this.temp.subtitle = this.subTitle;
      this.temp.blog = this.editorContent;
      this.temp.category = this.category;
      this.temp.view = this.view;
      this.temp.uid  = this.authService.userData?.uid;
      this.temp.displayName = this.authService.userData?.displayName;
      this.temp.photoURL = this.authService.userData?.photoURL;
      this.Article=(this.temp)
      
      this.authService.createBlog(this.Article);
      this.ngOnInit();
    }else {
      this.toastr.info(`Please Verify your email: ${this.authService.userData?.email} first`, '',{
        timeOut: 10000
      })
      this.router.navigate(['verify-email-address']);
    }
  }

  maxLength(e){
    if(e.editor.getLength() > 1000000){
      e.editor.deleteText(10, e.editor.getLength());
    }
    
  }
  onChange(e){
    // console.log(e);
    
    this.editorContent=e
  }
  onChangeTitle(e){
    // console.log(e)
    this.title=e;
  }
  onChangeSubTitle(e){
    // console.log(e)
    this.subTitle=e;
  }
  onChangeCategory(e){
    this.category = e;
  }
  onSelect(e){console.log(this.view)
    this.view = e.source.value != '' && e.source.value != null ? e.source.value : this.view;
    console.log(this.view)
  }
}
