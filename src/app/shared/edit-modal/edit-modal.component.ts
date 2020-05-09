import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IPacient } from 'src/app/patients/pacient';
import { DataService } from 'src/app/services/data.service';
import { PRIMARY_OUTLET, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})

export class EditModalComponent implements OnInit {

  data: any[];
  pacient: IPacient;
  errorMessage: string;
  @Input() id;
  @Input() firstName;
  @Input() lastName;
  @Input() gender;

  form: FormGroup;


  constructor(public dialogRef: MatDialogRef<EditModalComponent>, @Inject(MAT_DIALOG_DATA) data, private fb : FormBuilder) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.gender = data.gender

  }
  
  onClose(): void {
     this.dialogRef.close();
  }

  onSave(): void{
    console.log(this.form.value);
    this.dialogRef.close(this.form.value);
  }

  isValid(field: any) : boolean{
    if (field != undefined && field != null) return true;
    return false;
  }
  
  ngOnInit() {
    this.form = this.fb.group({
      id: [this.id, []],
      firstName: [this.firstName, []],
      lastName: [this.lastName, []],
      gender: [this.gender, []]
  });
  }
}