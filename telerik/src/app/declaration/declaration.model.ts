export class Declaration{

    public declarationType: string;
    public traderReference?: string;
    public badge?:string;
    public exporter?: string;
    public importer?: string;
    public declarant?: string;
    public seller?: string;
    public buyer?: string;
    public representative?: string;
    public totalPackages?: number;
    public repStatus?: string;
    public dispatchCountry?: string;
    public destinationCountry?: string;
    public arrivalTransportType?: string;
    public id?:string;
    public borderTransportCountry?: string;
    public natureOfTransaction?: string;
    public borderTransportMode?: string;
    public inlandTransportMode?: string;
    public deliveryTerms?: string;
    public unLoCode?: string;
    public cityLocation?: string;
    public invoiceTotalCurrency?: string;
    public invoiceTotalAmount?: number;
    public invoiceExchangeRate?:number;
    public goodsLocation?: string; //and some more related fields here
    public firstDeferement?: string;
    public secondDeferment?: string;
    public warehouse?: string;
    public site?: string;
    public supervisingOffice?: string;
    public grossMass?: number;
    public authorisationHolders: AuthHolder[]=[];
    public containers: Container[]=[];



}

export class AuthHolder{
    type: string;
    identifier: string;
  
  }
  
 export class Container {
    containerId: string;
  }