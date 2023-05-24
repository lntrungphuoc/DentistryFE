import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CustomerService } from '../services/customerService';
import { EHealthBookService } from '../services/eHealthBookService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFail = false;

  constructor(private customerService: CustomerService,
              private router: Router) { }

  ngOnInit(): void {
  }

  isLogInFail() {
    return this.loginFail;
  }

  login(data) {
    this.customerService.login(data.phoneNumber, data.password).subscribe((response: any) => {
      // console.log(response);
      if (response.data != null) {
        localStorage.setItem('customer', JSON.stringify(response.data));
        this.router.navigateByUrl("so-suc-khoe");
      } else {
        this.loginFail = true;
      }
    });
  }

}
