import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Clinic } from '../entities/clinic';
import { PriceList } from '../entities/priceList';
import { Service } from '../entities/service';
import { ClinicService } from '../services/clinicService';
import { PriceListService } from '../services/priceListService';
import { ServiceService } from '../services/serviceService';
import { Customer } from '../entities/customer';
import { CustomerService } from '../services/customerService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  services: Service[];
  priceLists: PriceList[];
  fullName: string;
  customer: Customer;
  oldPassword: string = '';
  password: string = '';
  confirmPassword: string = '';
  responseMessage: string = '';
  checkOldPassword: boolean = true;
  @ViewChild('closeChangePasswordButton') closeChangePasswordButton;

  constructor(private router: Router,
    private serviceService: ServiceService,
    private priceListService: PriceListService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    // if (this.isUserAuthenticated) {
    //   this.customer = JSON.parse(localStorage.getItem("customer"));
    //   // this.password = this.confirmPassword = this.customer.password;
    //   this.oldPassword = this.customer.password;
    // }
    this.getPriceList();
    this.getService();
  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("customer");
    if (token) {
      this.customer = JSON.parse(localStorage.getItem("customer"));
      return true;
    }
    return false;
  }

  getService(): void {
    this.serviceService.getAll().subscribe(
      (data) => {
        this.services = data;
      },
      (error) => console.log(error)
    );
  }

  getPriceList(): void {
    this.priceListService.getAll().subscribe(
      (data) => {
        this.priceLists = data;
      },
      (error) => console.log(error)
    )
  }

  onClick() {
    if (localStorage.getItem('customer') != null) {
      this.router.navigateByUrl("so-suc-khoe");
    }
    else {
      this.router.navigateByUrl("dang-nhap")
    }
  }

  dangXuat() {
    localStorage.removeItem('customer');
    this.router.navigate(['']);
  }

  loadCustomer() {
    // console.log(this.customer)
    // this.customerService.login(this.customer.phoneNumber, this.customer.password).subscribe((res: any) => this.customer = res.data);
    localStorage.removeItem('customer');
    localStorage.setItem('customer', JSON.stringify(this.customer));
    this.checkOldPassword = true;
  }

  changePassword(form) {
    if (this.oldPassword != this.customer.password) {
      this.checkOldPassword = false;
    } else {
      this.customer.password = this.password;
      this.loadCustomer();
      this.customerService.update(this.customer).subscribe(res => {
        this.responseMessage = res.message;
        this.closeChangePasswordModal();
        form.reset();
        this.showResponseModal();
      });
    }
    
  }

  checkConfirmPassword(): boolean {
    if (this.password != this.confirmPassword)
      return false;
    return true;
  }

  closeChangePasswordModal() {
    this.closeChangePasswordButton.nativeElement.click();
  }


  showResponseModal() {
    document.getElementById("openModalButton").click();
  }

  topFunction() {
    document.getElementById('top').scrollIntoView();
  }
}
