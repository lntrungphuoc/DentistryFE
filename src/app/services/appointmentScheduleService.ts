import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { AppointmentSchedule } from "../entities/appointmentSchedule";
import { AppointmentScheduleRequest } from "../entities/appointmentScheduleRequest";

@Injectable({
    providedIn: 'root',
})

export class AppointmentScheduleService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<AppointmentSchedule[]> {
        return this.http.get<AppointmentSchedule[]>("https://localhost:7011/appointment-schedule");
    }

    create(appointmentSchedule: AppointmentScheduleRequest) : Observable<any> {
        const headers: HttpHeaders = new  HttpHeaders();
        headers.set("Content-Type", "application/json;");
        // var body = JSON.stringify(appointmentSchedule)
        var body = {
                    idClinic: appointmentSchedule.idClinic,
                    name: appointmentSchedule.name,
                    phoneNumber: appointmentSchedule.phoneNumber,
                    date: appointmentSchedule.date,
                    time: appointmentSchedule.time,
                    content: appointmentSchedule.content
                }
        return this.http.post<any>("https://localhost:7011/appointment-schedule/create", body, { headers: headers });
    }

    update(appointmentSchedule: AppointmentSchedule) {
        return this.http.put("https://localhost:7011/appointment-schedule/update", appointmentSchedule);
    }

    delete(id: number) {
        return this.http.delete("https://localhost:7011/appointment-schedule/delete?id=" + id);
    }
}