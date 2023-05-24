import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { News } from '../entities/news';
import { NewsService } from '../services/newsService';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  url: string;
  news: News;

  constructor(private route: ActivatedRoute,
              private newsService: NewsService,
              private router: Router) { 
                this.router.routeReuseStrategy.shouldReuseRoute = function () {
                  return false;
                };
            
                this.router.events.subscribe((evt) => {
                  if (evt instanceof NavigationEnd) {
                    // trick the Router into believing it's last link wasn't previously loaded
                    this.router.navigated = false;
                    // if you need to scroll back to top, here is the right place
                    window.scrollTo(0, 0);
                  }
                });
              }

  ngOnInit(): void {
    this.url = this.route.snapshot.params['url'];
    this.newsService.getByURL(this.url).subscribe(
      (data) => {
        this.news = data;
      },
      (error) => console.log(error)
    );
  }

}
