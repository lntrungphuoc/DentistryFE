import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EHealthBookDetail } from "../entities/eHealthBookDetail";

@Injectable({
    providedIn: 'root',
})

export class EHealthBookDetailService {
    constructor(private http: HttpClient) {}

    create(eHealthBookDetail: EHealthBookDetail) {
        return this.http.post("https://localhost:7011/eHealthBookDetail/create", eHealthBookDetail);
    }

    update(eHealthBookDetail: EHealthBookDetail) {
        return this.http.put("https://localhost:7011/eHealthBookDetail/update", eHealthBookDetail);
    }

    getListDetailByEBookID(id: number): Observable<EHealthBookDetail[]> {
        return this.http.get<EHealthBookDetail[]>("https://localhost:7011/eHealthBookDetail/" + id);
    }

    delete(id: number) {
        return this.http.delete("https://localhost:7011/eHealthBookDetail/delete?id=" + id);
    }
}