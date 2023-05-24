import { Component, OnInit } from '@angular/core';
import { Doctor } from '../entities/doctor';
import { DoctorService } from '../services/doctorService';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dotor-detail',
  templateUrl: './dotor-detail.component.html',
  styleUrls: ['./dotor-detail.component.css']
})
export class DotorDetailComponent implements OnInit {
  id: number;
  doctor: Doctor;

  constructor(private route: ActivatedRoute,
              private doctorService: DoctorService,
              private router: Router,
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
    this.id = this.route.snapshot.params['id'];
    this.doctorService.getById(this.id).subscribe((res) => {
      this.doctor = res;
      console.log(res)
    });
  }

  datLich(): void {
    this.router.navigateByUrl("/dat-lich")
  }

  public createTrustedHtml(blogContent: string) {
    return this.sanitizer.bypassSecurityTrustHtml(blogContent);
  }

}
