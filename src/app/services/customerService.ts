import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Customer } from "../entities/customer";
import { ResponseData } from "./responseData";

@Injectable({
    providedIn: 'root',
})

export class CustomerService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<Customer[]> {
        return this.http.get<Customer[]>("https://localhost:7011/customer");
    }

    login(phoneNumber: string, password: string) {
        var loginRequest = {
            phoneNumber: phoneNumber,
            password: password
        }
        return this.http.post("https://localhost:7011/customer/login", loginRequest);
    }

    create(customer: Customer) {
        return this.http.post("https://localhost:7011/customer/create", customer);
    }

    update(customer: Customer): Observable<ResponseData> {
        return this.http.put<ResponseData>("https://localhost:7011/customer/update", customer);
    }

    delete(id: number) {
        return this.http.delete("https://localhost:7011/customer/delete?id=" + id);
    }
}