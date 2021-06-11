import { WriteComponent } from './write/write.component';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ArticleComponent },
  { path: 'write', component: WriteComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }