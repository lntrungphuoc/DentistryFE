import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { PriceListComponent } from './price-list/price-list.component';
import { DoctorComponent } from './doctor/doctor.component';
import { FooterComponent } from './footer/footer.component';
import { HomeBodyComponent } from './home-body/home-body.component';
import { ListNewsComponent } from './list-news/list-news.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { ConfirmAppointmentComponent } from './confirm-appointment/confirm-appointment.component';
import { LoginComponent } from './login/login.component';
import { EHealthBookComponent } from './e-health-book/e-health-book.component';
import { EHealthBookDetailComponent } from './ehealth-book-detail/ehealth-book-detail.component';
import { DotorDetailComponent } from './dotor-detail/dotor-detail.component';

const appRoutes: Routes = [
  {path: '', component: HomeBodyComponent},
  {path: 'bac-si', component: DoctorComponent},
  {path: 'bac-si/:id', component: DotorDetailComponent},
  {path: 'dich-vu/:url', component: OurServicesComponent},
  {path: 'bang-gia/:url', component: PriceListComponent},
  {path: 'tin-tuc', component: ListNewsComponent},
  {path: 'tin-tuc/:url', component: NewsDetailComponent},
  {path: 'dat-lich', component: MakeAppointmentComponent},
  {path: 'xac-nhan', component: ConfirmAppointmentComponent},
  {path: 'dang-nhap', component: LoginComponent},
  {path: 'so-suc-khoe', component: EHealthBookComponent},
  {path: 'chi-tiet-so-suc-khoe/:id', component: EHealthBookDetailComponent},
  {path: 'header', component: HeaderComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MakeAppointmentComponent,
    OurServicesComponent,
    PriceListComponent,
    DoctorComponent,
    FooterComponent,
    HomeBodyComponent,
    ListNewsComponent,
    NewsDetailComponent,
    ConfirmAppointmentComponent,
    LoginComponent,
    EHealthBookComponent,
    EHealthBookDetailComponent,
    DotorDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    CKEditorModule
  ],
  providers: [HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
