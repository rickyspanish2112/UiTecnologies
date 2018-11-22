import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'app';

  account: any;

  mask:string = "(999) 000-00-00-00";
   listItems: Array<string>; 
   opened: boolean = false;
  
  //["No title", "Dr", "Miss", "Mr", "Mrs", "Ms"];

 ngOnInit(){
   this.account =  {
      shortCode: "APIClient001",
      accountNumber: "1234567",
      externalId: "extId",
      accountName: "API CLIENT",
      mainTelephone: "3234234",
      fax: "R U Joking",
      countryCode: "GB",
      country: "United Kingdom",
      tin: "GB685803794000",
      website: "www.apiclient.com",
      createdBy: "api",
      description: "Test Api Client",
      street1: "Ashford House",
      street2: "41-45 Church Road",
      town: "Ashford",
      county: "Middlesex",
      postcode: "TW15 2TQ",
      firstName: "Joe",
      lastName: "Bloggs",
      jobTitle: "National Accountability Manager",
      telephone: "234345345",
      mobile: "4534345345",
      email: "joe.bloggs@asm.org.uk",
      notes: "important info goes here",
      exportAccount: true,
      importAccount: false,
      customer: true,
      supplier: true,
      prospect: true,
      invoicee:false,
      collection: true,
      delivery: true,
      airwaybill: true,
      warehouse: true,
      invoice: true,
      consignee: true,
      shipper: true,
      airlineMesaging: false,
      oceanDocument: true,
      activationDate: new Date(2018,10,23)


   }

   this.listItems=["No title", "Dr", "Miss", "Mr", "Mrs", "Ms"];
 }
 public close() {
  this.opened = false;
}

public open() {
  this.opened = true;
}

}
