import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { FormResponsesService } from '../form-responses.service';
import { FormResponse } from '../models/formResponse';
import { AccordionComponent } from '../accordion.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent extends AccordionComponent implements OnInit {
  formResponsesService: FormResponsesService;
  allResponses: FormResponse[] = [];

  constructor(formResponsesService: FormResponsesService, cookieService: CookieService) {
    super(cookieService, "responses-table");
    this.formResponsesService = formResponsesService;
  }

  ngOnInit() {
    super.ngOnInit();
    this.formResponsesService.responses$.subscribe
      (res => this.allResponses = res);
  }
}
