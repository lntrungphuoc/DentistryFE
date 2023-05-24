import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PriceList } from '../entities/priceList';
import { PriceListService } from '../services/priceListService';
import { Clinic } from '../entities/clinic';
import { ClinicService } from '../services/clinicService';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {
  priceList: PriceList;
  url: string;
  listClinic: Clinic[];

  constructor(private route: ActivatedRoute,
              private priceListService: PriceListService,
              private router: Router,
              private clinicService: ClinicService,
              private sanitizer: DomSanitizer) {
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
    this.priceListService.getByURL(this.url).subscribe(
      (data) => {
        this.priceList = data;
      },
      (error) => console.log(error)
    );
    this.clinicService.getAll().subscribe(data => this.listClinic = data);
  }

  datLich(): void {
    this.router.navigateByUrl("/dat-lich")
  }

  public createTrustedHtml(blogContent: string) {
    return this.sanitizer.bypassSecurityTrustHtml(blogContent);
  }

}
