import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../entities/customer';
import { EHealthBook } from '../entities/eHealthBook';
import { Service } from '../entities/service';
import { EHealthBookService } from '../services/eHealthBookService';
import { EHealthBookServiceService } from '../services/eHealthBookServiceService';
import { ServiceService } from '../services/serviceService';

@Component({
  selector: 'app-e-health-book',
  templateUrl: './e-health-book.component.html',
  styleUrls: ['./e-health-book.component.css']
})
export class EHealthBookComponent implements OnInit {
  eHealthBook: EHealthBook[];
  customer: Customer;
  idEHealthBook: number;

  constructor(private eHealthBookService: EHealthBookService,
              private router: Router,
              private eHealthBookServiceService: EHealthBookServiceService) { }

  ngOnInit(): void {
    this.customer = JSON.parse(localStorage.getItem("customer"));
    this.eHealthBookService.getByIdUser(this.customer.id).subscribe((response: any) => {
      this.eHealthBook = response;
      console.log(this.eHealthBook)
    });
  }

  eHealthBookDetail(i: number) {
    this.idEHealthBook = this.eHealthBook[i].id;
    this.router.navigateByUrl("chi-tiet-so-suc-khoe/" + this.idEHealthBook);
  }

}
