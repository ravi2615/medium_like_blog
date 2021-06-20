import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import * as Emoji from "quill-emoji";
// // import Emoji from 'quill-emoji';
// // Quill.register('modules/imageResize', ImageResize);
// Quill.register("modules/emoji", Emoji);

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css'],
})
export class WriteComponent implements OnInit {
  previewContent;
  editorContent = [];
  Article = {};
  editorForm: FormGroup;
  title;
  subTitle;
  category;
  view;
  isEmailVerified = false;
  temp = {
    title: '',
    subtitle: '',
    blog: {},
    category: '',
    view: '',
    uid: '',
    photoURL: '',
    displayName: '',
    created_time:null,
    likeCount: 0,
  };
  editorStyle = {
    height: '500px',
    backgroundColor: '#fff',
  };

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'], // remove formatting button

      ['link', 'image', 'video'], // link and image, video
    ],
    syntax:true,
    // "emoji-toolbar": true,
    // "emoji-textarea": true,
    // "emoji-shortname": true,
  };

  name;
  photoURL;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private afu : AngularFireAuth
  ) {}

  ngOnInit() {
    this.editorForm = new FormGroup({
      editor: new FormControl(null),
      title: new FormControl(null),
      subtitle: new FormControl(null),
      category: new FormControl(null),
    });

    this.editorContent = null;
    this.title = null;
    this.subTitle = null;
    this.category = null;
    this.view = 'public';

    this.authService.userProfile().subscribe((res) => {
      res.map((user) => {
        if (user.payload.doc.id == JSON.parse(localStorage.getItem('user'))) {
          (this.temp.uid = user.payload.doc.data()['uid']),
            (this.temp.displayName = user.payload.doc.data()['displayName']),
            (this.temp.photoURL = user.payload.doc.data()['photoURL']);
        }
      });
    });
    //

    this.afu.authState.subscribe((user) => {
      if (user) this.isEmailVerified = user.emailVerified;
    });
  }

  onSubmit() {
    if (this.isEmailVerified) {
      if (this.temp.displayName && this.temp.photoURL) {
        this.editorContent = this.editorForm.get('editor').value;
        // console.log(this.editorForm.get('editor').value);
        this.temp.title = this.title;
        this.temp.subtitle = this.subTitle;
        this.temp.blog = this.editorContent;
        this.temp.category = this.category;
        this.temp.view = 'public';
        this.temp.uid = this.temp.uid;
        this.temp.displayName = this.temp.displayName;
        this.temp.photoURL = this.temp.photoURL;
        this.temp.created_time = Date.now(),
        this.temp.likeCount  = 0;
        this.Article = this.temp;
        // console.log(this.editorContent.slice(0,600) + "...",);
        this.previewContent = {
          blog: this.editorContent.slice(0,200) + "<span>...</span>",
          view : 'public',
          category : this.category,
          title: this.title,
          subtitle: this.subTitle,
          uid: this.temp.uid,
          photoURL: this.temp.photoURL,
          displayName: this.temp.displayName,
          created_time: this.temp.created_time,
          likeCount: 0
        } 
        // console.log(this.previewContent);
        

        this.authService.createBlog(this.Article, this.previewContent, this.temp.category);
        this.toastr.success(`Saved Successfully`, '', {
          timeOut: 5000,
        });
        this.ngOnInit();
        this.router.navigate(['user-blog/{{uid}}']);
      } else {
        this.router.navigate(['user-view-profile', 
        this.temp.uid]);this.toastr.info(`Update your name and photoURL`, 'Update your profile first', {
          timeOut: 10000,
        });
      }
    } else {
      this.toastr.info(
        `Please Verify your email: ${this.authService.userData?.email} first`,
        '',
        {
          timeOut: 5000,
        }
      );
      this.router.navigate(['verify-email-address']);
    }
  }

  maxLength(e) {
    if (e.editor.getLength() > 1000000) {
      e.editor.deleteText(10, e.editor.getLength());
    }
  }
  onChange(e) {
    // console.log(e);
    this.editorContent = e;
  }
  onChangeTitle(e) {
    // console.log(e)
    this.title = e;
  }
  onChangeSubTitle(e) {
    // console.log(e)
    this.subTitle = e;
  }
  onChangeCategory(e) {
    this.category = e;
  }
  onSelect(e) {
    // console.log(this.view)
    this.view =
      e.source.value != '' && e.source.value != null
        ? e.source.value
        : this.view;
    // console.log(this.view)
  }
}
