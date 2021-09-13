
/**
 * This component include behaviour to open and close a single "accordion" style UI in a component.
 * The accordion's open/closed status wil persist accross reloads using a cookie.
 * In an extedning component, you will need to provide:
 * - values for the constructor arguments
 *      - 'accordionHeadingText: string': The heading to display in the top of the accordion.
 *      - 'cookieSuffix?: string': a string not used by any other extending class to uniquely
 *           identify this component's accordion cookie
 * - implement 'OnInit' and call 'super.onInit()' within that method.
 * - constructor which includes a "CookieService" parameter which is passed in as 
 *      an argument to a "super(cookieService, ...)" call in the constructor. 
 * - in your component's template, you should include the following structure:
 *      <div class="accordion" (click)="onAccordionClick()">
            <h2>{{ accordionHeading }}</h2>
            ...(optionally more content, visible even when accordion is closed)
        </div>
        <div class="panel" [style.maxHeight]="panelMaxHeight">
            ...(expanded content)
        </div>
 */
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Inject } from '@angular/core';

@Component({
    selector: 'app-accordion',
    template: ""
})
export class AccordionComponent implements OnInit {


  /*properties to be specified in inheriting components in constructor*/
  accordionHeadingText: string;

  /*fixed properties*/
  panelMaxHeightOpen: string = "100%";
  panelMaxHeightClosed: string = "0";
  accordionOpenSymbol: string = "⯆ ";
  accordionClosedSymbol: string = "⯈ "

  //set this from cookie on page load
  private accordionOpen: boolean = true;
  accordionHeading?: string;
  panelMaxHeight?: string;

  private cookieName: string;

  constructor(private cookieService: CookieService, @Inject(String) accordionHeadingText: string, @Inject(String) cookieSuffix: string){
      //set heading text
      this.accordionHeadingText = accordionHeadingText;
      //set cookie name
      this.cookieName = 'accordion-open-' + cookieSuffix;
  }

  ngOnInit() {
    //set accordion's initial status based on cookie value, if available
    let cookieValue = this.cookieService.get(this.cookieName);
    
    //if cookie found and open status is set to false, close accordion
    if(cookieValue == "false"){
        this.accordionOpen = false;
        //set max height to 0
        this.panelMaxHeight = this.panelMaxHeightClosed;
        //change arrow to closed arrow
        this.accordionHeading = this.accordionClosedSymbol + this.accordionHeadingText;
    }
    //if cookie not found or value is true/not false, open accordion
    else {
      this.accordionOpen = true;
      //remove max height restriction
      this.panelMaxHeight = this.panelMaxHeightOpen
      //change arrow to open arrow
      this.accordionHeading = this.accordionOpenSymbol + this.accordionHeadingText;
    }
  }

  onAccordionClick() {
    //if accordion is in closed state, open it
    if(this.accordionOpen == false) {
      //remove max height restriction
      this.panelMaxHeight = this.panelMaxHeightOpen
      //change arrow to open arrow
      this.accordionHeading = this.accordionOpenSymbol + this.accordionHeadingText;
    }

    //otherwise it is in open state, so close it
    else{
      //set max height to 0
      this.panelMaxHeight = this.panelMaxHeightClosed;
      //change arrow to closed arrow
      this.accordionHeading = this.accordionClosedSymbol + this.accordionHeadingText;
    }

    //flip accordion flag and update cookie
    this.accordionOpen = !this.accordionOpen;
    this.cookieService.set(this.cookieName, String(this.accordionOpen), 30);
  }

}