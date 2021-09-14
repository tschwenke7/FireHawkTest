
/**
 * This component include behaviour to open and close a single "accordion" style UI in a component.
 * The accordion's open/closed status wil persist accross reloads using a cookie.
 * In an extedning component, you will need to provide:
 * - values for the constructor arguments
 *      - 'cookieSuffix?: string': a string not used by any other extending class to uniquely
 *           identify this component's accordion cookie
 * - implement 'OnInit' and call 'super.onInit()' within that method.
 * - constructor which includes a "CookieService" parameter which is passed in as 
 *      an argument to a "super(cookieService, ...)" call in the constructor.
 * - in template:
 *      - to button of class "accordion-button", add: [ngClass]="{'collapsed' : !accordionOpen}" [attr.aria-expanded]="accordionOpen"  
 *      - to div that has class "accordion-collpase", add: [ngClass]="{'show' : accordionOpen}" 
 */
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Inject } from '@angular/core';

@Component({
    selector: 'app-accordion',
    template: ""
})
export class AccordionComponent implements OnInit {


  //set this from cookie on page load
  accordionOpen: boolean = true;

  private cookieName: string;

  constructor(private cookieService: CookieService, @Inject(String) cookieSuffix: string){
      //set cookie name
      this.cookieName = 'accordion-open-' + cookieSuffix;
  }

  ngOnInit(){
    //set accordion's initial status based on cookie value, if available
    let cookieValue = this.cookieService.get(this.cookieName);
    //if cookie found and open status is set to false, close accordion
    if(cookieValue == "false"){
        this.accordionOpen = false;
    }
    //if cookie not found or value is true/not false, open accordion
    else {
      this.accordionOpen = true;
    }
  }

  onAccordionClick() {
    //flip accordion flag and update cookie
    this.cookieService.set(this.cookieName, String(!this.accordionOpen), 30);
    console.warn(this.accordionOpen);
  }
}