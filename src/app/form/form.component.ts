import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormResponsesService } from '../form-responses.service';
import { FormResponse } from '../models/formResponse';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  studyLocationVisible: boolean = false;

  selectIsStudent(event: any){
    if(event.target.value == "yes"){
      this.studyLocationVisible = true;
    }
    else {
      this.studyLocationVisible = false;
    }
  }

  onSubmit() {
    //block submission of form if validation has failed
    if(!this.formResponsesService.userForm.valid) {
      this.submissionMessage = "Error - One or more fields of this form need your attention before you can submit.";
    }
    else{
      let formContents = this.formResponsesService.userForm.value;
      let data: FormResponse = {
        firstName: formContents.firstName,
        lastName: formContents.lastName,
        email: formContents.email,
        isStudent: formContents.isStudent
      }
  
      //only add value of studyLocation if isStudent was actually set to 'yes' at time of form submission
      if(formContents.isStudent == 'yes') {
        data.studyLocation = formContents.studyLocation;
      }
  
      //save form response to db
      this.formResponsesService.insertResponse(data).toPromise()
      .then(res => {
        this.submissionMessage = "Form submitted successfully. Thanks for getting in touch!";
        this.formResponsesService.userForm.reset();
        console.warn(data);
      })
      //display error if db couldn't be reached
      .catch(err => {
        this.submissionMessage = "Error - could not reach database. Please try again later";
      })
    }
  }

  
  panelMaxHeightOpen: string = "100%";
  panelMaxHeightClosed: string = "0";
  accordionHeadingOpen: string = "⯆ Let's Get In Touch";
  accordionHeadingClosed: string = "⯈ Let's Get In Touch";

  //set this from cooking on page load
  accordionOpen?: boolean;
  accordionHeading?: string;
  panelMaxHeight?: string;

  onAccordionClick() {
    //if accordion is in closed state, open it
    if(this.accordionOpen == false) {
      //remove max height restriction
      this.panelMaxHeight = this.panelMaxHeightOpen
      //change arrow to open arrow
      this.accordionHeading = this.accordionHeadingOpen;
    }

    //otherwise it is in open state, so close it
    else{
      //set max height to 0
      this.panelMaxHeight = this.panelMaxHeightClosed;
      //change arrow to closed arrow
      this.accordionHeading = this.accordionHeadingClosed;
    }

    //flip accordion flag and update cookie
    this.accordionOpen = !this.accordionOpen;
    this.cookieService.set('accordion-open-form', String(this.accordionOpen), 30);
  }

  submissionMessage: string = "";

  constructor(formResponsesService: FormResponsesService, private cookieService: CookieService) {
    this.formResponsesService = formResponsesService;
  }

  formResponsesService: FormResponsesService;

  ngOnInit() {
    let cookieValue = this.cookieService.get('accordion-open-form');
    console.warn(cookieValue);
    if(cookieValue == "true"){
      this.accordionOpen = true;
      //remove max height restriction
      this.panelMaxHeight = this.panelMaxHeightOpen
      //change arrow to open arrow
      this.accordionHeading = this.accordionHeadingOpen;
    }
    else {
      this.accordionOpen = false;
      //set max height to 0
      this.panelMaxHeight = this.panelMaxHeightClosed;
      //change arrow to closed arrow
      this.accordionHeading = this.accordionHeadingClosed;
    }
  }

}
