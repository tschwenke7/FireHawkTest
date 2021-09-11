import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { FormResponse } from './models/formResponse';

@Injectable({
  providedIn: 'root'
})
export class FormResponsesService {

  constructor(private fb: FormBuilder, private firestore: AngularFirestore) {
    this.formResponsesCollection = firestore.collection<FormResponse>('formResponses');
    this.responses$ = this.formResponsesCollection.valueChanges();
   }

  private formResponsesCollection: AngularFirestoreCollection<FormResponse>;
  responses$: Observable<FormResponse[]>

  userForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required, Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    isStudent: ['', [Validators.required]],
    studyLocation: ['']
  });

  insertResponse(data: FormResponse) {
    return from(this.formResponsesCollection.add(data));
    // return new Promise<any>((resolve, reject) => {
    //   this.firestore
    //   .collection("formResponses")
    //   .add(data)
    //   .then((res) => {resolve(res)}, (err: any) => reject(err))
    // })
  }
}
