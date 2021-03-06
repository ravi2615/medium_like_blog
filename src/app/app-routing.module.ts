import { EditComponent } from './edit/edit.component';
import { ErrorComponent } from './error/error.component';
import { UserViewProfileComponent } from './user/user-view-profile/user-view-profile.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
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
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
  { path: 'blog', component: ArticleComponent },
  { path: 'write', component: WriteComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'login', component: AuthComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'verify-email-address',
    component: VerifyEmailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-blog/:id',
    component: UserBlogComponent,
    canActivate: [AuthGuard],
  },
  { path: 'user-view-profile/:id', component: UserProfileComponent },
  { path: 'single-blog/:id', component: SingleBlogComponent },
  // { path: 'user-view-profile/:id', component: UserViewProfileComponent},
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
