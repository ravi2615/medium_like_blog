import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articles=[];
  constructor() { 
    this.articles.push(JSON.parse(localStorage.getItem('html')));
    console.log(this.articles[0][0])
    console.log(this.articles[0][1])
  }

  ngOnInit(): void {

  }

}
