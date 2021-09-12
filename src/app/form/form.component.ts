import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormResponsesService } from '../form-responses.service';
import { FormResponse } from '../models/formResponse';
import { CookieService } from 'ngx-cookie-service';
import { AccordionComponent } from '../accordion.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends AccordionComponent implements OnInit  {

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

  accordionHeadingText = "Let's Get In Touch";

  submissionMessage: string = "";

  constructor(formResponsesService: FormResponsesService, cookieService: CookieService) {
    super(cookieService);
    this.formResponsesService = formResponsesService;
  }

  formResponsesService: FormResponsesService;

  ngOnInit() {
    super.ngOnInit();
  }

}
