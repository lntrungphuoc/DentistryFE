import { Component, OnInit } from '@angular/core';
import { News } from '../entities/news';
import { NewsService } from '../services/newsService';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit {
  newsList: News[];
  top3NewsList: News[];
  searchList: News[];
  searchKey: string = '';

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getForWeb().subscribe(
      (data) => {
        this.newsList = data;
        this.searchList = data;
        // console.log(this.newsList)
      },
      (error) => console.log(error)
    );

    this.newsService.getTop3().subscribe(
      (data) => {
        this.top3NewsList = data;
        // console.log(this.top3NewsList)
      },
      (error) => console.log(error)
    );
  }

  timKiem() {
    if (this.searchKey == '') {
      this.searchList = this.newsList;
    } else {
      console.log('key:'+this.searchKey)
      this.searchList = this.newsList.filter(x => x.title.toLowerCase().includes(this.searchKey.toLowerCase()));
      console.log(this.searchList)
    }
    
  }

}
