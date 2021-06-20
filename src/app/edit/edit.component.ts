import { SingleBlogComponent } from './../single-blog/single-blog.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as QuillNamespace from 'quill';
let Quill: any = QuillNamespace;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  previewContent;
  editorContent;
  Article = {};
  editorForm: FormGroup;
  title;
  subTitle;
  category;
  view;
  isEmailVerified = false;
  created_time;
  temp = {
    _id: '',
    name: '',
    title: '',
    subtitle: '',
    blog: {},
    category: '',
    view: '',
    uid: '',
    photoURL: '',
    displayName: '',
    created_time: null,
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
    syntax: true,
  };

  name;
  photoURL;
  paramId;
  isLoading = false;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private afu: AngularFireAuth,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.editorForm = new FormGroup({
      editor: new FormControl(null),
      title: new FormControl(null),
      subtitle: new FormControl(null),
      category: new FormControl(null),
    });

    this.route.params.subscribe((param) => {
      this.paramId = param.id;
      // console.log(this.paramId);
    });

    this.authService.getAllBlog().then((res) => res.subscribe(res=>{
      console.log(res);
      res.map((e) => {
        // console.log(e.payload.doc.data());
        if (parseInt(e.payload.doc.id) == this.paramId) {
          (this.temp._id = e.payload.doc.id),
            (this.temp.title = e.payload.doc.data()['title']),
            (this.temp.subtitle = e.payload.doc.data()['subtitle']),
            (this.temp.blog = e.payload.doc.data()['blog']),
            (this.temp.category = e.payload.doc.data()['category']),
            (this.temp.uid = e.payload.doc.data()['uid']),
            (this.temp.photoURL = e.payload.doc.data()['photoURL']),
            (this.temp.name = e.payload.doc.data()['displayName']),
            (this.temp.likeCount = e.payload.doc.data()['likeCount']),
            (this.temp.created_time = e.payload.doc.data()['created_time']);
        }
      });
      // this.articles.push(this.temp)

      this.editorForm = new FormGroup({
        editor: new FormControl(this.temp.blog),
        title: new FormControl(this.temp.title),
        subtitle: new FormControl(this.temp.subtitle),
        category: new FormControl(this.temp.category),
      });

      this.editorContent = this.temp.blog;
      this.title = this.temp.title;
      this.subTitle = this.temp.subtitle;
      this.category = this.temp.category;
      this.view = 'public';
      this.created_time = this.temp.created_time;
    }));

    // this.editorForm
  }

  onSubmit() {
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
    this.temp.created_time = this.temp.created_time,
    this.temp.likeCount = this.temp.likeCount;
    this.Article = this.temp;
    // console.log(this.Article);
    
    // console.log(this.editorContent.slice(0,600) + "...",);
    this.previewContent = {
      _id:this.temp._id,
      blog: this.editorContent.slice(0, 200) + '<span>...</span>',
      view: 'public',
      category: this.category,
      title: this.title,
      subtitle: this.subTitle,
      uid: this.temp.uid,
      photoURL: this.temp.photoURL,
      displayName: this.temp.displayName,
      created_time: this.temp.created_time,
      likeCount: this.temp.likeCount,
    };
    // console.log(this.previewContent);

    this.authService.updateBlog(
      this.Article,
      this.previewContent,
      this.temp.category
    );
    this.toastr.success(`Saved Successfully`, '', {
      timeOut: 5000,
    });
    this.ngOnInit();
    this.router.navigate(['user-blog/{{uid}}']);
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
