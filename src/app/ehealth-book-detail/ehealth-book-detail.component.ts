import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clinic } from '../entities/clinic';
import { Customer } from '../entities/customer';
import { EHealthBook } from '../entities/eHealthBook';
import { EHealthBookDetail } from '../entities/eHealthBookDetail';
import { EHealthBookDetailService } from '../services/eHealthBookDetailService';
import { EHealthBookService } from '../services/eHealthBookService';
import { Attachment } from '../entities/attachment';
import { AttachmentService } from '../services/attachmentService';

@Component({
  selector: 'app-ehealth-book-detail',
  templateUrl: './ehealth-book-detail.component.html',
  styleUrls: ['./ehealth-book-detail.component.css']
})
export class EHealthBookDetailComponent implements OnInit {
  eHealthBookDetails: EHealthBookDetail[];
  idEHealthBook: number;
  eHealthBook: EHealthBook = new EHealthBook();
  listAttachmentDownload: Attachment[];

  constructor(private route: ActivatedRoute,
              private eHealthBookDetailService: EHealthBookDetailService,
              private attachmentService: AttachmentService) { }

  ngOnInit(): void {
    this.idEHealthBook = this.route.snapshot.params['id'];
    this.eHealthBookDetailService.getListDetailByEBookID(this.idEHealthBook).subscribe((res) => {
      this.eHealthBookDetails = res
    })
  }

  getListAttachment(i: number) {
    this.listAttachmentDownload = [];
    this.listAttachmentDownload = this.eHealthBookDetails[i].attachments;
  }

  downloadAttachment(url: string, name: string) {
    this.attachmentService.download(url, name);
  }

  viewAttachment(url: string) {
    window.open(url);
  }

}
