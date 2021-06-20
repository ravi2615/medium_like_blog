import { AuthGuard } from './services/auth.gaurd';
import { AuthService } from './services/auth.service';
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
import { AuthComponent } from './auth/auth.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ToastrModule } from 'ngx-toastr';
import { UserBlogComponent } from './user/user-blog/user-blog.component';
import { SingleBlogComponent } from './single-blog/single-blog.component';
import { BlogsComponent } from './shared/components/blogs.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserViewProfileComponent } from './user/user-view-profile/user-view-profile.component';
import { ErrorComponent } from './error/error.component';
import { CategoryComponent } from './category/category.component';
import { EditComponent } from './edit/edit.component';
import * as QuillNamespace from 'quill';
let Quill: any = QuillNamespace;

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    ArticleComponent,
    WriteComponent,
    NavComponent,
    AuthComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    UserBlogComponent,
    SingleBlogComponent,
    BlogsComponent,
    UserProfileComponent,
    UserViewProfileComponent,
    ErrorComponent,
    CategoryComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    QuillModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
