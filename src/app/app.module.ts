import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './safe.pipe';
import { ArticleComponent } from './article/article.component';
import { AppRoutingModule } from './app-routing.module';
import { WriteComponent } from './write/write.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    ArticleComponent,
    WriteComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    QuillModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
