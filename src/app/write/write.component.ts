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
  temp=[]
  Article={};
  editorForm: FormGroup;
  editorStyle={
    height: '300px',
    backgroundColor: '#fff',
  }

  config ={
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
  
      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      // [{ 'direction': 'rtl' }],                         // text direction
  
      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
  
      // ['clean'],                                      // remove formatting button
  
      ['link', 'image', 'video']                         // link and image, video
    ],
    
    imageResize: true,

  }
  
  ngOnInit() {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });
    this.editorContent=null;

    // if(this.editorContent==''){
    //   this.editorContent = JSON.parse(localStorage.getItem('html'));
    // }
  }

  onSubmit(){
    this.editorContent=this.editorForm.get('editor').value
    // console.log(this.editorForm.get('editor').value);
    if(JSON.parse(localStorage.getItem('html')))
    {
    this.temp.push(JSON.parse(localStorage.getItem('html')));
  }
    this.temp.push(this.editorContent)
    this.Article=(this.temp)
    
    localStorage.setItem("html",JSON.stringify(this.Article));
    this.ngOnInit();
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
}
