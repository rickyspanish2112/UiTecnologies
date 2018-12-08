import { Component, OnInit, ViewChild } from '@angular/core';
import { CrmaccountserviceService } from '../../services/crmaccountservice.service';
import { Address } from '../../models/address';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  Sort
} from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'street1',
    'street2',
    'street3',
    'county',
    'postCode',
    'country'
  ];
  addresses: Observable<Address[]>;
  dataSource = new MatTableDataSource<Address>();

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private crmService: CrmaccountserviceService) {}

  ngOnInit(): void {
    this.addresses = this.crmService.addresses;
    this.crmService.getAllAddresses();

    this.addresses.subscribe(data => {
      this.dataSource.data = data;
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
