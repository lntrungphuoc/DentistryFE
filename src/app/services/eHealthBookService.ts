import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EHealthBook } from "../entities/eHealthBook";

@Injectable({
    providedIn: 'root',
})

export class EHealthBookService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<EHealthBook[]> {
        return this.http.get<EHealthBook[]>("https://localhost:7011/eHealthBook");
    }

    getByIdUser(id: number) {
        return this.http.get("https://localhost:7011/eHealthBook/" + id);
    }

    getById(id: number): Observable<EHealthBook> {
        return this.http.get<EHealthBook>("https://localhost:7011/eHealthBook/getById?id=" + id);
    }

    create(eHealthBook: EHealthBook) {
        return this.http.post("https://localhost:7011/eHealthBook/create", eHealthBook);
    }

    update(eHealthBook: EHealthBook) {
        return this.http.put("https://localhost:7011/eHealthBook/update", eHealthBook);
    }

    delete(id: number) {
        return this.http.delete("https://localhost:7011/eHealthBook/delete?id=" + id);
    }
}