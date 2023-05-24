import { Component, OnInit } from '@angular/core';
import { Doctor } from '../entities/doctor';
import { DoctorService } from '../services/doctorService';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  doctors: Doctor[];

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.getDoctor()
  }

  getDoctor(): void {
    this.doctorService.getAll().subscribe(
      (data) => {
        this.doctors = data;
        console.log(this.doctors)
      },
      (error) => console.log(error)
    );
  }

}
