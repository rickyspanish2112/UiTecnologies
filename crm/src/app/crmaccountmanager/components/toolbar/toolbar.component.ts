import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

import { NewAccountDialogComponent } from '../new-account-dialog/new-account-dialog.component';
import { NewAddressDialogComponent } from '../new-address-dialog/new-address-dialog.component';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output()
  toggleSidenav = new EventEmitter<void>();

  constructor(
    private matDialog: MatDialog,
    private snackBar: MatSnackBar) {}

  ngOnInit() {}

  openAddAccountDialog(): void {
    this.matDialog.open(NewAccountDialogComponent, {
      width: '450px'
    });
  }

  openAddAddressDialog(): void {
  const dialogRef =  this.matDialog.open(NewAddressDialogComponent, {
      width: '450px'
    });

dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed', result);

  if (result) {
    this.openSnackBar('Address Added', '').onAction().subscribe();
  }});
  }

  openAddContactDialog(): void {
    this.matDialog.open(NewContactDialogComponent, {
      width: '450px'
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
   return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
