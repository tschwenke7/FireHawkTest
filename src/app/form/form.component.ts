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

  //show/hide study location field when isStudent radio buttons are clicked.
  selectIsStudent(event: any){
    if(event.target.value == "yes"){
      this.studyLocationVisible = true;
      //enable required validator
      this.studyLocation?.setValidators(Validators.required);
      this.studyLocation?.updateValueAndValidity();
    }
    else {
      this.studyLocationVisible = false;
      this.studyLocation?.clearValidators();
      this.studyLocation?.updateValueAndValidity();
    }
  }

  onSubmit() {
    //mark all fields as touched to trigger 'required' validation messages
    this.userForm.markAllAsTouched();



    //block submission of form if validation has failed
    if(!this.formResponsesService.userForm.valid) {
      this.submissionMessage = "Error - One or more fields of this form need your attention before you can submit.";
    }
    //if form was valid, send response to db
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
      })
      //display error if db couldn't be reached
      .catch(err => {
        this.submissionMessage = "Error - could not reach database. Please try again later";
      })
    }
  }

  submissionMessage: string = "";

  constructor(formResponsesService: FormResponsesService, cookieService: CookieService) {
    super(cookieService, "form");
    this.formResponsesService = formResponsesService;
  }

  formResponsesService: FormResponsesService;

  ngOnInit() {
    super.ngOnInit();
  }

  get firstName() { return this.formResponsesService.userForm.get('firstName')}

  get lastName() { return this.formResponsesService.userForm.get('lastName')}

  get email() { return this.formResponsesService.userForm.get('email')}

  get isStudent() { return this.formResponsesService.userForm.get('isStudent')}

  get studyLocation() { return this.formResponsesService.userForm.get('studyLocation')}

  get userForm() { return this.formResponsesService.userForm }
}
