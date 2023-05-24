import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})

export class AttachmentService {
    constructor(private http: HttpClient) { }

    download(img, name) {
        const imgUrl = img;
        const imgName = name;
        this.http
          .get(imgUrl, { responseType: "blob" as "json", headers : { "Content-Type": "application/x-www-form-urlencoded"} })
          .subscribe((res: any) => {
            const file = new Blob([res], { type: res.type });
    
            // IE
            // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            //   window.navigator.msSaveOrOpenBlob(file);
            //   return;
            // }
    
            const blob = window.URL.createObjectURL(file);
            const link = document.createElement("a");
            link.href = blob;
            link.download = imgName;
    
            // Version link.click() to work at firefox
            link.dispatchEvent(
              new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window
              })
            );
    
            setTimeout(() => {
              // firefox
              window.URL.revokeObjectURL(blob);
              link.remove();
            }, 100);
          });
      }
}