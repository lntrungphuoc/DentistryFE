import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Clinic } from '../entities/clinic';
import { Service } from '../entities/service';
import { ClinicService } from '../services/clinicService';
import { ServiceService } from '../services/serviceService';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css']
})
export class OurServicesComponent implements OnInit {
  url: string;
  service: Service;
  listClinic: Clinic[];

  constructor(private route: ActivatedRoute,
    private serviceService: ServiceService,
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
    this.serviceService.getByURL(this.url).subscribe(
      (data) => {
        this.service = data;
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
