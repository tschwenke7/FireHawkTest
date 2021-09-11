import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { FormResponsesService } from '../form-responses.service';
import { FormResponse } from '../models/formResponse';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  formResponsesService: FormResponsesService;
  allResponses: FormResponse[] = [];

  constructor(formResponsesService: FormResponsesService) {
    this.formResponsesService = formResponsesService;
  }


  ngOnInit() {
    this.formResponsesService.responses$.subscribe
      (res => this.allResponses = res);
  }
}
