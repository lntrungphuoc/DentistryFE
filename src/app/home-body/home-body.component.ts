import { Component, OnInit } from '@angular/core';
import { Clinic } from '../entities/clinic';
import { Doctor } from '../entities/doctor';
import { ClinicService } from '../services/clinicService';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.css']
})
export class HomeBodyComponent implements OnInit {

  clinics: Clinic[];
  
  constructor(private clinicService: ClinicService) { }

  ngOnInit(): void {
    this.getClinic();
  }

  getClinic(): void {
    this.clinicService.getAll().subscribe(
      (data) => {
        this.clinics = data;
      },
      (error) => console.log(error)
    );
  }

}
