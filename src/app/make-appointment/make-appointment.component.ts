import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentSchedule } from '../entities/appointmentSchedule';
import { AppointmentScheduleRequest } from '../entities/appointmentScheduleRequest';
import { Clinic } from '../entities/clinic';
import { AppointmentScheduleService } from '../services/appointmentScheduleService';
import { ClinicService } from '../services/clinicService';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as CKEditor from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.css']
})
export class MakeAppointmentComponent implements OnInit {
  clinics: Clinic[];
  public Editor = CKEditor;
  ckeConfig: any;

  appointmentSchedule = new AppointmentScheduleRequest();
  constructor(private clinicService: ClinicService,
              private appointScheduleService: AppointmentScheduleService,
              private router: Router) { }

  ngOnInit(): void {
    this.getClinic();
    
    this.ckeConfig = {
      uiColor: '#f4f9fc',
      extraPlugins: 'uploadimage',
      uploadUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',

      // Configure your file manager integration. This example uses CKFinder 3 for PHP.
      filebrowserBrowseUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html',
      filebrowserImageBrowseUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
      filebrowserUploadUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files',
      filebrowserImageUploadUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Images'
    };
  }

  getClinic(): void {
    this.clinicService.getAll().subscribe(
      (data) => {
        this.clinics = data;
      },
      (error) => console.log(error)
    )
  }

  onSubmit(data) {
    this.appointmentSchedule.idClinic = data.clinic;
    this.appointmentSchedule.date = data.date;
    var strDate = data.date.toString()+"T"+data.time+":00.0000000";
    this.appointmentSchedule.time = new Date(strDate);
    this.appointmentSchedule.name = data.name;
    this.appointmentSchedule.phoneNumber = data.phoneNumber;
    this.appointmentSchedule.content = data.content;
    // console.log(this.appointmentSchedule);
    this.appointScheduleService.create(this.appointmentSchedule).subscribe((response: any) => {
      console.log(response);
    });
    this.router.navigateByUrl("/xac-nhan");
  }

}
