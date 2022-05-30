import { Component, Inject, OnInit, EventEmitter, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})

@Injectable({
  providedIn: "root"
})
export class ConfirmDialogComponent implements OnInit {
 

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  
  ngOnInit(): void {
    
  }


}
