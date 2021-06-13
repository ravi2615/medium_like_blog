import { SingleBlogComponent } from './single-blog/single-blog.component';
import { UserBlogComponent } from './user/user-blog/user-blog.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AuthComponent } from './auth/auth.component';
import { WriteComponent } from './write/write.component';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.gaurd';

const routes: Routes = [
  { path:'', redirectTo:'blog', pathMatch:'full'},
  { path: 'blog', component: ArticleComponent },
  { path: 'write', component: WriteComponent, canActivate:[AuthGuard],
},
  { path: 'login', component: AuthComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate:[AuthGuard] },
  { path: 'user-blog', component: UserBlogComponent, canActivate:[AuthGuard]},
  { path: 'single-blog/:id', component: SingleBlogComponent},
  { path: '**', redirectTo:'blog'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }