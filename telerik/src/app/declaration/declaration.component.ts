import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GridComponent } from '@progress/kendo-angular-grid';
import {Types} from './types';
import  {Declaration, Container, AuthHolder}  from './declaration.model';
import {JsonPipe} from '@angular/common';


@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.css']
})
export class DeclarationComponent implements OnInit {

  declarationTypes= Types.declarationTypes;
  authorisationHolderTypes = Types.authorisationHolderTypes;
  badges=["badge1", "badge2", "badge3"]
  exporters=['ASM', 'Corleone','Towers', 'Kodak', 'LaTrading', 'Worm', 'MilFodMou', 'AviallBulk']
  importers=['ASM', 'Corleone','Towers', 'Kodak', 'LaTrading', 'Worm', 'MilFodMou', 'AviallBulk']
  declarants=['ASM', 'Corleone','Towers', 'Kodak', 'LaTrading', 'Worm', 'MilFodMou', 'AviallBulk']
  sellers=['ASM', 'Corleone','Towers', 'Kodak', 'LaTrading', 'Worm', 'MilFodMou', 'AviallBulk']
  buyers=['ASM', 'Corleone','Towers', 'Kodak', 'LaTrading', 'Worm', 'MilFodMou', 'AviallBulk']
  representatives=['ASM', 'Corleone','Towers', 'Kodak', 'LaTrading', 'Worm', 'MilFodMou', 'AviallBulk']

  statuses=["2 - Direct", "3 - Indirect"]

  countries = ["Kuwait", "Palau","South Africa", "Bolivia", "Turkmenistan", "Tonga", "China", "Serbia", "Nigeria", "Bangladesh", "Italy"]

  transportTypes = ["Name of sea-going vessel", "Wagon number", "IATA flight number", "Registration number of the road vehicle"]

  transactionTypes = ["Transactions involving actual or intended transfer of ownership", "Return and replacement of goods free of charge",
                      "Transactions involving transfer of ownership", "Operations with a view to processing under contract" ]


  transportModes = ["Maritime transport", "rail transport", "Road transport", "Air transport"]   
  
  
  deliveryTerms= ["Ex works", "Free carrier", "carriage paid to", "Delivered at terminal", "Free on board", "Cost and freight"]

  unCodes=["Juba", "Canterbury", "Las Palmas", "Tenerife","Kellinghusen", "Vernazza", "Motomachi", "Civate", "Grein"]

  currencies = ['NZD', 'AUD', 'USD', 'GBP', 'EUR', 'RMB', 'BYR']

  goodsLocations = ["DSA564DA"]
  codes=["T - PostalCode", "U - UN/LOCODE", "V - Customs office identifier", "W - GPS coordinates", "X - EORI number", "Y - Authorisation number", "Z - free text"]
  locations = ["A - Designated loc.", "B - Authorised place", "C - Approved place", "D - Other"]

  sites = ["site1", "site2", "site3"]
  offices = ["office1", "office2"]

  authorisationHolders= [{"type":"type1", "identifier":"1"}, {"type":"type2", "identifier":"2"}, {"type":"type3", "identifier":"3"}]
  containers=[{"containerId":"BICU1234565"}, {"containerId":"BIJ3434563"}]


  private createdItems: any[] = [];
  private updatedItems: any[] = [];
  private deletedItems: any[] = [];
  


  private editedRowIndex: number;
  private editedAuthHolder: AuthHolder;

  private editedContainer: Container;

  private showAuthorisationGrid:boolean = false
  private showContainerGrid:boolean = false
  showAuthorisationHolderTypes:boolean = false;
  
  private jsonPipe:JsonPipe = new JsonPipe();
  private declarationOutput:string = "";
  private declaration: Declaration = new Declaration();

  @ViewChild(GridComponent) grid: GridComponent;
  @ViewChild('authGrid') authGrid: GridComponent;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  public cellClickHandler({ sender, rowIndex, columnIndex, dataItem, isEdited }) {
    if (!isEdited) {
        sender.editCell(rowIndex, columnIndex,  this.formBuilder.group({'containerId': dataItem.containerId}) );
    }
}

public cellCloseHandler(args: any) {
    const { formGroup, dataItem } = args;

    if (!formGroup.valid) {
         // prevent closing the edited cell if there are invalid values.         
        args.preventDefault();
    } else if (formGroup.dirty) {
       Object.assign(dataItem, formGroup.value);
        //this.editService.update(dataItem);
        console.log("item updated")
        this.updatedItems.push(dataItem);
    }
}

public containerHasChanges(){
//  console.log ("in container has changes");
  return Boolean(this.createdItems.length || this.updatedItems.length || this.deletedItems.length);
}

public addContainerHandler({sender}, formInstance) {
 // formInstance.reset();
 // this.closeEditor(sender);
 console.log(sender);

  sender.addRow(new Container());
}

public cancelContainerHandler({ sender, rowIndex }) {
  sender.closeRow(rowIndex);
}

  public addHandler({sender}, formInstance) {
    console.log("in add handler");
    formInstance.reset();
    this.closeEditor(sender);

    sender.addRow(new AuthHolder());
  }

  public editHandler({sender, rowIndex, dataItem}) {
    this.closeEditor(sender);

    this.editedRowIndex = rowIndex;
    this.editedAuthHolder = Object.assign({}, dataItem);

    sender.editRow(rowIndex);
}

public saveContainerHandler({ sender, formGroup, rowIndex }) {
  console.log("in savecontainerhandler");
  console.log(formGroup);
  if (formGroup.valid) {
      //this.editService.create(formGroup.value);
    //  this.createdItems.push(formGroup.value);
   //   this.containers.push(formGroup.value);
      this.declaration.containers.push(formGroup.value);
      sender.closeRow(rowIndex);
  }
  // for(let i = 0; i < this.containers.length; i++) {
  //   this.grid.collapseRow(i);
  // }
}

public saveHandler({sender, rowIndex, dataItem, isNew}) {
  console.log("in save handler")
  //this.editService.save(dataItem, isNew);
  if (isNew)
    this.declaration.authorisationHolders.push(dataItem);

  sender.closeRow(rowIndex);

  this.editedRowIndex = undefined;
  this.editedAuthHolder = undefined;
}
public cancelHandler({sender, rowIndex}) {
  this.closeEditor(sender, rowIndex);
}

public saveChanges(grid: any): void {
  console.log("in save changes");
  grid.closeCell();
  grid.cancelCell();
  console.log(grid);

 // this.editService.saveChanges();

}

public cancelChanges(grid: any): void {
  grid.cancelCell();

 // this.editService.cancelChanges();
}

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    //this.editService.resetItem(this.editedProduct);
    this.editedRowIndex = undefined;
    this.editedAuthHolder = undefined;
}

public removeContainerHandler({ sender, dataItem }) {
  //this.editService.remove(dataItem);
  this.containers = this.containers.filter(x=>x.containerId!=dataItem.containerId);
  this.deletedItems.push(dataItem);
  sender.cancelCell();
}

public removeHandler({dataItem}) {
  //this.editService.remove(dataItem);
  this.authorisationHolders= this.authorisationHolders.filter(x=> x.type!= dataItem.type && x.identifier !=dataItem.identifier);
}

public showHideAuthorisationGrid(){
  
 this.showAuthorisationGrid= !this.showAuthorisationGrid;
}

public showHideContainerGrid(){
  this.showContainerGrid = !this.showContainerGrid;

}

public showAuthHolderTypes() {
  this.showAuthorisationHolderTypes = !this.showAuthorisationHolderTypes;
}

public acceptAuth(myref, data){
   //alert(myref.value.Code);
   console.log(data);
   data.type = myref.value.Code;
   //this.closeEditor(this.authGrid);
   console.log(this.authGrid);
   //this.authGrid.closeRow(this.editedRowIndex);
   this.showAuthHolderTypes();
   

}

public sendDeclaration()
{
  this.declarationOutput= this.jsonPipe.transform(this.declaration);
  console.log(this.declarationOutput);
}

public newDeclaration()
{
  this.declaration = new Declaration();

}

}

 
