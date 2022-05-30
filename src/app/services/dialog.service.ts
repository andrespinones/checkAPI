import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmaDialog(msg: any){
    return this.dialog.open(ConfirmDialogComponent,{
      width: '350px',
      disableClose: true,
      data: {
        message : msg 
      }

    });
  }
}