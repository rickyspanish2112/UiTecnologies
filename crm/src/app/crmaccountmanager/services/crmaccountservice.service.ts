import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Accountnode } from '../models/accountnode';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Iaccount } from '../contracts/iaccount';
import { Iaddress } from '../contracts/iaddress';
import { Address } from '../models/address';
import { AddressDescription } from '../models/addressdescription';

@Injectable({
  providedIn: 'root'
})
export class CrmaccountserviceService {

  // This BehaviorSubject should be internal to class, not exposed externally
  private _addresses: BehaviorSubject<Address[]>;

  // Internal data store should be private as it should not be exposed outside if this class
  private dataStore: {
    addresses: Address[];
  };

  // This get property allows the component to subscribe to this observable
  get addresses(): Observable<Address[]> {
    return this._addresses.asObservable();
  }

  constructor(private http: HttpClient) {
    // Initialize data store and BehaviorSubject
    this.dataStore = { addresses: [] };
    this._addresses = new BehaviorSubject<Address[]>([]);
  }

  getAllAddresses() {
    const addressUrl = '../../../assets/api/addresses.json';

    return this.http.get<Address[]>(addressUrl).subscribe(
      data => {
        // Data from http call added to store
        this.dataStore.addresses = data;
        // Calling next will publish data to all subscribing comonents
        // When data is recevied from GetAllAddresses we call next to notify listening components that data is available
        // To stop external componentes manipulating the data store create a new object and copy propeties from the data store to it,
        // and then publish the addresses
        this._addresses.next(Object.assign({}, this.dataStore).addresses);
      },
      _error => {
        console.log('Failed to fetch addresses');
      }
    );
  }

getAddressDescriptions(): Observable<AddressDescription[]> {
  const addressDescriptionUrl = '../../../assets/api/addressdescription.json';

  return this.http.get<AddressDescription[]>(addressDescriptionUrl).pipe(
    tap(this.DoGetAccountDescriptions()),
    catchError(this.handleError)
  );
}
  DoGetAccountDescriptions(): (x: AddressDescription[]) => void {
    return data =>
      console.log(
        'The following account descriptions were returned: ' + JSON.stringify(data)
      );
  }

  getAccountNodes(): Observable<Accountnode[]> {
    const accountUrl = '../../../assets/api/accountnode.json';

    return this.http.get<Accountnode[]>(accountUrl).pipe(
      tap(this.DoGetAccountNodes()),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred ${err.error.message}`;
    } else {
      errorMessage = `Server side returned code: ${
        err.status
      }, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  private DoGetAccountNodes(): (x: Accountnode[]) => void {
    return data =>
      console.log(
        'The following account nodes were returned: ' + JSON.stringify(data)
      );
  }

  getAccount(): Observable<Iaccount> {
    const accountUrl = '../../../assets/api/account.json';
    return this.http.get<Iaccount>(accountUrl).pipe(
      tap(this.DoGetAccount()),
      catchError(this.handleError)
    );
  }

  private DoGetAccount(): (x: Iaccount) => void {
    return data =>
      console.log(
        'The following account was returned: ' + JSON.stringify(data)
      );
  }

  getPrimaryAddress(): Observable<Iaddress> {
    const addressUrl = '../../../assets/api/addresses.json';

    return this.http.get<Iaddress[]>(addressUrl).pipe(
      map(data => {
        return this.doGetPrimaryAddress(data);
      }),
      catchError(this.handleError)
    );
  }
  doGetPrimaryAddress(data: Iaddress[]): Iaddress {
    const primaryAddress = data.find(x => x.isPrimary);
    console.log(
      'The following primary address was returned: ' + JSON.stringify(data)
    );
    return primaryAddress;
  }

  addAddress(address: Address): Promise<Address> {
    return new Promise((resolver, reject) => {
      address.id = this.dataStore.addresses.length + 1; // Simulates setting new ID
      this.dataStore.addresses.push(address);
      this._addresses.next(Object.assign({}, this.dataStore).addresses);
      resolver(address);
    });
  }


}
