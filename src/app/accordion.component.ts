import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-accordion',
    template: ""
})
export class AccordionComponent implements OnInit {


    //properties to be specified in inheriting components
    accordionHeadingText?: string;
    cookieSuffix?: string;
  
  panelMaxHeightOpen: string = "100%";
  panelMaxHeightClosed: string = "0";
  accordionOpenSymbol: string = "⯆ ";
  accordionClosedSymbol: string = "⯈ "

  //set this from cooking on page load
  accordionOpen?: boolean;
  accordionHeading?: string;
  panelMaxHeight?: string;

  constructor(private cookieService: CookieService){}

  ngOnInit() {
    let cookieValue = this.cookieService.get('accordion-open-' + this.cookieSuffix);
    console.warn(cookieValue);
    if(cookieValue == "true"){
      this.accordionOpen = true;
      //remove max height restriction
      this.panelMaxHeight = this.panelMaxHeightOpen
      //change arrow to open arrow
      this.accordionHeading = this.accordionOpenSymbol + this.accordionHeadingText;
    }
    else {
      this.accordionOpen = false;
      //set max height to 0
      this.panelMaxHeight = this.panelMaxHeightClosed;
      //change arrow to closed arrow
      this.accordionHeading = this.accordionClosedSymbol + this.accordionHeadingText;
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
    this.cookieService.set('accordion-open-' + this.cookieSuffix, String(this.accordionOpen), 30);
  }

}